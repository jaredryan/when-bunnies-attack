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

/* Picks a random enemy from the current possibilities and returns a newly constructed
   version of that enemy. */
function returnRandomIndex() {
	return enemies[Math.floor(Math.random() * enemies.length)];
}

// Returns true if the player makes it to the destination, false if he or she died
function walk(player) {
	if (Math.random() < 0.34) {
		return fight(returnRandomIndex(), player); 
	}
	return true;
}
