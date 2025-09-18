import Item from "../Entities/Item";

// Obtain an item in the area. Stay in the area. PlayerItem is an array: [item, message]
const getItems = (itemMessage, player) => {
  console.log(itemMessage[1]);
  const items = itemMessage[0];
  for (const itemInfo of items) {
    player.addItem(new Item(...itemInfo));
  }
  return true;
}

export default getItems
