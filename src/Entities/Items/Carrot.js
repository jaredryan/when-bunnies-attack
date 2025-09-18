

const carrot = [
  "Carrot",
  "Eat this to recover 3 damage.",
  true,
  function (player, _enemy) {
    player.heal(3);
  },
];

export default carrot
