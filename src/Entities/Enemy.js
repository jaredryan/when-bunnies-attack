// ENEMIES CONSTRUCTOR
function Enemy(name, hp, attackPower, reward) {
  this.name = name;
  this.hp = hp;
  this.attackPower = attackPower; // a range: [min, max]
  this.hasDied = false;

  this.attack = function (player) {
    console.log(`${this.name} attacks!`);

    const damage =
      Math.floor(
        Math.random() * (this.attackPower[1] - this.attackPower[0] + 1),
      ) + this.attackPower[0];

    console.log(`You took ${damage} damage!`);

    player.takeDamage(damage);    
  };

  this.reward = function (player) {
    console.log(`${player.name} defeated the ${this.name}!`);
    
    reward(player);
  };

  this.takeDamage = function (damage) {
    this.hp -= damage

    if (this.hp <= 0) {
      this.hasDied = true
    }
  }
}

export default Enemy
