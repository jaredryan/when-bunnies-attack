// Checks if the item is usable under the current circumstances
const isUseable = (inField, item) =>
  inField ? item.isUseableInField : item.isUseableInBattle;

export default isUseable;
