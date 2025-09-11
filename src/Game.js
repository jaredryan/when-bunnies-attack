// Initialization

// Require Statements
var readlineSync = require("readline-sync");
var sleep = require("sleep");

/********** Set Player, Enemies, Items, and other useful information **********/

// In-game variables
var won = false;
var gameInProgress = true;
var voluntaryExit = false;
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
