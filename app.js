// Initialization

// Require Statements
var readlineSync = require("readline-sync");
var sleep = require("sleep");

/********** Set Player, Enemies, Items, and other useful information **********/

// In-game variables
var won = false;
var gameInProgress = true;
var voluntaryExit = false;

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
};

// Given a new weapon, the player will equip it if it's better than his/her current weapon.
function equipWeapon(player, weapon) {
	if (weapon.power > player.weapon) {
		console.log("You equipped the " + weapon.name + ".")
		player.weapon = weapon.power;
	} else {
		console.log("You discarded the " + weapon.name + " because it is weaker than your current weapon.");
	}
}

// ENEMIES CONSTRUCTOR
function Enemy(name, hp, attackPower, reward) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower; // a range: [min, max]
    this.attack = function(player) {
    	console.log(this.name + " attacks!");
    	var damage = Math.floor(Math.random() * (this.attackPower[1] - this.attackPower[0] + 1)) + this.attackPower[0];
		player.hp -= damage;
		console.log("You took " + damage + " damage!");	
	};
	this.reward = function(player) {
		console.log(player.name + " defeated the " + this.name + "!");
		reward(player);
	}
}

// List of standard enemies
var bunny = ["Bunny", 5, [1, 1], function(player) {
	console.log("You recovered 1 HP.");
	player.addItem(new Item(firstAidInfo[0], firstAidInfo[1], firstAidInfo[2], firstAidInfo[3]));
}];

var scientistBunny = ["Scientist Bunny", 3, [2, 2], function(player) {
	console.log("You recovered 3 HP.");
	player.addItem(new Item(bunnySteroid[0], bunnySteroid[1], bunnySteroid[2], bunnySteroid[3]));
}];

var soldierBunny = ["Soldier Bunny", 8, [1, 1], function(player) {
	console.log("You recovered 3 HP.");
	player.addItem(new Item(throwingKnife[0], throwingKnife[1], throwingKnife[2], throwingKnife[3]));
}];

// Collection of standard enemies
var enemies = [bunny, scientistBunny, soldierBunny];

// The final boss
var finalBoss = ["Captain Whiskers", 14, [2, 3], function(player) {
	won = true;
	gameInProgress = false;
}];

// ITEMS CONSTRUCTOR
function Item(name, description, isUseableInField, effect) {
    this.name = name;
    this.description = description;
    this.isUseableInField = isUseableInField;
    this.use = function(player, enemy) {
    	console.log("You used the " + this.name + "!");
    	effect(player, enemy);
    };
}

// List of possible items
var firstAidInfo = ["First Aid Kit", "Use this to recover 5 damage.", true, function(player, enemy) {
	recoverHP(player, 5);
}];

var throwingKnife = ["Throwing Knife", "Use this to hurt the enemy 3 damage.", false, function(player, enemy) {
	enemy.hp -= 3;
}];

var bunnySteroid = ["Bunny Steroid", "This costs you 2 health points, but allows you to damage the enemy with an additional 4 points to your normal attack.", false, function(player, enemy) {
	player.attack(enemy);
	enemy.hp -= 4;
}];

var carrot = ["Carrot", "Eat this to recover 3 damage.", true, function(player, enemy) {
	recoverHP(player, 3);
}];

var key = ["Key", "Opens secret passages", false, function(){}];

// WEAPONS CONSTRUCTOR
function Weapon(name, power) {
    this.name = name;
    this.power = power;
}

// Types of weapons available in the game.
var knife = new Weapon("Knife", 1);
var bunnySword = new Weapon("Bunny Sword", 2);
var surgicalKnife = new Weapon("Surgical Knife", 3);

/****************** Important information that is essential to the game ********************/

