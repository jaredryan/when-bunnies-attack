import Item from "../Item.js";
import bunnySteroid from "../Items/BunnySteroid.js";

const scientistBunny = [
  "Scientist Bunny",
  3,
  [2, 2],
  function (player) {
    player.addItem(new Item(...bunnySteroid));
  },
];

export default scientistBunny;
