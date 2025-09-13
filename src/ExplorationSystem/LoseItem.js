// Lose an item
function loseItem(playerItemMessage) {
  console.log(playerItemMessage[2]);
  var item = playerItemMessage[1];
  playerItemMessage[0].removeItem(item);
  return true;
}
