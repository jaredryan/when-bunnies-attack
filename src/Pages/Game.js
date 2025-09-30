import { useEffect, useMemo, useRef, useState } from "react";

import MapButton from "../Components/MapButton";
import DialogueBox from "../Components/DialogueBox";
import Battle from "../Components/Battle";

import isUseable from "../ExplorationSystem/IsUsable";
import { utilizeItem } from "../BattleSystem/BattleInventory";

import Player from "../Entities/Player";
import areas from "../EventSystem/AreasList";
import decisionLoop from "../ExplorationSystem/DecisionLoop";

import messages from "../Messages";

const Game = ({ endGame }) => {
  // Components

  const [mapModalIsOpen, setMapModalIsOpen] = useState(false);
  const [inventoryIsOpen, setInventoryIsOpen] = useState(true);
  const isLoopRunning = useRef(false);
  const isNewArea = useRef(false);

  // Initialization
  const player = useMemo(() => new Player(), []);

  const [area, setArea] = useState(areas[0]);
  const [text, setText] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [primaryActions, setPrimaryActions] = useState([]);
  const [runEncounter, setRunEncounter] = useState(false);
  const [encounter, setEncounter] = useState(null); // { enemy: Enemy, noRetreat: true/false }

  // Keep an eye on player status to end the game when they've won or lost
  useEffect(() => {
    if (player.hasDied) {
      endGame(false);
    }
  }, [player.hasWon, player.hasDied, endGame]);

  // every time the area changes, rerun decision loop with new area
  useEffect(() => {
    if (!isLoopRunning.current) {
      isLoopRunning.current = true;
      isNewArea.current = true;

      area.visit();
      setShowActions(false);
      decisionLoop({
        player,
        area,
        areas,
        setNextArea: (area) => setArea(area),
        setText,
        setPrimaryActions,
        setEncounter,
      });
    }
  }, [area, player]);

  const mapActions = (actions = []) =>
    !showActions
      ? null
      : actions.map((action) => (
          <li key={action.name}>
            <button onClick={action.execute}>{action.name}</button>
          </li>
        ));

  const resetDialogueForNewArea = () => {
    if (isNewArea.current) {
      isNewArea.current = false;
      return true;
    }

    return false;
  };

  if (!isLoopRunning.current && (!text || !text.length) && (!primaryActions || !primaryActions.length)) {
    // If there is no text or actions, but there is an encounter, that
    // means no more dialogue is left before battle, so trigger battle
    if (encounter && !runEncounter) {
      isLoopRunning.current = true;

      setRunEncounter(true)
    } else {
      // Run decision loop if there are no text or actions available yet

      isLoopRunning.current = true;
      setShowActions(false);
      decisionLoop({
        player,
        area,
        areas,
        setNextArea: (area) => setArea(area),
        setText,
        setPrimaryActions,
        setEncounter,
      });
    }
  }

  return (
    <div className="gameContainer">
      {runEncounter && (
        <Battle
          player={player}
          enemy={encounter?.enemy}
          noRetreat={encounter?.noRetreat}
          wonBattle={() => {
            const savedEnemy = encounter?.enemy;
            setRunEncounter(false);
            setEncounter(null);
            setText([
              ...messages.winBattleMessage(savedEnemy),
              ...savedEnemy.reward(player),
            ]);
            isLoopRunning.current = false;
          }}
          fledBattle={() => {
            setRunEncounter(false);
            setEncounter(null);
            setText(messages.fleeSuccessMessage);
            isLoopRunning.current = false;
          }}
          lostBattle={() => {
            setRunEncounter(false);
            setEncounter(null);
            isLoopRunning.current = false;
            endGame(false);
          }}
        />
      )}
      <DialogueBox
        lines={text || []}
        onDone={() => {
          // After text is done, check if player has won, and for encounters
          // and actions
          if (player.hasWon) {
            setTimeout(() => endGame(true), 2000)
          } else if (encounter) {
            // If encounter is in place, run it after dialogue is finished
            setRunEncounter(true);
          } else if (primaryActions && primaryActions.length) {
            // If actions are available, show them, now dialogue is done
            isLoopRunning.current = false;
            setShowActions(true);
          } else {
            // If no encounter or actions, then just keep running decision
            // loop to give us more story until we can take action.
            setShowActions(false);
            decisionLoop({
              player,
              area,
              areas,
              setNextArea: (area) => setArea(area),
              setText,
              setPrimaryActions,
              setEncounter,
            });
          }
        }}
        resetBox={resetDialogueForNewArea()}
      />
      <div className="twoColumns">
        <div className="left column">
          <div className="status">
            <div className="attributeRow">
              <h3 className="attribute">HP:</h3>
              <h3 className="value">
                {player.hp} / {player.maxHp}
              </h3>
            </div>
            <div className="attributeRow">
              <h3 className="attribute">Attack:</h3>
              <h3 className="value">
                {player.attackPower[0]} - {player.attackPower[1]}
              </h3>
            </div>
            <div className="attributeRow">
              <h3 className="attribute">Map:</h3>
              <MapButton
                open={mapModalIsOpen}
                openModal={() => setMapModalIsOpen(true)}
                onCancel={() => setMapModalIsOpen(false)}
                areas={areas}
                area={area}
              />
            </div>
            <div className="attributeRow">
              <h3 className="attribute">Inventory:</h3>
              <button
                className="map"
                onClick={() => setInventoryIsOpen(!inventoryIsOpen)}
                aria-label="Toggle inventory"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z" />
                </svg>
              </button>
            </div>
            {!inventoryIsOpen ? null : (
              <ul className="inventoryList">
                {player.inventory.length ? null : <p>Empty</p>}
                {player.inventory.map((item, index) => (
                  <li key={item.name + index} className="item">
                    <p className="tooltip">
                      {item.name}
                      <span class="tooltipText">{item.description}</span>
                    </p>
                    <button
                      onClick={() => {
                        if (!isUseable(true, item)) {
                          setText([
                            `You examine the ${item.name}, then put it back into your inventory.`,
                          ]);
                        } else if (player.hp === player.maxHp) {
                          setText([`You are already at full health.`]);
                        } else {
                          setText(utilizeItem(player, null, index));
                        }
                      }}
                    >
                      Use
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="right column">
          <div className="actionMenu">
            <h3>Actions:</h3>
            <ul className="actionContainer primary">
              {mapActions(primaryActions)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