var fightOptions = ["Fight", "Run", "Use Item", "Check Status"];
var forcedFightOptions = ["Fight", "Use Item", "Check Status"];
var fleeAttemptMessage = "\nYou tried to run away!";
var fleeSuccessMessage = "You successfully ran away!";
var fleeFailureMessage = "You were unable to escape!";
function lostGameMessage() {
	console.log("\n\"Everything is going dark...\"");
	sleep.msleep(2000);
	console.log("..");
	sleep.msleep(1000);
	console.log(".");
	sleep.msleep(1000);
	console.log("\nYou were never seen again.\n");
	sleep.msleep(2000);
}
function wonGameMessage() {
	console.log("\nThat's it. It's finished. You escaped the clutches of those bunnies.");
	sleep.msleep(2000);
	console.log("...");
	sleep.msleep(1000);
	console.log("At least you think you did. You take a quick look around...");
	sleep.msleep(2000);
	console.log("And there's a...BUNNY!!!!!!!!");
	sleep.msleep(2000);
	console.log("\"DIE BUNNY!!!\"");
	sleep.msleep(2000);
	console.log("Right before you strike, you realize it's just a normal bunny.");
	sleep.msleep(2000);
	console.log("It looks like it wants food and is asking you.");
	sleep.msleep(2000);
	console.log("\"Awww...sorry little guy. I don't have anything.\"");
	sleep.msleep(2000);
	console.log("You walk away.");
	sleep.msleep(2000);
	console.log("As you walk away and disappear out of sight, ");
	sleep.msleep(2000);
	console.log("the bunny approaches the bunny dictator...");
	sleep.msleep(2000);
	console.log("..");
	sleep.msleep(1000);
	console.log(".");
	sleep.msleep(1000);
	console.log("\nCongratulations, you won the game!!!\n");
	sleep.msleep(2000);
}

/******************** Important functions that are essential to the game **********************/

/* Format of decisions: pass in area. The area contains information about all of
   its possible events. It uses this information to display options, and to carry
   out their consequences. The area is updated as needed.
   Once the loop of decisions in the current area is completed, the index of the
   next area in the areas array is returned. */
function decisionLoop(area) {
	var isRunning = true;
	area.story(); // run story dialogue and events for the first time entering the area
	while (isRunning) {
		// Prepare options for display
		options = [];
		for (var i = 0; i < area.events.length; i++) {
			options.push(area.events[i].option);
		}

		var index = readlineSync.keyInSelect(options, "What do you want to do?");
		// Handle the "cancel case"
		if (index === -1) {
			if (cancelExecution()) {
				return;
			}
			console.log("Please select one of the other options.");
			continue;
		}

		var event = area.events[index];
		isRunning = event.consequence(event.arguments);

		// Replace events that no longer have any purpose and that build on each other
		if (event.removable === "switch") {
			area.events.splice(index, 1, event.nextEvent);
		} else if (event.removable) {   // Remove events that serve no further purpose
			area.events.splice(index, 1);
		}
	}
	// Stop the decision making process if you're dead.
	if (!gameInProgress) {
		return;
	}
	// Remove dialogue if you return to the area
	area.story = function(){};
	// Produce string array for where to go next.
	var newAreas = [];
	var areaIndex;
	for (var i = 0; i < area.connectedAreas.length; i++) {
		areaIndex = area.connectedAreas[i];
		newAreas.push(areas[areaIndex].name);
	}
	// Check if you can leave the area.
	if (newAreas.length === 0) {
		console.log("But, you cannot leave the area.");
		return decisionLoop(area);
	}
	// Return index of next area, or return the same area if canceled.
	var newIndex = readlineSync.keyInSelect(newAreas, "Where do you want to go?");
	if (newIndex === -1) {
		console.log("You decided to stay in the area.");
		return decisionLoop(area);
	}
	return newIndex;
}

/****************************** Common Decision Functions *********************************/

// // Explore something. Leads to new decision tree.
// function explore(player) {
// 	if (!walk(player)) {
// 		gameInProgress = false;
// 	} else {
// 		return false;
// 	}
// }

// // Fight something. Leads to new decision tree. EnemyPlayer is an array: [enemy, player]
// function encounter(enemyPlayer) {
// 	if (!fight(enemyPlayer[0], enemyPlayer[1])) {
// 		gameInProgress = false;
// 	} else {
// 		return false;
// 	}
// }

