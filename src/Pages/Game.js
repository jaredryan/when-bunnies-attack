import { useEffect, useMemo, useRef, useState } from "react";

import MapButton from "../Components/MapButton";
import DialogueBox from "../Components/DialogueBox";
import Battle from "../Components/Battle";
import InventoryList from "../Components/InventoryList";

import Player from "../Entities/Player";
import areas from "../EventSystem/AreasList";
import decisionLoop from "../ExplorationSystem/DecisionLoop";

import messages from "../Messages";

const Game = ({ endGame, setClassName }) => {
  // Components

  const [mapIsOpen, setMapIsOpen] = useState(false);
  const [mapIsClosing, setMapIsClosing] = useState(false);
  const [mapIsOpening, setMapIsOpening] = useState(false);
  const [isChoosingNextArea, setIsChoosingNextArea] = useState(false);
  const [inventoryIsOpen, setInventoryIsOpen] = useState(false);
  const [inventoryIsClosing, setInventoryIsClosing] = useState(false);
  const [inventoryIsOpening, setInventoryIsOpening] = useState(false);
  const isLoopRunning = useRef(false);
  const isNewArea = useRef(false);

  const closeMap = () => {
    setMapIsClosing(true);
    setTimeout(() => {
      setIsChoosingNextArea(false);
      setMapIsClosing(false);
      setMapIsOpen(false);
    }, 750);
  };

  const openMap = () => {
    setMapIsOpening(true);
    setTimeout(() => {
      setMapIsOpening(false);
      setMapIsOpen(true);
    }, 750);
  };

  const closeInventory = () => {
    setInventoryIsClosing(true);
    setTimeout(() => {
      setInventoryIsClosing(false);
      setInventoryIsOpen(false);
    }, 500);
  };

  const openInventory = () => {
    setInventoryIsOpening(true);
    setTimeout(() => {
      setInventoryIsOpening(false);
      setInventoryIsOpen(true);
    }, 500);
  };

  // Initialization
  const player = useMemo(() => new Player(), []);

  const [area, setArea] = useState(areas[0]);
  const [pageContainerClassName, setPageContainerClassName] = useState(
    areas[0].mapName
  );
  const [text, setText] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [primaryActions, setPrimaryActions] = useState([]);
  const [triggeringAction, setTriggeringAction] = useState(false);
  const [runEncounter, setRunEncounter] = useState(false);
  const [encounter, setEncounter] = useState(null); // { enemy: Enemy, noRetreat: true/false }

  // Keep an eye on player status to end the game when they've won or lost
  useEffect(() => {
    if (player.hasDied) {
      endGame(false);
    }
  }, [player.hasWon, player.hasDied, endGame]);

  useEffect(
    () => setClassName(pageContainerClassName),
    [setClassName, pageContainerClassName]
  );

  // every time the area changes, rerun decision loop with new area
  useEffect(() => {
    isNewArea.current = true;
  }, [area, player]);

  const mapActions = (actions = []) =>
    !showActions || isNewArea.current
      ? null
      : actions.map((action) => (
          <li key={action.name} className="primaryActionListItem">
            <button
              onClick={() => {
                setTriggeringAction(true);
                setTimeout(() => {
                  action.execute();
                  setTriggeringAction(false);
                }, 500);
              }}
              className={`primaryActionButton${
                triggeringAction ? " exiting" : ""
              }${action.className ? ` ${action.className}` : ""}`}
            >
              {action.name}
            </button>
          </li>
        ));

  const resetDialogueForNewArea = () => {
    if (isNewArea.current) {
      isNewArea.current = false;
      return true;
    }

    return false;
  };

  if (
    !isLoopRunning.current &&
    (!text || !text.length) &&
    (!primaryActions || !primaryActions.length)
  ) {
    // If there is no text or actions, but there is an encounter, that
    // means no more dialogue is left before battle, so trigger battle
    if (encounter && !runEncounter) {
      isLoopRunning.current = true;

      setRunEncounter(true);
    } else {
      // Run decision loop if there are no text or actions available yet

      isLoopRunning.current = true;
      setShowActions(false);
      decisionLoop({
        player,
        area,
        areas,
        setText,
        setPrimaryActions,
        setEncounter,
        setIsChoosingNextArea,
      });
    }
  }

  return (
    <div
      className={`gameContainer pagePadding${
        runEncounter ? " fadeToBackground" : " fadeIn"
      }`}
    >
      <InventoryList
        player={player}
        setText={setText}
        inventoryIsOpen={inventoryIsOpen}
        inventoryIsOpening={inventoryIsOpening}
        inventoryIsClosing={inventoryIsClosing}
        closeInventory={closeInventory}
        disabled={
          !showActions ||
          isNewArea.current ||
          !primaryActions.length ||
          !!area.story.length
        }
      />
      {runEncounter && (
        <Battle
          player={player}
          enemy={encounter?.enemy}
          noRetreat={encounter?.noRetreat}
          className={pageContainerClassName}
          wonBattle={() => {
            const savedEnemy = encounter?.enemy;
            setRunEncounter(false);
            setEncounter(null);
            setTimeout(() => {
              setText([
                ...messages.winBattleMessage(savedEnemy.name),
                ...savedEnemy.reward(player),
              ]);
              isLoopRunning.current = false;
            }, 2000);
          }}
          fledBattle={() => {
            setRunEncounter(false);
            setEncounter(null);
            setTimeout(() => {
              setText(messages.fleeSuccessMessage);
              isLoopRunning.current = false;
            }, 2000);
            setText(messages.fleeSuccessMessage);
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
            setTimeout(() => endGame(true), 2000);
          } else if (isNewArea.current) {
            isLoopRunning.current = true;
            isNewArea.current = false;

            area.visit();
            setShowActions(false);
            decisionLoop({
              player,
              area,
              areas,
              setText,
              setPrimaryActions,
              setEncounter,
              setIsChoosingNextArea,
            });
          } else if (encounter) {
            // If encounter is in place, run it after dialogue is finished
            setRunEncounter(true);
          } else if (isChoosingNextArea) {
            openMap();
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
              setText,
              setPrimaryActions,
              setEncounter,
              setIsChoosingNextArea,
            });
          }
        }}
        resetBox={resetDialogueForNewArea()}
        paused={mapIsOpen || mapIsOpening}
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
                open={mapIsOpen}
                isChoosingNextArea={isChoosingNextArea}
                stayInArea={() => {
                  closeMap();
                  setText(messages.stayInRoomMessage);
                }}
                setNextArea={(area) => {
                  closeMap();
                  setText(messages.travelToRoomMessage(area.name));
                  setPageContainerClassName(area.mapName);
                  setArea(area);
                }}
                openModal={openMap}
                onCancel={closeMap}
                areas={areas}
                currentArea={area}
                mapIsOpening={mapIsOpening}
                mapIsClosing={mapIsClosing}
              />
            </div>
            <div className="attributeRow">
              <h3 className="attribute">Items:</h3>
              <button
                className="map"
                onClick={() => {
                  if (inventoryIsOpen) {
                    closeInventory();
                  } else {
                    openInventory();
                  }
                }}
                aria-label="Toggle inventory"
              >
                {inventoryIsOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    {/* <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                    <path d="M88 289.6L64.4 360.2L64.4 160C64.4 124.7 93.1 96 128.4 96L267.1 96C280.9 96 294.4 100.5 305.5 108.8L343.9 137.6C349.4 141.8 356.2 144 363.1 144L480.4 144C515.7 144 544.4 172.7 544.4 208L544.4 224L179 224C137.7 224 101 250.4 87.9 289.6zM509.8 512L131 512C98.2 512 75.1 479.9 85.5 448.8L133.5 304.8C140 285.2 158.4 272 179 272L557.8 272C590.6 272 613.7 304.1 603.3 335.2L555.3 479.2C548.8 498.8 530.4 512 509.8 512z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    {/* <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                    <path d="M512 512L128 512C92.7 512 64 483.3 64 448L64 272L576 272L576 448C576 483.3 547.3 512 512 512zM576 224L64 224L64 160C64 124.7 92.7 96 128 96L266.7 96C280.5 96 294 100.5 305.1 108.8L343.5 137.6C349 141.8 355.8 144 362.7 144L512 144C547.3 144 576 172.7 576 208L576 224z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="right column">
          <div className="actionMenu">
            <div className="headerContainer">
              <h3>Actions:</h3>
            </div>
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
