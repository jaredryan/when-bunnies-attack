// PLAYER DEFINITION
var player = {
	name: "Unknown",
	hp: 10,
	maxHP: 10,
	attackPower: [0,1], // [min, max]
	weapon: 0,
	inventory: [],
	// maxInventory: 10,
	addItem: function(item) {
		console.log("\nYou found a " + item.name + ".");
		this.inventory.push(item);

		/* Slightly buggy code to limit the inventory to just a few items. The bug
		   is that it doesn't actually splice out the item to be discarded, like it
		   should. This game doesn't push the 35 item limit of readline-sync, so
		   I just commented it out instead of keeping this system in place. */

		// if (this.inventory.length >= this.maxInventory) {
		// 	// Creates a display of the current items in the directory for the prompt
		// 	console.log("Inventory:\n" + returnItemsString(player));
		// 	var itemOptions = [];
		// 	for (var i = 0; i < this.inventory.length; i++) {
		// 		itemOptions.push(this.inventory[i].name);
		// 	}
		// 	// Loop to make sure the user selects a non-cancel button
		// 	var index = readlineSync.keyInSelect(itemOptions, "Which item would you like to discard?");
		// 	while (index === -1) {
		// 		console.log("Please select one of the other options.");
		// 		index = readlineSync.keyInSelect(itemOptions, "Which item would you like to discard?");
		// 		continue;

		// 	}
		// 	// Loop that will double check that the user wants to remove an item before removing it.
		// 	var isNotCertain = true;
		// 	while (isNotCertain) {
		// 		var choice = readlineSync.keyInSelect(["Yes", "No"], "Are you sure you want to discard the " + itemOptions[index] + "?");
		// 		if (choice === 0) {
		// 			this.inventory.splice(index, 1, item);
		// 			isNotCertain = false;
		// 		} else if (choice === 1) {
		// 			index = readlineSync.keyInSelect(itemOptions, "Which item would you like to discard?");
		// 		} else {
		// 			console.log('Please select "Yes" or "No".');
		// 		}
		// 	}
		// }
	},
	removeItem: function(item) {
		this.inventory.pop(item);
	},
	attack: function(enemy) {
		console.log("\nYou attack!");
		var damage = Math.floor(Math.random() * (this.attackPower[1] - this.attackPower[0] + 1)) + this.attackPower[0] + this.weapon;
		enemy.hp -= damage;
		console.log(enemy.name + " took " + damage + " damage!");	
	},
	equipWeapon: function(weapon) {
		if (weapon.power > this.weapon) {
			console.log("You equipped the " + weapon.name + ".")
			this.weapon = weapon.power;
		} else {
			console.log("You discarded the " + weapon.name + " because it is weaker than your current weapon.");
		}
	},
};
