// PLAYER DEFINITION
function Player() {
  this.name = "Unknown";
  this.hp = 1;
  this.maxHp = 10;
  this.attackPowerRange = [0, 1];
  this.weapon = 0;
  this.attackPower = this.attackPowerRange.map((power) => power + this.weapon); // [min, max]
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
    const damage =
      this.attackPower[Math.floor(Math.random() * this.attackPower.length)];
    enemy.takeDamage(damage);
    return [`You attack! ${enemy.name} took ${damage} damage.`];
  };

  this.takeDamage = (damage) => {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hasDied = true;
    }
  };

  this.heal = (hpToHeal) => {
    let newHp = this.hp + hpToHeal;
    let hpHealed = hpToHeal;

    if (newHp > this.maxHp) {
      hpHealed -= newHp - this.maxHp;
      newHp = this.maxHp;
    }

    this.hp = newHp;
    return [`You recovered ${hpHealed} health.`];
  };

  this.equipWeapon = (weapon) => {
    const lowerCaseWeapon = weapon.name
      .split(" ")
      .map((word) => word.toLowerCase())
      .join(" ");
    if (weapon.power > this.weapon) {
      this.weapon = weapon.power;
      this.attackPower = this.attackPowerRange.map(
        (power) => power + this.weapon,
      );
      return `You equipped the ${lowerCaseWeapon}. Your attack is now ${this.attackPower.join(" - ")}.`;
    }

    return `You discarded the ${lowerCaseWeapon} because it is weaker than your current weapon.`;
  };
}

export default Player;
