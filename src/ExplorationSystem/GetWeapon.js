// Allows the player to obtain a new weapon
const getWeapon = (weaponMessage, player) => {
  console.log(weaponMessage[1]);
  player.equipWeapon(weaponMessage[0]);
  return true;
}

export default getWeapon
