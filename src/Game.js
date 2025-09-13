// Initialization

// Require Statements
const readlineSync = require("readline-sync");

/********** Set Player, Enemies, Items, and other useful information **********/

// In-game variables
let won = false;
let gameInProgress = true;
let voluntaryExit = false;
let currentAreaIndex = 0;
let connectedIndex;
let area;

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
