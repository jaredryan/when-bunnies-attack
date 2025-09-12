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

		console.log("\n\"...I'm " + player.name + '. My head hurts. I wonder what else I forgot.');
		sleep.msleep(2000);
		console.log("Like...for example, where I'm at. Where the heck am I?\"\n");
		sleep.msleep(2000);
		console.log("As you look around, you notice that you are in a simple room.");
		sleep.msleep(2000);
		console.log("The walls are a dull grey; the bed you are on is simple: wood, white sheets, and white blankets.");
		sleep.msleep(2000);
		console.log("There's a nightstand by the bed. You don't sense any danger, but you don't quite feel comfortable either.");
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
