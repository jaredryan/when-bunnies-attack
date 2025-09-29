import bunnySteroid from "../Items/BunnySteroid.js";
import getItems from "../../ExplorationSystem/GetItems.js";

const scientistBunny = [
  "Scientist Bunny",
  4,
  [2, 2],
  function (player) {
    return getItems([bunnySteroid], [], player).text;
  },
];

export default scientistBunny;
