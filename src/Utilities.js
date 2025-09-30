import messages from "./Messages";

// Returns true if the attempt is successful, false otherwise.
export const fleeAttempt = () => {
  if (Math.random() < 0.34) {
    return {
      success: true,
      text: messages.fleeSuccessMessage,
    };
  } else {
    return {
      success: false,
      text: messages.fleeFailureMessage,
    };
  }
};

// Checks if the item is usable under the current circumstances
export const isUseable = (inField, item) =>
  inField ? item.isUseableInField : item.isUseableInBattle;

// Allows the user to use the item
export const utilizeItem = (player, enemy, itemIndex) => {
  const item = player.inventory[itemIndex];
  player.inventory.splice(itemIndex, 1);
  return item.use(player, enemy);
};
