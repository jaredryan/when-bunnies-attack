const firstAidInfo = [
  "First Aid Kit",
  "Use this to recover 5 damage.",
  true,
  function (player, _enemy) {
    player.heal(5);
  },
];

export default firstAidInfo;
