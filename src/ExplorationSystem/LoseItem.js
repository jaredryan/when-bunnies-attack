// Lose an item
const loseItem = (item, message, player) => {
  player.removeItem(item);
  return message;
};

export default loseItem;
