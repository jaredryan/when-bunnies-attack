import messages from "../../Messages";

const finalBoss = [
  "Captain Whiskers",
  14,
  [2, 3],
  function (player) {
    player.hasWon = true;
    return messages.wonGameMessage;
  },
];

export default finalBoss;
