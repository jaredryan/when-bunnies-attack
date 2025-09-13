// Returns true if the player is still alive, false if he or she died.
function fight(enemyInfo, player) {
  enemy = new Enemy(enemyInfo[0], enemyInfo[1], enemyInfo[2], enemyInfo[3]);
  console.log("You encountered a " + enemy.name + "!");
  while (true) {
    // Player's turn
    var fightChoice = readlineSync.keyInSelect(fightOptions, "Your turn: ");
    switch (fightChoice) {
      case 0: // attack
        player.attack(enemy);
        break;
      case 1: // run
        if (fleeAttempt()) {
          return true;
        }
        break;
      case 2: // use item
        if (!selectAndUseItem(player, enemy)) {
          continue;
        } else {
          break;
        }
      case 3:
        printStatus(player);
        continue;
      default:
        if (cancelExecution()) {
          return false;
        }
        continue;
    }

    // Enemy's turn
    if (enemy.hp > 0) {
      enemy.attack(player);
      if (player.hp <= 0) {
        return false;
      }
    } else {
      enemy.reward(player);
      return true;
    }
  }
}
