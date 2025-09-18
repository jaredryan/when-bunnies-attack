import Enemy from '../Entities/Enemy';
import fleeAttempt from './FleeAttempt';
import { selectItem } from './Inventory/BattleInventory';
import { printStatus } from '../Utilities';

// Returns true if the player is still alive, false if he or she died.
const fight = (enemyInfo, player, isForced = false) => {
  const enemy = new Enemy(enemyInfo[0], enemyInfo[1], enemyInfo[2], enemyInfo[3]);

  console.log(`You encountered a ${enemy.name}!`);
  while (true) {
    // Player's turn
    const text = "Your turn:"

    const actions = [
      { name: "Fight",
        execute: () => player.attack(enemy)
      },
      {
        name: "Use Item",
        execute: () => {
          if (!selectItem(player, enemy)) {
            return false; // Player cancelled, continue the turn
          } else {
            return true; // Item was used, end turn
          }
        }
      },
      { 
        name: "Run",
        execute: () => fleeAttempt()
      },
      {
        name: "Check Status",
        execute: () => printStatus(player)
      },
    ];

    if (isForced) {
      actions.splice(2, 1); // Remove "Run" option
    }

    // Enemy's turn
    if (enemy.hasDied) {
      enemy.reward(player);
      return true;
    } else {
      enemy.attack(player);
      if (player.hp <= 0) {
        return false;
      }
    }
  }
}

export default fight
