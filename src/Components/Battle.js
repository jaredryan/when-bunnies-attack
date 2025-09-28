import { useEffect, useState } from "react";
import Modal from "./Modal";
import messages from "../Messages";
import fleeAttempt from "../BattleSystem/FleeAttempt";
import { utilizeItem } from "../BattleSystem/BattleInventory";
import isUseable from "../ExplorationSystem/IsUsable";

const defaultTurnStartText = "What will you do?";

const Battle = ({
  player,
  enemy,
  open,
  wonBattle,
  lostBattle,
  fledBattle,
  noRetreat = false,
}) => {
  const [text, setText] = useState([
    `You encountered a ${enemy.name}!`,
    defaultTurnStartText,
  ]);
  const [canAct, setCanAct] = useState(true);
  const [inventoryIsOpen, setInventoryIsOpen] = useState(true);

  // You win!
  useEffect(() => {
    if (enemy.hasDied) {
      wonBattle();
    }
  }, [enemy]);

  // You lose :(
  useEffect(() => {
    if (player.hasDied) {
      lostBattle();
    }
  }, [player]);

  // Enemy turn
  useEffect(() => {
    if (!canAct) {
      const text = enemy.attack(player);
      setText([...text, defaultTurnStartText]);
      setCanAct(true);
    }
  }, [canAct]);

  const playerAction = (action) => () => {
    setCanAct(false);
    const text = action();
    setText(text);
  };

  return (
    <Modal open={open} className="battleModal" noClose={true}>
      <div className="enemyStatus">
        <h2>{enemy.name}</h2>
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
      <div className="playerStatus">
        <h2>You</h2>
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
      <div>{text}</div>
      <div className="actions">
        {!canAct ? null : (
          <>
            <button onClick={playerAction(() => player.attack(enemy))}>
              Attack
            </button>
            <button onClick={playerAction(() => player.attack(enemy))}>
              Inventory
            </button>
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
              >
                Flee
              </button>
            )}
          </>
        )}
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
                    } else if (player.hp === player.maxHp) {
                      setText([
                        `You are already at full health.`,
                        defaultTurnStartText
                      ]);
                    } else {
                      setCanAct(false)
                      setText(utilizeItem(player, enemy, index));
                      setInventoryIsOpen(false)
                    }
                  }}
                >
                  Use
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setInventoryIsOpen(false)}>Close Inventory</button>
        </>
      )}
    </Modal>
  );
};

export default Battle;
