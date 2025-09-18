import Item from "../Item.js";
import throwingKnife from "../Items/ThrowingKnife.js";

const soldierBunny = [
  "Soldier Bunny",
  8,
  [1, 1],
  function (player) {
    player.addItem(
      new Item(...throwingKnife[0]),
    );
  },
];

export default soldierBunny
