import { useEffect, useState } from "react";
import Modal from "./Modal";
import DialogueBox from "./DialogueBox";
import messages from "../Messages";
import { utilizeItem, fleeAttempt, isUseable } from "../Utilities";

import useViewportHeight from "./useViewportHeight";

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
      setText([`You encountered ${enemy.name}!`, defaultTurnStartText]);
    }, 3000);
  }, [enemy.name]);

  // You win!
  useEffect(() => {
    if (enemy.hasDied) {
      wonBattle();
    }
  }, [enemy.hasDied, wonBattle]);

  // Enemy turn
  useEffect(() => {
    if (!isPlayersTurn && turnIsFinished) {
      setTurnIsFinished(false);
      const text = enemy.attack(player);
      if (player.hasDied) {
        setText([
          ...text,
          `"Ahhh...it hurts."`,
          `Your vision starts to blur, and you lose strength in your limbs.`,
          `You can't move. Then, everything fades to black.`,
          `...`,
        ])
      } else {
        setText([...text, defaultTurnStartText]);
        setIsPlayersTurn(true);
      }
    }
  }, [isPlayersTurn, turnIsFinished, enemy, player]);

  return (
    <Modal
      open={true}
      className="battleModal"
      noClose={true}
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div
        className={`battleTransitionOverlay${animationClass}`}
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      />
      <div className="battleModalContent">
        <div
          className={`battleModalContentOverlay${
            inventoryIsOpen ? " visible" : ""
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
              setTurnIsFinished(true)
              if (player.hasDied) {
                setTimeout(() => lostBattle(), 2000);
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
          <div className={`actions${noRetreat ? '' : ' showFlee'}`}>
            <button
              onClick={() => {
                setTurnIsFinished(false);
                setIsPlayersTurn(false);
                const text = player.attack(enemy);
                setText(text);
              }}
              className="primary"
              disabled={!isPlayersTurn || !turnIsFinished}
            >
              Attack
            </button>
            <button
              onClick={() => setInventoryIsOpen(!inventoryIsOpen)}
              className="secondary"
              disabled={!isPlayersTurn || !turnIsFinished}
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
                    fledBattle();
                  }
                }}
                className="tertiary"
                disabled={!isPlayersTurn || !turnIsFinished}
              >
                Flee
              </button>
            )}
          </div>
        </div>
        {!inventoryIsOpen ? null : (
          <div className="inventoryPopup">
            <button
              onClick={() => setInventoryIsOpen(false)}
              aria-label="Close inventory"
              className="closeInventory secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                {/* <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
              </svg>
            </button>
            <ul className="inventoryList battle">
              {player.inventory.length ? null : <p>Empty</p>}
              {player.inventory.map((item, index) => (
                <li key={item.name + index} className="item">
                  <div className="itemInformation">
                    <h4 className="itemName">{item.name}</h4>
                    <p className="itemDescription">{item.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      setInventoryIsOpen(false);
                      if (!isUseable(false, item)) {
                        setText([
                          `You examine the ${item.name}, then put it back into your inventory.`,
                          defaultTurnStartText,
                        ]);
                      } else if (
                        isUseable(true, item) &&
                        player.hp === player.maxHp
                      ) {
                        setText([
                          `You are already at full health.`,
                          defaultTurnStartText,
                        ]);
                      } else {
                        setTurnIsFinished(false);
                        setIsPlayersTurn(false);
                        setText(utilizeItem(player, enemy, index));
                      }
                    }}
                  >
                    Use
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Battle;
