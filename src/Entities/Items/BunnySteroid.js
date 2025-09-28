const bunnySteroid = [
  "Bunny Steroid",
  "This costs you 2 health points, but allows you to damage an enemy with an additional 4 points to your normal attack.",
  false,
  true,
  function (player, enemy) {
    player.takeDamage(2);
    const dealtDamageMessage = player.attack(enemy);
    enemy.takeDamage(4);

    const damageDealt = Number.parseInt(dealtDamageMessage.split(' ').at(-2), 10) + 4
    
    return [
      `You attack! Enpowered by drugs, you dealt ${damageDealt} damage.`
      `Exhausted from the attack, you feel your resilience drop. You take 2 damage.`
    ]
  },
];

export default bunnySteroid;
