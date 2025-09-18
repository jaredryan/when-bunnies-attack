import { isUseable } from "./IsUsable";
import { selectItem } from "../BattleSystem/BattleInventory";

// Allows the player to use an item while in the field
const utilizeItemInField = (player) => {
  var itemChoice = selectItem(player);
  if (itemChoice === "Empty" || itemChoice === -1) {
    return true;
  }
  var item = player.inventory[itemChoice];
  if (item === undefined || !isUseable(true, item)) {
    console.log(
      `You examine the ${item.name} and put it back into your inventory.`,
    );
    return true;
  }
  if (isUseable(true, item) && player.hp === player.maxHP) {
    console.log(`You are already at full health.`);
    return true;
  }
  item.use(player);
  player.inventory.splice(itemChoice, 1);
  return true;
}

export default utilizeItemInField
