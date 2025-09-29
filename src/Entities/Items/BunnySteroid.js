const bunnySteroid = [
  "Bunny Steroid",
  "Take 2 damage, but deal 4 more on your next turn.",
  false,
  true,
  function (player, enemy) {
    player.takeDamage(2);
    const dealtDamageMessage = player.attack(enemy);
    enemy.takeDamage(4);

    const damageDealt =
      Number.parseInt(dealtDamageMessage.split(" ").at(-2), 10) + 4;

    return [
      `You attack! Enpowered by drugs, you dealt ${damageDealt} damage.``Exhausted from the attack, you feel your resilience drop. You take 2 damage.`,
    ];
  },
];

export default bunnySteroid;
