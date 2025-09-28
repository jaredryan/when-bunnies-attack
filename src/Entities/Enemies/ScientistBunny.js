import Item from "../Item.js";
import bunnySteroid from "../Items/BunnySteroid.js";
import getItems from "../../ExplorationSystem/GetItems.js";

const scientistBunny = [
  "Scientist Bunny",
  3,
  [2, 2],
  function (player) {
    return getItems([bunnySteroid], [], player);
  },
];

export default scientistBunny;
