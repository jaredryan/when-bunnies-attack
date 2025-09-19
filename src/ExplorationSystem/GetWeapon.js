// Allows the player to obtain a new weapon
const getWeapon = (weapon, message, player) => {
  return [
    ...message,
    player.equipWeapon(weapon),
  ]
};

export default getWeapon;
