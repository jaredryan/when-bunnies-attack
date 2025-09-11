var bunnySteroid = ["Bunny Steroid", "This costs you 2 health points, but allows you to damage the enemy with an additional 4 points to your normal attack.", false, function(player, enemy) {
	player.attack(enemy);
	enemy.hp -= 4;
}];
