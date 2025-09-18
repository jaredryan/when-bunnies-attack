// Completely heal player
const heal = (message, player) => {
  console.log(message[0]);
  player.heal(player.maxHP);
  return true;
};

export default heal;
