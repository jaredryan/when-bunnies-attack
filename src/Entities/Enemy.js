// ENEMIES CONSTRUCTOR
function Enemy(name, hp, attackPower, reward) {
  this.name = name;
  this.maxHp = hp;
  this.hp = hp;
  this.attackPower = attackPower; // a range: [min, max]
  this.hasDied = false;

  this.attack = function (player) {
    const damage =
      Math.floor(
        Math.random() * (this.attackPower[1] - this.attackPower[0] + 1),
      ) + this.attackPower[0];

    player.takeDamage(damage);

    return [`${this.name} attacks! You took ${damage} damage.`];
  };

  this.reward = function (player) {
    return reward(player);
  };

  this.takeDamage = function (damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
      this.hasDied = true;
    }
  };
}

export default Enemy;
