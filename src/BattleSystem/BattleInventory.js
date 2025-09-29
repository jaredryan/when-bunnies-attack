import { returnItemsStringArray } from "../Utilities";

/* Displays all of the player's current items and prompts the user to choose one.
   It returns "Empty" if he or she does not have any items. */
export const selectItem = (player, enemy) => {
  // Display items
  const itemOptions = [];
  if (!player.inventory || player.inventory.length === 0) {
    return {
      text: ["Your inventory is empty."],
      actions: [],
    };
  }
  for (let i = 0; i < player.inventory.length; i++) {
    const item = player.inventory[i];
    itemOptions.push({
      name: item.name,
      execute: () => utilizeItem(player, enemy, i),
    });
  }

  return {
    text: [
      "Which item would you like to use?",
      ...returnItemsStringArray(player),
    ],
    actions: itemOptions,
  };
};

// Allows the user to use the item
export const utilizeItem = (player, enemy, itemIndex) => {
  const item = player.inventory[itemIndex];
  player.inventory.splice(itemIndex, 1);
  return item.use(player, enemy);
};
