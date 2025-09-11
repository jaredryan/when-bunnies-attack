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
