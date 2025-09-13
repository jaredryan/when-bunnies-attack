const firstAidInfo = [
  "First Aid Kit",
  "Use this to recover 5 damage.",
  true,
  function (player, enemy) {
    recoverHP(player, 5);
  },
];

export default firstAidInfo
