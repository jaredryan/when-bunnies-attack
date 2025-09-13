// Allow the user to quit if they hit the cancel key
export const cancelExecution = () => {
  choice = "undecided";
  while (choice !== 1) {
    var choice = readlineSync.keyInSelect(
      ["Yes", "No"],
      "Game paused. Are you sure you want to quit?",
    );
    if (choice === 0) {
      gameInProgress = false;
      voluntaryExit = true;
      return true;
    } else if (choice === 1) {
      console.log("Game resumed.");
      return false;
    } else {
      console.log('Please select "Yes" or "No".');
      return cancelExecution();
    }
  }
};

// Allows the user to recover HP, but not exceed maxHP.
export const recoverHP = (object, number) => {
  object.hp += number;
  if (object.hp > object.maxHP) {
    object.hp = object.maxHP;
  }
};

// Prints current status of the player
export const printStatus = (player) => {
  console.log("Name: " + player.name);
  console.log("HP: " + player.hp + " / " + player.maxHP);
  var minPower = player.attackPower[0] + player.weapon;
  var maxPower = player.attackPower[1] + player.weapon;
  console.log("Attack: " + minPower + " - " + maxPower);
  console.log("Inventory:\n" + returnItemsString(player));
};

// Returns a string consisting of the player's current items
export const returnItemsString = (player) => {
  let items = "";
  if (player.inventory.length === 0) {
    return (items = "Empty");
  } else {
    for (var i = 0; i < player.inventory.length; i++) {
      items += `${player.inventory[i].name}: ${player.inventory[i].description}`;
    }
    return (items = items.slice(0, items.length - 1));
  }
};
