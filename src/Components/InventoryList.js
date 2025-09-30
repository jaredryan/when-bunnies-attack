import { utilizeItem, isUseable } from "../Utilities";
import messages from "../Messages";

const InventoryList = ({
  player,
  inventoryIsOpen,
  inventoryIsOpening,
  inventoryIsClosing,
  closeInventory,
  setText,
  inField = true,
  enemy = null,
  itemUsageConsequences = null,
  disabled = false,
}) =>
  (!inventoryIsOpen && !inventoryIsOpening) ? null : (
    <div className="inventoryContainer">
      <div className={`inventoryPopup${inventoryIsClosing ? ' exiting' : ''}`}>
        <button
          onClick={closeInventory}
          aria-label="Close inventory"
          className="closeInventory secondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            {/* <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
            <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
          </svg>
        </button>
        <ul className="inventoryList battle">
          {player.inventory.length ? null : <p className="empty">Empty</p>}
          {player.inventory.map((item, index) => (
            <li key={item.name + index} className="item">
              <div className="itemInformation">
                <h4 className="itemName">{item.name}</h4>
                <p className="itemDescription">{item.description}</p>
              </div>
              <button
                onClick={() => {
                  closeInventory();
                  if (!isUseable(inField, item)) {
                    const text = [`You examine the ${item.name}, then put it back into your inventory.`]
                    if (!inField) text.push(messages.battleTurnStartPrompt)
                    setText(text);
                  } else if (
                    isUseable(true, item) &&
                    player.hp === player.maxHp
                  ) {
                    const text = [`You are already at full health.`]
                    if (!inField) text.push(messages.battleTurnStartPrompt)
                    setText(text);
                  } else {
                    if (itemUsageConsequences) itemUsageConsequences();
                    setText(utilizeItem(player, enemy, index));
                  }
                }}
                disabled={disabled}
                className="primary"
              >
                Use
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

export default InventoryList;