// Completely heal player
function heal(playerMessage) {
	console.log(playerMessage[1]);
	playerMessage[0].hp = playerMessage[0].maxHP;
	return true;
}

// Checks status in the tree. Stay in the area.
function checkStatus(player) {
	printStatus(player);
	return true;
}

// Opens menu to unlocked connected areas.
function leaveTheArea() {
	console.log("You decide to leave the area.");
	return false;
}

// Gather info in the area. Stay in the area.
function displayMessage(message) {
	console.log(message);
	return true;
}

// Leads to new decision tree.
function unlockAreas(messageCurrentAreaIndexNewAreaIndex) {
	var info = messageCurrentAreaIndexNewAreaIndex;
	console.log(info[0]);
	for (var i = 0; i < info[2].length; i++) {
		console.log("The " + areas[info[2][i]].name + " is now available.");
		areas[info[1]].connectedAreas.push(info[2][i]);
	}
	return true;
}

// Lose an item
function loseItem(playerItemMessage) {
	console.log(playerItemMessage[2]);
	var item = playerItemMessage[1];
	playerItemMessage[0].removeItem(item);
	return true;
}

// Use an item to unlock an area.
function loseItemAndUnlockAreas(playerItemMessageCurAreaIndexNewAreaIndex) {
	var info = playerItemMessageCurAreaIndexNewAreaIndex;
	loseItem([info[0], info[1], info[2]]);
	unlockAreas([info[2], info[3], info[4]])
	return true;
}

// Obtain an item in the area. Stay in the area. PlayerItem is an array: [player, item, message]
function getItems(playerItemMessage) {
	console.log(playerItemMessage[2]);
	for (var i = 0; i < playerItemMessage[1].length; i++) {
		var item = playerItemMessage[1][i];
		new Item(item[0], item[1], item[2], item[3])
		playerItemMessage[0].addItem(new Item(item[0], item[1], item[2], item[3]));
	}
	return true;
}

// Allows the player to obtain a new weapon
function getWeapon(playerWeaponMessage) {
	console.log(playerWeaponMessage[2]);
	equipWeapon(playerWeaponMessage[0], playerWeaponMessage[1]);
	return true;
}

// Allows the player to use an item while in the field
function useItemInField(player) {
	var itemChoice = selectItem(player);
	if (itemChoice === "Empty" || itemChoice === -1) {
		return true;
	}
	var item = player.inventory[itemChoice];
	if (item === undefined || !isUseable(true, item)) {
		console.log("You examine the " + item.name + " and put it back into your inventory.")
		return true;
	}
	if (isUseable(true, item) && player.hp === player.maxHP) {
		console.log("You are already at full health.")
		return true;
	}
	item.use(player);
	player.inventory.splice(itemChoice, 1);
	return true;
}

// The Final Escape Special Event
function randomEncounterWalk(playerAreas) {
	console.log("You see a sign saying it is about 3 kilometers to the exit.");
	sleep.msleep(2000);
	console.log("You start pushing forward.");
	sleep.msleep(2000);

	// Loop for ~4 encounters
	var player = playerAreas[0];
	var i = 0;
	while (i < 3) {
		if (!walk(player)) {
			gameInProgress = false;
			return false;
		}
		i += 0.25;
		console.log("You have walked " + i + " kilometers.");
	}
	// Story
	console.log("You made it all the way through, and the path seems clear.");
	sleep.msleep(2000);
	console.log("If you wish to continue or go back, no enemies will attack you.");
	sleep.msleep(2000);
	console.log("The " + areas[8].name + " is now available.");
	// Add new area
	playerAreas[1][7].connectedAreas.push(8);
	return false;
}

