// Allows the user to recover HP, but not exceed maxHP.
function recoverHP(object, number) {
	object.hp += number;
	if (object.hp > object.maxHP) {
		object.hp = object.maxHP;
	}
}
