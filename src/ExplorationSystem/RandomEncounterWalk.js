import Enemy from "../Entities/Enemy";
import bunny from "../Entities/Enemies/Bunny";
import scientistBunny from "../Entities/Enemies/ScientistBunny";
import soldierBunny from "../Entities/Enemies/SoldierBunny";

// The Final Escape Special Event
const randomEncounterWalk = (areas, _player) => {
  const forestPathArea = areas[7];
  const forestExit = areas[8];

  const generateNewStoryEvents = () => {
    const newStoryEvents = []

    // Loop for ~4 encounters
    let distanceWalked = 0;
    while (distanceWalked < 3) {
      if (Math.random() < 0.34) {
        newStoryEvents.push(() => ({
          text: [],
          actions: [],
          encounter: {
            enemy: new Enemy(...getRandomEnemyInfo()),
            noRetreat: false,
          },
        }));
      }
      distanceWalked += 0.25;

      const text = [`You have walked ${distanceWalked} / 3 kilometers.`]
      newStoryEvents.push(() => ({
        text,
        actions: [],
        encounter: null,
      }));
    }

    newStoryEvents.push(() => {
      // Add forest clearing to map / traversable rooms
      forestPathArea.connectedAreas.push(8);

      return ({
        text: [
          `You made it all the way through, and the path seems clear.`,
          `If you wish to continue or go back, no enemies will attack you.`,
          `The ${forestExit.name} is now available.`,
        ],
        actions: [],
        encounter: null,
      })
    })

    return newStoryEvents
  };

  forestPathArea.story = generateNewStoryEvents();

  return {
    text: [
      `As you walk towards the path, you see a sign saying it is about 3 kilometers to the exit.`,
      `You look down the path and don't see any enemies.`,
      `You can only hope that your luck holds.`,
      `Noticing how thick the vegetation is, you make a mental note that if you do encounter any enemies, you might be able to flee by darting off into the woods.`,
      `Just don't go too far off, come back onto the path after you lose them, and then you shouldn't lose your way.`,
      `"All right, then."`,
      `You start walking.`,
    ],
    actions: [],
    encounter: null,
  };
};

/* Picks a random enemy from the current possibilities and returns a newly constructed
   version of that enemy. */

const possibleEnemies = [bunny, scientistBunny, soldierBunny];

const getRandomEnemyInfo = () => {
  return possibleEnemies[Math.floor(Math.random() * possibleEnemies.length)];
};

export default randomEncounterWalk;
