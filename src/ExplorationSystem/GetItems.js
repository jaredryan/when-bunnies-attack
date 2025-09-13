// Obtain an item in the area. Stay in the area. PlayerItem is an array: [player, item, message]
const getItems = (playerItemMessage) => {
  console.log(playerItemMessage[2]);
  for (var i = 0; i < playerItemMessage[1].length; i++) {
    var item = playerItemMessage[1][i];
    new Item(item[0], item[1], item[2], item[3]);
    playerItemMessage[0].addItem(new Item(item[0], item[1], item[2], item[3]));
  }
  return true;
}

export default getItems
