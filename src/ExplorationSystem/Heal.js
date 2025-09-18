// Completely heal player
const heal = (message, player) => {
  player.heal(player.maxHP);
  return message
};

export default heal;
