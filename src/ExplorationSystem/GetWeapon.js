// Allows the player to obtain a new weapon
const getWeapon = (weapon, message, player) => {
  player.equipWeapon(weapon);
  return [
    ...message,
    player.equipWeapon(weapon),
  ]
};

export default getWeapon;
