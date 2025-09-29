// Completely heal player
const heal = (message, player) => {
  player.heal(player.maxHp);
  return { text: message };
};

export default heal;
