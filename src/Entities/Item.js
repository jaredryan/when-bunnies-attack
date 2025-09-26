function Item(name, description, isUseableInField, effect) {
  this.name = name;
  this.description = description;
  this.isUseableInField = isUseableInField;
  this.use = function (player, enemy) {
    effect(player, enemy);
    return [`You used the ${this.name}!`];
  };
}

export default Item;
