import { useEffect, useMemo, useRef, useState } from "react";

import MapButton from "../Components/MapButton";
import DialogueBox from "../Components/DialogueBox";

import isUseable from "../ExplorationSystem/IsUsable";
import { utilizeItem } from "../BattleSystem/BattleInventory";

import Player from "../Entities/Player";
import areas from "../EventSystem/AreasList";
import decisionLoop from "../ExplorationSystem/DecisionLoop";

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

  // Keep an eye on player status to end the game when they've won or lost
  useEffect(() => {
    if (player.hasWon) {
      endGame(true);
    } else if (player.hasDied) {
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

  console.log({ text, primaryActions });

  const resetDialogueForNewArea = () => {
    if (isNewArea.current) {
      isNewArea.current = false;
      return true;
    }

    return false;
  };

  if (!text && (!primaryActions || !primaryActions.length)) {
    isLoopRunning.current = true;
    setShowActions(false);
    decisionLoop({
      player,
      area,
      areas,
      setNextArea: (area) => setArea(area),
      setText,
      setPrimaryActions,
    });
  }

  return (
    <div className="gameContainer">
      <DialogueBox
        lines={text || []}
        onDone={() => {
          // If the current story segment was text only,
          // run decision loop again to get actions
          if (!primaryActions || !primaryActions.length) {
            setShowActions(false);
            decisionLoop({
              player,
              area,
              areas,
              setNextArea: (area) => setArea(area),
              setText,
              setPrimaryActions,
            });
          } else {
            // Otherwise, stop game execution and show actions
            isLoopRunning.current = false;
            setShowActions(true);
          }
        }}
        resetBox={resetDialogueForNewArea()}
      />
      <div className="twoColumns">
        <div className="left column">
          <div className="status">
            <div className="attributeRow">
              <h3 className="attribute">HP:</h3>
              <h3 className="value">{player.hp} / {player.maxHP}</h3>
            </div>
            <div className="attributeRow">
              <h3 className="attribute">Attack:</h3>
              <h3 className="value">{player.attackPower[0]} - {player.attackPower[1]}</h3>
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
              <button className="map" onClick={() => setInventoryIsOpen(!inventoryIsOpen)} aria-label="Toggle inventory">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M264 112L376 112C380.4 112 384 115.6 384 120L384 160L256 160L256 120C256 115.6 259.6 112 264 112zM208 120L208 160L128 160C92.7 160 64 188.7 64 224L64 320L576 320L576 224C576 188.7 547.3 160 512 160L432 160L432 120C432 89.1 406.9 64 376 64L264 64C233.1 64 208 89.1 208 120zM576 368L384 368L384 384C384 401.7 369.7 416 352 416L288 416C270.3 416 256 401.7 256 384L256 368L64 368L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 368z"/>
                </svg>
              </button>
            </div>
            {!inventoryIsOpen ? null : <ul className="inventoryList">
              {player.inventory.map((item, index) => (
                <li key={item.name + index} className="item">
                  <p className="tooltip">
                    {item.name}
                    <span class="tooltipText">{item.description}</span>
                  </p>
                  <button onClick={() => {
                    if (!isUseable(true, item)) {
                      setText([`You examine the ${item.name}, then put it back into your inventory.`])
                    } else if (player.hp === player.maxHP) {
                      setText([`You are already at full health.`])
                    } else {
                      setText(utilizeItem(player, null, index))
                    }
                  }}
                  >
                    Use
                  </button>
                </li>
              ))}
            </ul>}
          </div>
          
        </div>
        <div className="right column">
          <div className="actionMenu">
            <h3>Actions:</h3>
            <ul className="actionContainer primary">{mapActions(primaryActions)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
