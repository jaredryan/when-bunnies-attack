// ENEMIES CONSTRUCTOR
function Enemy(name, hp, attackPower, reward) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower; // a range: [min, max]
    this.attack = function(player) {
    	console.log(this.name + " attacks!");
    	var damage = Math.floor(Math.random() * (this.attackPower[1] - this.attackPower[0] + 1)) + this.attackPower[0];
		player.hp -= damage;
		console.log("You took " + damage + " damage!");	
	};
	this.reward = function(player) {
		console.log(player.name + " defeated the " + this.name + "!");
		reward(player);
	}
}
