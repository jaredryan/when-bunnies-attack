import Enemy from "../Entities/Enemy";
import bunny from "../Entities/Enemies/Bunny";
import scientistBunny from "../Entities/Enemies/ScientistBunny";
import soldierBunny from "../Entities/Enemies/SoldierBunny";

import messages from '../Messages'

// The Final Escape Special Event
const randomEncounterWalk = (areas, _player, setPageContainerClassName) => {
  setPageContainerClassName("Walk")
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

      const text = messages.escape7DistanceWalked(distanceWalked)
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
        text: messages.escape7EndRandomEncounterWalk(forestExit.name),
        actions: [],
        encounter: null,
      })
    })

    return newStoryEvents
  };

  forestPathArea.story = generateNewStoryEvents();

  return {
    text: messages.escape7StartRandomEncounterWalk,
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
