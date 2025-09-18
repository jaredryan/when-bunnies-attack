// Lose an item
const loseItem = (itemMessage, player) => {
  console.log(itemMessage[1]);
  const item = itemMessage[0];
  player.removeItem(item);
  return true;
};

export default loseItem;
