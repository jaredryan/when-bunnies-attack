import throwingKnife from "../Items/ThrowingKnife.js";
import getItems from "../../ExplorationSystem/GetItems.js";

const soldierBunny = [
  "Soldier Bunny",
  8,
  [1, 1],
  function (player) {
    return getItems([throwingKnife], [], player);
  },
];

export default soldierBunny;
