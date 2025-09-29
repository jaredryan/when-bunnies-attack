const firstAidInfo = [
  "First Aid Kit",
  "Recover 5 damage.",
  true,
  true,
  function (player, _enemy) {
    return player.heal(5);
  },
];

export default firstAidInfo;
