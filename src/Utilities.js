// Prints current status of the player
export const printStatus = (player) => {
  const minPower = player.attackPower[0] + player.weapon;
  const maxPower = player.attackPower[1] + player.weapon;
  return [
    `Name: ${player.name}`,
    `HP: ${player.hp} / ${player.maxHP}`,
    `Attack: ${minPower} - ${maxPower}`,
    `Inventory:`,
    ...returnItemsStringArray(player),
  ];
};

// Returns a string consisting of the player's current items
export const returnItemsStringArray = (player) => {
  if (player.inventory.length === 0) {
    return ["Empty"];
  }

  return player.inventory.map((item) => `${item.name}: ${item.description}`);
};
