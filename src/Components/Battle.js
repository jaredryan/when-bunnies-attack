import { useEffect, useState } from "react";
import Modal from "./Modal";
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
  const [text, setTextttt] = useState([
    `You encountered a ${enemy.name}!`,
    defaultTurnStartText,
  ]);
  const setText = (newText) => setTextttt([...text, ...newText])
  const [canAct, setCanAct] = useState(true);
  const [inventoryIsOpen, setInventoryIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useViewportHeight()

  useEffect(() => {
    const randomAnimationClassName =
    battleEntranceAnimationClassNames[
      Math.floor(Math.random() * battleEntranceAnimationClassNames.length)
    ];
    setAnimationClass(` ${randomAnimationClassName}`);
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
    if (!canAct) {
      setTimeout(() => {
        const text = enemy.attack(player);
        setText([...text, defaultTurnStartText]);
        setCanAct(true);
      }, 2000)
    }
  }, [canAct]);

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
          {text.map((line) => (
            <p key={line}>{line}</p>
          ))}
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
            {!canAct ? null : (
              <>
                <button
                  onClick={() => {
                    setCanAct(false);
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
                      setCanAct(false);
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
                        setCanAct(false);
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
