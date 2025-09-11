/* Displays all of the player's current items and prompts the user to choose one.
   It returns "Empty" if he or she does not have any items. */
function selectItem(player) {
	// Display items
	console.log("Inventory:\n" + returnItemsString(player));
	var itemOptions = [];
	if (player.inventory.length === 0) {
		return "Empty";
	} 
	for (var i = 0; i < player.inventory.length; i++) {
		itemOptions.push(player.inventory[i].name);
	}
	// Present a choice
	return readlineSync.keyInSelect(itemOptions, "Which item would you like to use?");
}

// Allows the user to use the item
function useItem(player, enemy, itemChoice) {
	var item = player.inventory[itemChoice];
	if (item === undefined) {
		return false;
	}
	item.use(player, enemy);
	player.inventory.splice(itemChoice, 1);
	return true;
}

// Prompts the user for an item to use. Returns false if it was unsuccessful
function selectAndUseItem(player, enemy) {
	var itemChoice = selectItem(player, enemy);
	if (itemChoice === "Empty") {
		return false;
	}
	return useItem(player, enemy, itemChoice);
}

// Returns a string consisting of the player's current items
function returnItemsString(player) {
	items = "";
	if (player.inventory.length === 0) {
		return items = "Empty";
	} else {
		for (var i = 0; i < player.inventory.length; i++) {
			items += player.inventory[i].name + ": " + player.inventory[i].description + "\n";
		}
		return items = items.slice(0, items.length - 1);
	}
}
