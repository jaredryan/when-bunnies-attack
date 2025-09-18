// Checks if the item is usable under the current circumstances
const isUseable = (inField, item) => {
  return !inField || item.isUseableInField;
};

export default isUseable;
