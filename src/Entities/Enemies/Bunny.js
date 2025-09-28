import firstAid from "../Items/FirstAid.js";
import getItems from "../../ExplorationSystem/GetItems.js";

const bunny = [
  "Bunny",
  5,
  [1, 1],
  function (player) {
    return getItems([firstAid], [], player);
  },
];

export default bunny;
