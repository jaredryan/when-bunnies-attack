import { useEffect, useState } from "react";
import Modal from "./Modal";
import DialogueBox from "./DialogueBox";
import InventoryList from "./InventoryList";
import messages from "../Messages";
import { fleeAttempt } from "../Utilities";

import useViewportHeight from "./useViewportHeight";

const battleEntranceAnimationClassNames = [
  "fade-black",
  "wipe-horizontal",
  "wipe-vertical",
  "pixel-shrink ",
];

const Battle = ({
  player,
  enemy,
  wonBattle,
  lostBattle,
  fledBattle,
  noRetreat = false,
}) => {
  const [text, setText] = useState([]);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);
  const [turnIsFinished, setTurnIsFinished] = useState(false);
  const [battleIsOver, setBattleIsOver] = useState(false);
  const [inventoryIsOpen, setInventoryIsOpen] = useState(false);
  const [inventoryIsClosing, setInventoryIsClosing] = useState(false);
  const [inventoryIsOpening, setInventoryIsOpening] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const closeInventory = () => {
    setInventoryIsClosing(true)
    setTimeout(() => {
      setInventoryIsClosing(false);
      setInventoryIsOpen(false)
    }, 500);
  }

  const openInventory = () => {
    setInventoryIsOpening(true)
    setTimeout(() => {
      setInventoryIsOpening(false);
      setInventoryIsOpen(true)
    }, 500);
  }

  useViewportHeight();

  useEffect(() => {
    // Choose random encounter animation to trigger on entering a battle
    const randomAnimationClassName =
      battleEntranceAnimationClassNames[
        Math.floor(Math.random() * battleEntranceAnimationClassNames.length)
      ];
    setAnimationClass(` ${randomAnimationClassName}`);

    // Wait 3 seconds for animation ^ to end before starting dialogue
    setTimeout(() => {
      setText([messages.startBattleMessage(enemy.name), messages.battleTurnStartPrompt]);
    }, 3000);
  }, [enemy.name]);

  // You win!
  useEffect(() => {
    if (enemy.hasDied) {
      setIsPlayersTurn(true);
      setTurnIsFinished(false);
      setText(messages.winInBattleMessage(enemy.name));
    }
  }, [enemy.hasDied, enemy.name]);

  // Enemy turn
  useEffect(() => {
    if (!isPlayersTurn && turnIsFinished) {
      setTurnIsFinished(false);
      const text = enemy.attack(player);
      if (player.hasDied) {
        setText([...text, messages.dieInBattleMessage]);
      } else {
        setText([...text, messages.battleTurnStartPrompt]);
        setIsPlayersTurn(true);
      }
    }
  }, [isPlayersTurn, turnIsFinished, enemy, player]);

  return (
    <Modal
      open={true}
      className={`battleModal${battleIsOver ? ' fadeOut' : ''}`}
      noClose={true}
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div
        className={`battleTransitionOverlay${animationClass}`}
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      />
      <div className="battleModalContent pagePadding">
        <div
          className={`battleModalContentOverlay${
            (inventoryIsOpen || inventoryIsOpening) ? " visible" : ""
          }`}
        />
        <div className="enemyStatus">
          <h2>{enemy.name}</h2>
          <div className="attributes">
            <div className="attributeRow">
              <h3 className="attribute">HP:</h3>
              <h3 className="value">
                {enemy.hp} / {enemy.maxHp}
              </h3>
            </div>
            <div className="attributeRow">
              <h3 className="attribute">Attack:</h3>
              <h3 className="value">
                {enemy.attackPower[0]} - {enemy.attackPower[1]}
              </h3>
            </div>
          </div>
        </div>
        <div className="battleMessage">
          <DialogueBox
            lines={text || []}
            onDone={() => {
              setTurnIsFinished(true);
              if (player.hasDied) {
                setBattleIsOver(true)
                setTimeout(() => lostBattle(), 2000);
              } else if (enemy.hasDied) {
                setBattleIsOver(true)
                setTimeout(() => wonBattle(), 2000);
              }
            }}
            windowOnly
          />
        </div>
        <div className="playerStatus">
          <h2>You</h2>
          <div className="attributes">
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
          </div>
        </div>
        <div className="actionsMenu">
          <h2>Menu</h2>
          <div className={`actions${noRetreat ? "" : " showFlee"}`}>
            <button
              onClick={() => {
                setTurnIsFinished(false);
                setIsPlayersTurn(false);
                const text = player.attack(enemy);
                setText(text);
              }}
              className="primary"
              disabled={!isPlayersTurn || !turnIsFinished || battleIsOver}
            >
              Attack
            </button>
            <button
              onClick={() => {
                if (inventoryIsOpen) {
                  closeInventory()
                } else {
                  openInventory()
                }
              }}
              className="secondary"
              disabled={!isPlayersTurn || !turnIsFinished || battleIsOver}
            >
              Items
            </button>
            {noRetreat ? null : (
              <button
                onClick={() => {
                  setTurnIsFinished(false);
                  setIsPlayersTurn(false);
                  setText(messages.fleeAttemptMessage);
                  const { text, success } = fleeAttempt();
                  setText(text);
                  if (success) {
                    setBattleIsOver(true);
                    setIsPlayersTurn(true);
                    setTimeout(() => fledBattle(), 2000);
                  }
                }}
                className="tertiary"
                disabled={!isPlayersTurn || !turnIsFinished || battleIsOver}
              >
                Flee
              </button>
            )}
          </div>
        </div>
        <InventoryList
          player={player}
          inField={false}
          enemy={enemy}
          setText={setText}
          inventoryIsOpen={inventoryIsOpen}
          inventoryIsClosing={inventoryIsClosing}
          inventoryIsOpening={inventoryIsOpening}
          closeInventory={closeInventory}
          itemUsageConsequences={() => {
            setTurnIsFinished(false);
            setIsPlayersTurn(false);
          }}
        />
      </div>
    </Modal>
  );
};

export default Battle;
