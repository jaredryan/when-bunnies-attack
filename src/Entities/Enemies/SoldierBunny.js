import throwingKnife from "../Items/ThrowingKnife";
import firstAidKit from "../Items/FirstAidKit";
import getItems from "../../ExplorationSystem/GetItems";

const soldierBunny = [
  "Soldier Bunny",
  8,
  [1, 2],
  function (player) {
    return getItems([firstAidKit, throwingKnife], [], player).text;
  },
];

export default soldierBunny;
