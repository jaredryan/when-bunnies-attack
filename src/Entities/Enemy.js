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

  this.reward = function (player, setPageContainerClassName) {
    return reward(player, setPageContainerClassName);
  };

  this.takeDamage = function (damage) {
    let newHp = this.hp - damage;
    
    if (newHp <= 0) {
      this.hp = 0
      this.hasDied = true;
    } else {
      this.hp = newHp
    }
  };
}

export default Enemy;
