import fight from "../BattleSystem/Fight";
import bunny from "../Entities/Enemies/Bunny";
import scientistBunny from "../Entities/Enemies/ScientistBunny";
import soldierBunny from "../Entities/Enemies/SoldierBunny";

// The Final Escape Special Event
const randomEncounterWalk = (areas, player) => {
  const entryMessage = [
    `You see a sign saying it is about 3 kilometers to the exit.`,
    `You start pushing forward.`,
  ];

  // Loop for ~4 encounters
  var distanceWalked = 0;
  while (distanceWalked < 3) {
    if (!walk(player)) {
      // You died!
      return false;
    }
    distanceWalked += 0.25;

    const progressMessage = `You have walked ${distanceWalked} kilometers.`;
  }

  // Story
  const exitMessage = [
    `You made it all the way through, and the path seems clear.`,
    `If you wish to continue or go back, no enemies will attack you.`,
    `The ${areas[8].name} is now available.`,
  ];

  // Add new area
  areas[1][7].connectedAreas.push(8);
  return false;
}

/* Picks a random enemy from the current possibilities and returns a newly constructed
   version of that enemy. */

const possibleEnemies = [bunny, scientistBunny, soldierBunny];

const returnRandomIndex = () => {
  return possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
}

// Returns true if the player makes it to the destination, false if he or she died
export const walk = (player) => {
  if (Math.random() < 0.34) {
    return fight(returnRandomIndex(), player);
  }
  return true;
}

export default randomEncounterWalk
