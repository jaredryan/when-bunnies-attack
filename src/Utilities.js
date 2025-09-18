// Prints current status of the player
export const printStatus = (player) => {
  console.log(`Name: ${player.name}`);
  console.log(`HP: ${player.hp} / ${player.maxHP}`);
  var minPower = player.attackPower[0] + player.weapon;
  var maxPower = player.attackPower[1] + player.weapon;
  console.log(`Attack: ${minPower} - ${maxPower}`);
  console.log(`Inventory:\n${returnItemsString(player)}`);
};

// Returns a string consisting of the player's current items
export const returnItemsString = (player) => {
  if (player.inventory.length === 0) {
    return "Empty";
  }

  const items = [];
  for (var i = 0; i < player.inventory.length; i++) {
    items.push(
      `${player.inventory[i].name}: ${player.inventory[i].description}`,
    );
  }
  return items.join("\n");
};
