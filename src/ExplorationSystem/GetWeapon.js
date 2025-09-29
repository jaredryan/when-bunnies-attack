// Allows the player to obtain a new weapon
const getWeapon = (weapon, message, player) => {
  return { text: [...message, player.equipWeapon(weapon)] };
};

export default getWeapon;
