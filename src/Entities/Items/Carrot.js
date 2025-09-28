const carrot = [
  "Carrot",
  "Eat this to recover 3 damage.",
  true,
  true,
  function (player, _enemy) {
    let damageHealed = 3
    let damageTaken = player.maxHp - player.hp
    if (damageTaken < 3) {
      damageHealed = damageTaken
    }
    
    player.heal(3);
    return [`You recovered ${damageHealed} health`]
  },
];

export default carrot;
