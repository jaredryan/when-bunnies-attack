// Lose an item
const loseItem = (item, message, player) => {
  player.removeItem(item);
  return { text: message };
};

export default loseItem;
