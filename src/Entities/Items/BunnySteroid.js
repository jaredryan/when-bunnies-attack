const bunnySteroid = [
  "Bunny Steroid",
  "This costs you 2 health points, but allows you to damage an enemy with an additional 4 points to your normal attack.",
  false,
  function (player, enemy) {
    player.takeDamage(2);
    player.attack(enemy);
    enemy.takeDamage(4);
  },
];

export default bunnySteroid;
