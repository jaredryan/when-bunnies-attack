const throwingKnife = [
  "Throwing Knife",
  "Use this to hurt the enemy 3 damage.",
  false,
  function (player, enemy) {
    enemy.hp -= 3;
  },
];

export default throwingKnife
