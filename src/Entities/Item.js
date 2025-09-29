function Item(name, description, isUseableInField, isUseableInBattle, effect) {
  this.name = name;
  this.description = description;
  this.isUseableInField = isUseableInField;
  this.isUseableInBattle = isUseableInBattle;
  this.use = function (player, enemy) {
    return [`You used the ${this.name}!`, ...effect(player, enemy)];
  };
}

export default Item;
