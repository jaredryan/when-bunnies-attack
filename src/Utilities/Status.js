// Prints current status of the player
function printStatus(player) {
	console.log("Name: " + player.name);
	console.log("HP: " + player.hp + " / " + player.maxHP);
	var minPower = player.attackPower[0] + player.weapon;
	var maxPower = player.attackPower[1] + player.weapon;
	console.log("Attack: " + minPower + " - " + maxPower);
	console.log("Inventory:\n" + returnItemsString(player));
}
