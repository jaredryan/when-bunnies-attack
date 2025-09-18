// PLAYER DEFINITION
function Player() {
  this.name = "Unknown";
  this.hp = 10;
  this.maxHP = 10;
  this.attackPower = [0, 1]; // [min, max]
  this.weapon = 0;
  this.inventory = [];
  this.hasWon = false;
  this.hasDied = false;

  this.addItem = (item) => {
    this.inventory.push(item);
  };

  this.removeItem = (item) => {
    const removeIndex = this.inventory.indexOf(item);
    this.inventory.splice(removeIndex, 1);
  };

  this.attack = (enemy) => {
    console.log(`You attack!`);
    const damage =
      Math.floor(
        Math.random() * (this.attackPower[1] - this.attackPower[0] + 1),
      ) +
      this.attackPower[0] +
      this.weapon;
    enemy.takeDamage(damage);
    console.log(`${enemy.name} took ${damage} damage!`);
  };

  this.takeDamage = (damage) => {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hasDied = true;
    }
  };

  this.heal = (hp) => {
    const newHp = this.hp + hp;

    this.hp = newHp <= this.maxHP ? newHp : this.maxHP;
  };

  this.equipWeapon = (weapon) => {
    console.log(weapon)
    console.log(this.weapon)
    if (weapon.power > this.weapon) {
      
      this.weapon = weapon.power;
      return `You equipped the ${weapon.name}.`;
    }

    return `You discarded the ${weapon.name} because it is weaker than your current weapon.`
  };
}

export default Player;
