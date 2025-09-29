const carrot = [
  "Carrot",
  "Eat this to recover 3 damage.",
  true,
  true,
  function (player, _enemy) {
    return player.heal(3);
  },
];

export default carrot;
