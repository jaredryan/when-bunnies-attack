import throwingKnife from "../Items/ThrowingKnife.js";
import firstAidKit from "../Items/firstAidKit.js";
import getItems from "../../ExplorationSystem/GetItems.js";

const soldierBunny = [
  "Soldier Bunny",
  8,
  [1, 3],
  function (player) {
    return getItems([firstAidKit, throwingKnife], [], player);
  },
];

export default soldierBunny;
