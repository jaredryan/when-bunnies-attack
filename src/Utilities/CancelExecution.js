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
