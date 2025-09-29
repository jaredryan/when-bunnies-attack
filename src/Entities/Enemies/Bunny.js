import carrot from "../Items/Carrot.js";
import getItems from "../../ExplorationSystem/GetItems.js";

const bunny = [
  "Bunny",
  6,
  [1, 1],
  function (player) {
    return getItems([carrot], [], player).text;
  },
];

export default bunny;
