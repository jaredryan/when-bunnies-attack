const throwingKnife = [
  "Throwing Knife",
  "Hurt an enemy 3 damage.",
  false,
  true,
  function (_player, enemy) {
    enemy.takeDamage(3);
    
    return [
      `You attack! The throwing knife dealt 3 damage.`
    ]
  },
];

export default throwingKnife;
