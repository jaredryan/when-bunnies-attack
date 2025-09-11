
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
	console.log("\nCongratulations, you won the game!!! And escaped...probably.\n");
	sleep.msleep(2000);
}