import messages from "../../Messages";
import carrot from "../Items/Carrot";

const finalBoss = [
  "Captain Whiskers",
  14,
  [2, 3],
  function (player) {
    player.hasWon = true;
    return messages.wonGameMessage(player.inventory.some(item => item.name === carrot[0]));
  },
];

export default finalBoss;
