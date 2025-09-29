const throwingKnife = [
  "Throwing Knife",
  "Hurt an enemy 4 damage.",
  false,
  true,
  function (_player, enemy) {
    enemy.takeDamage(4);
    
    return [
      `You attack! The throwing knife dealt 4 damage.`
    ]
  },
];

export default throwingKnife;
