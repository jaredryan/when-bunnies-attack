import { useEffect, useState } from "react";
import Modal from "./Modal";
import DialogueBox from "./DialogueBox";
import messages from "../Messages";
import fleeAttempt from "../BattleSystem/FleeAttempt";
import { utilizeItem } from "../BattleSystem/BattleInventory";
import isUseable from "../ExplorationSystem/IsUsable";

import useViewportHeight from './useViewportHeight'

const defaultTurnStartText = "What will you do?";

const battleEntranceAnimationClassNames = [
  "fade-black",
  "wipe-horizontal",
  "wipe-vertical",
  "pixel-shrink ",
];

const Battle = ({
  player,
  enemy,
  open,
  wonBattle,
  lostBattle,
  fledBattle,
  noRetreat = false,
}) => {
  const [text, setText] = useState([]);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);
  const [turnIsFinished, setTurnIsFinished] = useState(false);
  const [inventoryIsOpen, setInventoryIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  
  useViewportHeight()

  useEffect(() => {
    // Choose random encounter animation to trigger on entering a battle
    const randomAnimationClassName =
    battleEntranceAnimationClassNames[
      Math.floor(Math.random() * battleEntranceAnimationClassNames.length)
    ];
    setAnimationClass(` ${randomAnimationClassName}`);

    // Wait 3 seconds for animation ^ to end before starting dialogue
    setTimeout(() => {
      setText([
        `You encountered a ${enemy.name}!`,
        defaultTurnStartText,
      ])
    }, 3000)
  }, [])

  // You win!
  useEffect(() => {
    if (enemy.hasDied) {
      wonBattle();
    }
  }, [enemy.hasDied]);

  // You lose :(
  useEffect(() => {
    if (player.hasDied) {
      lostBattle();
    }
  }, [player.hasDied]);

  // Enemy turn
  useEffect(() => {
    if (!isPlayersTurn && turnIsFinished) {
      setTurnIsFinished(false)
      const text = enemy.attack(player);
      setText([...text, defaultTurnStartText]);
      setIsPlayersTurn(true);
    }
  }, [isPlayersTurn, turnIsFinished]);

  return (
    <Modal open={open} className="battleModal" noClose={true} style={{ height: "calc(var(--vh, 1vh) * 100)" }}>
      <div className={`battleTransitionOverlay${animationClass}`} style={{ height: "calc(var(--vh, 1vh) * 100)" }} />
      <div className="battleModalContent">
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
            onDone={() => setTurnIsFinished(true)}
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
          <div className="actions">
            {(!isPlayersTurn || !turnIsFinished) ? null : (
              <>
                <button
                  onClick={() => {
                    setTurnIsFinished(false);
                    setIsPlayersTurn(false);
                    const text = player.attack(enemy);
                    setText(text);
                  }}
                  className="primary"
                >
                  Attack
                </button>
                <button onClick={() => setInventoryIsOpen(!inventoryIsOpen)} className="secondary">Items</button>
                {noRetreat ? null : (
                  <button
                    onClick={() => {
                      setTurnIsFinished(false);
                      setIsPlayersTurn(false);
                      setText(messages.fleeAttemptMessage);
                      const { text, success } = fleeAttempt();
                      setText(text);
                      if (success) {
                        fledBattle();
                      }
                    }}
                    className="tertiary"
                  >
                    Flee
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {!inventoryIsOpen ? null : (
          <>
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
                      if (!isUseable(false, item)) {
                        setText([
                          `You examine the ${item.name}, then put it back into your inventory.`,
                          defaultTurnStartText,
                        ]);
                      } else if ((isUseable(true, item)) && player.hp === player.maxHp) {
                        setText([
                          `You are already at full health.`,
                          defaultTurnStartText,
                        ]);
                      } else {
                        setTurnIsFinished(false);
                        setIsPlayersTurn(false);
                        setText(utilizeItem(player, enemy, index));
                        setInventoryIsOpen(false);
                      }
                    }}
                  >
                    Use
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setInventoryIsOpen(false)}>
              Close Inventory
            </button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Battle;
