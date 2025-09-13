function Item(name, description, isUseableInField, effect) {
  this.name = name;
  this.description = description;
  this.isUseableInField = isUseableInField;
  this.use = function (player, enemy) {
    console.log("You used the " + this.name + "!");
    effect(player, enemy);
  };
}

export default Item
