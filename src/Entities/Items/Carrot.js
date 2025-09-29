const carrot = [
  "Carrot",
  "Recover 3 damage.",
  true,
  true,
  function (player, _enemy) {
    return player.heal(3);
  },
];

export default carrot;
