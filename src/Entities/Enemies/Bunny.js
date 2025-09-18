import Item from "../Item.js";
import FirstAid from "../Items/FirstAid.js";

const bunny = [
  "Bunny",
  5,
  [1, 1],
  function (player) {
    player.addItem(new Item(...FirstAid));
  },
];

export default bunny;
