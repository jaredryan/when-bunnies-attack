const firstAidInfo = [
  "First Aid Kit",
  "Use this to recover 5 damage.",
  true,
  true,
  function (player, _enemy) {
    return player.heal(5);
  },
];

export default firstAidInfo;
