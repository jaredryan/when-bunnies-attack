// Completely heal player
const heal = (playerMessage) => {
  console.log(playerMessage[1]);
  playerMessage[0].hp = playerMessage[0].maxHP;
  return true;
}

export default heal
