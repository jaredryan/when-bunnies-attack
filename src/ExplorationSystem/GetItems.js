import Item from "../Entities/Item";

// Obtain an item in the area. Stay in the area. PlayerItem is an array: [item, message]
const getItems = (items, message, player) => {
  const itemsAcquiredLog = []
  for (const itemInfo of items) {
    itemsAcquiredLog.push(itemInfo[0])
    player.addItem(new Item(...itemInfo));
  }

  const itemMessageString = `You obtained: ${itemsAcquiredLog.join(', ')}`
  return [
    ...message,
    itemMessageString,
  ];
};

export default getItems;
