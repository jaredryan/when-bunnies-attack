// Completely heal player
function heal(playerMessage) {
  console.log(playerMessage[1]);
  playerMessage[0].hp = playerMessage[0].maxHP;
  return true;
}