// The Final Boss Special Event
function finalEncounter(enemyPlayer) {
	console.log('Bunny Dictator: "Hmmm...?');
	sleep.msleep(1500);
	console.log('I see. You\'ve woken up. Welcome.');
	sleep.msleep(2000);
	console.log('You probably don\'t understand what\'s going on.');
	sleep.msleep(2000);
	console.log('This is our headquarters.');
	sleep.msleep(2000);
	console.log('Our kind has been experimented on by humans for years.');
	sleep.msleep(2000);
	console.log('What humans didn\'t know is how intelligent we bunnies were.');
	sleep.msleep(2000);
	console.log('One of our kind, who was formerly experimented on; she escaped.');
	sleep.msleep(2000);
	console.log('She vowed that our times of abuse were over.');
	sleep.msleep(1800);
	console.log('She established these headquarters as a place of protection and research."');
	sleep.msleep(2000);
	console.log("...");
	sleep.msleep(1000);
	console.log('"But I see that you killed my closest comrades.');
	sleep.msleep(2000);
	console.log('There is nothing left for me here, now.');
	sleep.msleep(2000);
	console.log('But for her, our founder, and my mother...');
	sleep.msleep(2000);
	console.log('I will see that her dream continues and annihilate all who stand in my way!"');
	sleep.msleep(2500);
	if (!forcedFight(enemyPlayer[0], enemyPlayer[1])) {
		gameInProgress = false;
	} else {
		return false;
	}
}

/**************************** End of Common Decision Functions *******************************/

/******************** Utility Functions to Implement Common Decisions ************************/

// Returns true if the player makes it to the destination, false if he or she died
function walk(player) {
	if (Math.random() < 0.34) {
		return fight(returnRandomIndex(), player); 
	}
	return true;
}

// Returns true if the player is still alive, false if he or she died.
function fight(enemyInfo, player) {
	enemy = new Enemy(enemyInfo[0], enemyInfo[1], enemyInfo[2], enemyInfo[3]);
	console.log("You encountered a " + enemy.name + "!");
	while (true) {
		// Player's turn
		var fightChoice = readlineSync.keyInSelect(fightOptions, "Your turn: ");
		switch(fightChoice) {
			case 0: // attack
				player.attack(enemy);
				break;
			case 1: // run
				if (fleeAttempt()) {
					return true;
				}
				break;
			case 2: // use item
				if (!selectAndUseItem(player, enemy)) {
					continue;
				} else {
					break;
				}
			case 3: 
				printStatus(player);
				continue;
			default:
				if (cancelExecution()) {
					return false;
				}
				continue;
		}

		// Enemy's turn
		if (enemy.hp > 0) {
			enemy.attack(player);
			if (player.hp <= 0) {
				return false;
			}
		} else {
			enemy.reward(player);
			return true;
		}
	}
}

// Version of fight where escape is not an option--for story events.
function forcedFight(enemyInfo, player) {
	enemy = new Enemy(enemyInfo[0], enemyInfo[1], enemyInfo[2], enemyInfo[3]);
	console.log("You encountered a " + enemy.name + "!");
	while (true) {
		// Player's turn
		var fightChoice = readlineSync.keyInSelect(forcedFightOptions, "Your turn: ");
		switch(fightChoice) {
			case 0: // attack
				player.attack(enemy);
				break;
			case 1: // use item
				if (!selectAndUseItem(player, enemy)) {
					continue;
				} else {
					break;
				}
			case 2: 
				printStatus(player);
				continue;
			default:
				if (cancelExecution()) {
					return false;
				}
				continue;
		}

		// Enemy's turn
		if (enemy.hp > 0) {
			enemy.attack(player);
			if (player.hp <= 0) {
				return false;
			}
		} else {
			enemy.reward(player);
			return true;
		}
	}
}

/* Displays all of the player's current items and prompts the user to choose one.
   It returns "Empty" if he or she does not have any items. */
