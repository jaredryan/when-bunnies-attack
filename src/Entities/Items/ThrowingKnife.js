const throwingKnife = [
  "Throwing Knife",
  "Use this to hurt the enemy 3 damage.",
  false,
  function (_player, enemy) {
    enemy.takeDamage(3);
  },
];

export default throwingKnife;
