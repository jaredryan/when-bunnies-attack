// Allows the player to obtain a new weapon
const getWeapon = (playerWeaponMessage) => {
  console.log(playerWeaponMessage[2]);
  playerWeaponMessage[0].equipWeapon(playerWeaponMessage[1]);
  return true;
}

export default getWeapon
