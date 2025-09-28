// Completely heal player
const heal = (message, player) => {
  player.heal(player.maxHp);
  return message
};

export default heal;
