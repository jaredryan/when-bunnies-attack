const firstAidInfo = [
  "First Aid Kit",
  "Use this to recover 5 damage.",
  true,
  true,
  function (player, _enemy) {
    let damageHealed = 5
    let damageTaken = player.maxHp - player.hp
    if (damageTaken < 5) {
      damageHealed = damageTaken
    }
    
    player.heal(5);
    return [`You recovered ${damageHealed} health`]
  },
];

export default firstAidInfo;
