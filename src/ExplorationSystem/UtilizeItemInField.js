import isUseable from "./IsUsable";
import { selectItem } from "../BattleSystem/BattleInventory";

// Allows the player to use an item while in the field
const utilizeItemInField = (player) => {
  const { text, actions } = selectItem(player)

  const updatedActions = []
  for (let i = 0; i < player.inventory.length; i++) {
    const action = actions[i]
    const item = player.inventory[i]
    updatedActions.push({
      name: action.name,
      execute: () => {
        if (!isUseable(true, item)) {
          return [`You examine the ${item.name}, then put it back into your inventory.`]
        } else if (player.hp === player.maxHP) {
          return [`You are already at full health.`]
        }
        return action.execute()
      }
    })
  }

  return {
    text,
    actions: updatedActions
  }
};

export default utilizeItemInField;
