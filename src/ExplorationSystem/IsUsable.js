// Checks if the item is usable under the current circumstances
function isUseable(inField, item) {
  return !inField || item.isUseableInField;
}