function selectItem(player, enemy) {
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

// Checks if the item is usable under the current circumstances
function isUseable(inField, item) {
	return !inField || item.isUseableInField;
}

// Returns true if the attempt is successful, false otherwise.
function fleeAttempt() {
	console.log(fleeAttemptMessage);
	if (Math.random() < 0.5) {
		console.log(fleeSuccessMessage);
		return true;
	} else {
		console.log(fleeFailureMessage);
		return false;
	}
}

// Prints current status of the player
function printStatus(player) {
	console.log("Name: " + player.name);
	console.log("HP: " + player.hp + " / " + player.maxHP);
	var minPower = player.attackPower[0] + player.weapon;
	var maxPower = player.attackPower[1] + player.weapon;
	console.log("Attack: " + minPower + " - " + maxPower);
	console.log("Inventory:\n" + returnItemsString(player));
}

/* Picks a random enemy from the current possibilities and returns a newly constructed
   version of that enemy. */
function returnRandomIndex() {
	return enemies[Math.floor(Math.random() * enemies.length)];
}

// Allow the user to quit if they hit the cancel key
function cancelExecution() {
	choice = "undecided";
	while (choice !== 1) {
		var choice = readlineSync.keyInSelect(["Yes", "No"], "Game paused. Are you sure you want to quit?");
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
}

// Allows the user to recover HP, but not exceed maxHP.
function recoverHP(object, number) {
	object.hp += number;
	if (object.hp > object.maxHP) {
		object.hp = object.maxHP;
	}
}

/**************************** End of Utility Functions *********************************/

/************************** Area and Event Constructors ********************************/

// EVENT CONSTRUCTOR
function Event(option, consequence, argumentsArray, removable, nextEvent) {
	this.option = option;
	this.consequence = consequence;
	this.arguments = argumentsArray;
	this.removable = removable;
	this.nextEvent = nextEvent;
}

// Default Events Available for All Areas
var checkCurrentStatus = new Event("Check your current status", 
								   checkStatus, 
								   player, 
								   false, 
								   {}
								  );
var useItemInField = new Event("Use an item", 
							   useItemInField, 
							   player, 
							   false, 
					   		   {}
							  );

var leaveArea = new Event("Leave the area", 
						  leaveTheArea, 
						  "", 
						  false, 
					   	  {}
					     );

// AREA CONSTRUCTOR
function Area(name, connectedAreas, number, story) {
	this.name = name;
	this.events = [leaveArea, checkCurrentStatus, useItemInField];
	this.connectedAreas = connectedAreas;
	this.story = story;
	this.number = number;
}

/************************ End Area and Event Constructors ******************************/

/*********************************** Area List *****************************************/

/************************************* Area0 *******************************************/

var swRoom0 = new Area("SW Room", [], 0, function() {
		console.log('"....ughhh"');
		sleep.msleep(1500);
		console.log('"...what happened?"\n');
		sleep.msleep(1500);
		console.log('As you wake up and look around, a name comes to mind...');
		sleep.msleep(2000);
		console.log('"I must have hit my head. Can"' + "'t believe I almost forgot. It's...\"\n");
		sleep.msleep(2000);

		// Name established
		player.name = readlineSync.question("Please enter your name: ");

		console.log("\n\"...I'm " + player.name + '. My head hurts. I wonder if I actually forgot anything.');
		sleep.msleep(2000);
		console.log("Like...for example, where I'm at. What is this place?\"\n");
		sleep.msleep(2000);
		console.log("As you look around, you notice that you are in a simple room. The walls");
		sleep.msleep(2000);
		console.log("are a dull grey; the bed you are on is simple: wood, white sheets, and white");
		sleep.msleep(2000);
		console.log("blankets. There's a nightstand by the bed. You don't sense any danger, but");
		sleep.msleep(2000);
		console.log("you don't quite feel comfortable either.");
		sleep.msleep(2000);
	}
);

/*********************************** End Area ******************************************/

/************************************* Area1 *******************************************/

var wRoom1 = new Area("W Room", [0, 4], 1, function() {
		console.log("As you walk down the hallway, you notice a bunny. It looks so cute.");
		sleep.msleep(2000);
		console.log("You take a closer look and it turns around and looks at you.");
		sleep.msleep(2000);
		console.log('Bunny: "Hi, how are you feeling? We found you the other day."');
		sleep.msleep(2000);
		console.log('You: ...!!!!!');
		sleep.msleep(1500);
		console.log("Bunny: \"What's wrong? Ain't you ever seen a talking bunny before?\"");
		sleep.msleep(2000);
		
		var index = readlineSync.keyInSelect(["You: \"Yes\"", "You: \"No\"", "You: \"Where am I?\""], "Bunny: \"Anyways, are you feeling better?\"");

		if (index === 0) {
			console.log("\nBunny: \"That's great! Let me lead you back to your room so you can finish your recovery.\"");
		} else if (index === 1) {
			console.log("\nBunny: \"Uh oh! Let me lead you back to your room so you can finish your recovery.\"");
		} else if (index === 2) {
			console.log("\nBunny: \"Uh no, you must have hit your head. Let me lead you back to your room.\"");
		} else {
			console.log("\nBunny: \"Uh no, you can't talk. You must have hit your head.\"");
			sleep.msleep(2000);
			console.log("\"Let me lead you back to your room.\"");
		}
		sleep.msleep(2000);

		console.log("...");
		sleep.msleep(1500);
		console.log("\"What's with the suspicious look?\"");
		sleep.msleep(2000);
		console.log("\"Fine, I'll take you back by force!\"");
		sleep.msleep(2000);

		if (forcedFight(bunny, player)) {
			console.log("\n\"That bunny talked! And it attacked me! Where the heck am I?\"");
			sleep.msleep(2000);
		}
	}
);

/************************************ End Area *****************************************/

/************************************* Area2 *******************************************/

var lab2 = new Area("Lab", [1], 2, function() {
		console.log("You step into the lab.");
		sleep.msleep(1500);
		console.log("Bunny in a lab coat: \"Hey, what are you doing in here?!");
		sleep.msleep(2000);
		console.log('Get out of here!"');
		sleep.msleep(2000);

		if (forcedFight(scientistBunny, player)) {
			console.log("\n\"Was that a scientist bunny?! This just keeps getting weirder!\"");
			sleep.msleep(2000);
		}
	}
);

/************************************ End Area *****************************************/

/************************************* Area3 *******************************************/

var seRoom3 = new Area("SE Room", [0, 4], 3, function() {
		console.log("Walking through the hallway, you come across a bunny. It looks adorable.");
		sleep.msleep(2000);
		console.log("You come closer look and it turns around. It stares at you.");
		sleep.msleep(2000);
		console.log('Bunny: "Hi, you must be new here. I\'m Bob. Who are you?"');
		sleep.msleep(2000);
		console.log('You: ......');
		sleep.msleep(1500);
		console.log("Bunny: \"Ahem...?\"");
		sleep.msleep(1500);
		console.log('You: "(Oh, right.) I\'m ' + player.name + '."');
		sleep.msleep(2000);
		console.log('Bunny: "Nice to meet you, ' + player.name + ". Are you lost?\"");
		sleep.msleep(2000);

		var index = readlineSync.keyInSelect(['You: "Can I talk to you about what\'s going on? I\'m confused."', 'You: "I want to keep looking around, if that\'s okay."'], 'Bunny: "I\'ll take you back to your room."');
		sleep.msleep(2000);

		console.log("...");
		sleep.msleep(1500);
		console.log("\"...How about I just make you come with me instead?!\"");
		sleep.msleep(2000);

		if (forcedFight(bunny, player)) {
			console.log("\n\"He...she...it spoke to me! And attacked me! What's going on?!\"");
			sleep.msleep(2000);
		}
	}
);

/************************************ End Area *****************************************/

/************************************* Area4 *******************************************/

var eRoom4 = new Area("E Room", [1, 3, 6], 4, function() {
		console.log("As you enter the room, you notice that it looks quite a bit like an armory.");
		sleep.msleep(2000);
		console.log("Weapons are all over the place.");
		sleep.msleep(2000);
		console.log("It seems like it hasn't been tidied up in some time.");
		sleep.msleep(2000);
		console.log("You also notice a door on the east side of the room.");
		sleep.msleep(2000);
	}
);

/************************************ End Area *****************************************/

/************************************* Area5 *******************************************/

var treasury5 = new Area("Treasury", [4], 5, function() {
		console.log("You step into the treasury.");
		sleep.msleep(2000);
		console.log("\"No bunnies. No other talking animals...Finally.");
		sleep.msleep(2000);
		console.log("I can rest a little bit here.\"");
		sleep.msleep(2000);
		console.log("Gold is piled up all around the room. And...carrots.");
		sleep.msleep(2000);
		console.log("\"Figures...\"");
		sleep.msleep(1500);
	}
);

/************************************ End Area *****************************************/

/************************************* Area6 *******************************************/

var neRoom6 = new Area("NE Room", [4, 7], 6, function() {
		console.log("As you walk into the room, you see another bunny. Great.");
		sleep.msleep(2000);
		console.log("This one is wearing armor. You don't even bother talking.");
		sleep.msleep(2000);
		console.log("You walk over, ready to fight.");
		sleep.msleep(2000);

		if (forcedFight(soldierBunny, player)) {
			console.log("\n\"And that was a soldier bunny. I'm not even surprised anymore.\"");
			sleep.msleep(2000);
		}
	}
);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

var escape7 = new Area("Forest", [6], 7, function() {
		console.log("As you step outside of the building, you realize that you are in a forest.");
		sleep.msleep(2000);
		console.log("A bit of an ominous one, at that.");
		sleep.msleep(2000);
		console.log("Examining the outside of the building, it looks like a small fortress.");
		sleep.msleep(2000);
		console.log("Looking for a way out of the forest, you notice that the forest is very dense.");
		sleep.msleep(2000);
		console.log("There is only one clear path, and in your current state,");
		sleep.msleep(2000);
		console.log("it appears to be your only option.");
		sleep.msleep(2000);
	}
);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

var forestExit8 = new Area("Forest Exit", [7], 8, function() {
		console.log("As you step out of the forest and into the clearing,");
		sleep.msleep(2000);
		console.log("you see another bunny and some sort of machine. No one else is around.");
		sleep.msleep(2000);
		console.log("The bunny has already spotted you, so there's no running away now.");
		sleep.msleep(2000);
	}
);

/************************************ End Area *****************************************/

/*********************************** End Areas *****************************************/

/*********************************** Area Array ****************************************/

var areas = [swRoom0, wRoom1, lab2, seRoom3, eRoom4, treasury5, neRoom6, escape7, forestExit8];

/******************************* Universal Event Options *************************************/

// var checkCurrentStatus = new Event("Check your current status", 
// 								   checkStatus, 
// 								   player, 
// 								   false, 
// 								   {}
// 								  );
// var useItemInField = new Event("Use an item", 
// 							   useItemInField, 
// 							   player, 
// 							   false, 
// 					   		   {}
// 							  );

// var leaveArea = new Event("Leave the area", 
// 							   leaveTheArea, 
// 							   "", 
// 							   false, 
// 					   		   {}
// 							  );

/********************************** Event List *****************************************/

/************************************* Area0 *******************************************/

var checkCupboard0 = new Event("Examine the cupboard",
							  getWeapon,
							  [player, knife, "You searched the cupboard and found a knife."],
							  true, 
							  {}
							 );

var checkDoor0 = new Event("Examine the door", 
						  displayMessage, 
						  "You check the door and notice it is locked. It seems sturdy, but you notice a keyhole.", 
						  true, 
						  {}
						 );

var checkRoom0 = new Event("Examine the room",
						  getItems, 
						  [player, [key], "As you examined the bed, you saw something shining and decided to examine it closer."], 
						  "switch", 
						  new Event("Open the door",
				  					loseItemAndUnlockAreas,
				  					[player, key, "You used the key to open the door.", [0], [1, 3]],
				  					true,
				  					{}
								   ),
						 );

/************************************ End Area *****************************************/

swRoom0.events.push(checkCupboard0, checkDoor0, checkRoom0);

/************************************* Area1 *******************************************/

var checkRoom1 = new Event("Examine the room",
						   displayMessage,
						   "You look around the room. You see a door and a hallway. There is a poster on the wall that looks like a...bunny army soluting a bunny dictator. Cute but disturbing.",
						   true,
						   {}
						  );

var checkDoor1 = new Event("Examine the door", 
						   unlockAreas, 
						   ["You check the door and see that it is unlocked. It looks like it leads to a laboratory of some sort.", [1], [2]], 
						   true, 
						   {}
						  );

/************************************ End Area *****************************************/

wRoom1.events.push(checkDoor1, checkRoom1);

/************************************* Area2 *******************************************/

var checkRoom2 = new Event("Examine the room",
						   displayMessage,
						   "You look around the lab. You see what looks like a human body on the table. Are they performing a dissection on them?",
						   "switch", 
						   new Event("Inspect the dissection table",
				  					getWeapon,
				  					[player, surgicalKnife, "After inspection and being scarred for life, you decide to take the surgical knife with you."],
				  					true,
				  					{}
								   ),
						  );

/************************************ End Area *****************************************/

lab2.events.push(checkRoom2);

/************************************* Area3 *******************************************/

var checkRoom3 = new Event("Examine the room",
						   displayMessage,
						   "You look around the room. It's empty. The hallway continues down into another room.",
						   true,
						   {}
						  );

/************************************ End Area *****************************************/

seRoom3.events.push(checkRoom3);

/************************************* Area4 *******************************************/

var checkRoom4 = new Event("Examine the door",
						   displayMessage,
						   "The door looks like it belongs to a treasury. You notice a keyhole.",
						   true,
						   {}
						  );

var checkArmory4 = new Event("Search the armory",
							   getWeapon,
							   [player, bunnySword, "You searched the armory and found a bunny sword."],
							   true, 
							   {}
							  );

/************************************ End Area *****************************************/

eRoom4.events.push(checkRoom4, checkArmory4);

/************************************* Area5 *******************************************/

var lootRoom5 = new Event("Loot the treasury",
						   getItems, 
						   [player, [carrot, carrot], "At first, you were very greedy. But then you realized you could only take two carrots with you."], 
						   true,
						   {}
						  );

var heal5 = new Event("Eat as much as possible",
					  heal, 
					  [player, "You ate like a champ and recovered all your health."], 
					  false,
					  {}
				     );

/************************************ End Area *****************************************/

treasury5.events.push(lootRoom5, heal5);

/************************************* Area6 *******************************************/

var checkRoom6 = new Event("Examine the room",
						   displayMessage,
						   "You look around the room. It appears to be the main entrance to the building. You also see two dictator bunny posters. One of them looks a little funny...",
						   "switch",
						   new Event("Inspect the poster",
						  			 unlockAreas, 
						  			 ["Upon closer inspection, you find the key to the treasury.", [4], [5]], 
						  			 true,
						  			 {}
						  			)
						  );

/************************************ End Area *****************************************/

neRoom6.events.push(checkRoom6);

/************************************* Area5 *******************************************/

var checkRoom7 = new Event("Proceed through the forest",
						   randomEncounterWalk,
						   [player, areas],
						   true,
						   {}
						  );

/************************************ End Area *****************************************/

escape7.events.push(checkRoom7);

/************************************* Area5 *******************************************/

var checkRoom8 = new Event("Examine the area",
						   displayMessage,
						   "You look around. You see a militaristic bunny and a large machine...a tank, maybe? Yikes. If you want to escape, you'll have to fight it.",
						   true,
						   {}
						  );

var finalBattle8 = new Event("Fight!!!",
						     finalEncounter,
						     [finalBoss, player],
						     true,
						     {}
						    );

/************************************ End Area *****************************************/

forestExit8.events.push(checkRoom8, finalBattle8);

/*********************************** END EVENTS ****************************************/

/*********************************** Game Loop *****************************************/

// var won = false;
// var gameInProgress = true;
// var voluntaryExit = false;

var currentAreaIndex = 0;
var connectedIndex;
var area;
while (gameInProgress) {
	area = areas[currentAreaIndex];
	connectedIndex = decisionLoop(area);
	currentAreaIndex = area.connectedAreas[connectedIndex];
}

if (voluntaryExit) {
	console.log("\nGame terminated at user's request.\n");
} else if (!won) {
	lostGameMessage();
} else {
	wonGameMessage();
} 

/********************************* End Game Loop ***************************************/
