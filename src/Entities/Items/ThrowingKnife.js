const throwingKnife = [
  "Throwing Knife",
  "Use this to hurt an enemy 3 damage.",
  false,
  true,
  function (player, enemy) {
    enemy.takeDamage(3);
    
    return [
      `You attack! The throwing knife dealt 3 damage.`
    ]
  },
];

export default throwingKnife;
