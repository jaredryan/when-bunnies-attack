import Event from "./Event";

import displayMessage from "../ExplorationSystem/DisplayMessage";
import loseItemAndUnlockAreas from "../ExplorationSystem/LoseItemAndUnlockAreas";
import unlockAreas from "../ExplorationSystem/UnlockAreas";
import heal from "../ExplorationSystem/Heal";
import randomEncounterWalk from "../ExplorationSystem/RandomEncounterWalk";
import finalEncounter from "../ExplorationSystem/FinalEncounter";
import getWeapon from "../ExplorationSystem/GetWeapon";
import getItems from "../ExplorationSystem/GetItems";

import knife from "../Entities/Weapons/Knife";
import surgicalKnife from "../Entities/Weapons/SurgicalKnife";
import bunnySword from "../Entities/Weapons/BunnySword";

import carrot from "../Entities/Items/Carrot";
import key from "../Entities/Items/Key";

/************************************* Area0 *******************************************/

export const checkCupboard0 = new Event(
  `Examine the cupboard`,
  getWeapon,
  [knife, [`You searched the cupboard and found a knife.`]],
  true,
  {},
);

export const checkDoor0 = new Event(
  `Examine the door`,
  displayMessage,
  [
    [
      `You check the door and notice it is locked. It seems sturdy, but you notice a keyhole.`,
    ],
  ],
  true,
  {},
);

export const checkRoom0 = new Event(
  `Examine the room`,
  getItems,
  [
    [key],
    [
      `As you examined the bed, you saw something shining and decided to examine it closer.`,
    ],
  ],
  "switch",
  (areas) =>
    new Event(
      "Open the door",
      loseItemAndUnlockAreas,
      [key, [`You used the key to open the door.`], [0], [1, 3], areas],
      true,
      {},
    ),
);

/************************************ End Area *****************************************/

export const swRoom0 = [checkCupboard0, checkDoor0, checkRoom0];

/************************************* Area1 *******************************************/

export const checkRoom1 = new Event(
  `Examine the room`,
  displayMessage,
  [
    [
      `You look around the room. You see a door and a hallway. There is a poster on the wall that looks like a...bunny army saluting a bunny dictator. Cute but disturbing.`,
    ],
  ],
  true,
  {},
);

export const checkDoor1 = (areas) =>
  new Event(
    `Examine the door`,
    unlockAreas,
    [
      [1],
      [2],
      areas,
      [
        `You check the door and see that it is unlocked. It looks like it leads to a laboratory of some sort.`,
      ],
    ],
    true,
    {},
  );

/************************************ End Area *****************************************/

export const wRoom1 = [checkDoor1, checkRoom1];

/************************************* Area2 *******************************************/

export const checkRoom2 = new Event(
  `Examine the room`,
  displayMessage,
  [
    [
      `You look around the lab. You see what looks like a human body on the table. Are they performing a dissection on them?`,
    ],
  ],
  "switch",
  new Event(
    `Inspect the dissection table`,
    getWeapon,
    [
      surgicalKnife,
      [
        `After inspection and being scarred for life, you decide to take the surgical knife with you.`,
      ],
    ],
    true,
    {},
  ),
);

/************************************ End Area *****************************************/

export const lab2 = [checkRoom2];

/************************************* Area3 *******************************************/

export const checkRoom3 = new Event(
  `Examine the room`,
  displayMessage,
  [
    [
      `You look around the room. It's empty. The hallway continues down into another room.`,
    ],
  ],
  true,
  {},
);

/************************************ End Area *****************************************/

export const seRoom3 = [checkRoom3];

/************************************* Area4 *******************************************/

export const checkRoom4 = new Event(
  `Examine the door`,
  displayMessage,
  [[`The door looks like it belongs to a treasury. You notice a keyhole.`]],
  true,
  {},
);

export const checkArmory4 = new Event(
  `Search the armory`,
  getWeapon,
  [
    bunnySword,
    [
      `You searched the armory and found a bunny sword. It's small, but dangerous.`,
    ],
  ],
  true,
  {},
);

/************************************ End Area *****************************************/

export const eRoom4 = [checkRoom4, checkArmory4];

/************************************* Area5 *******************************************/

export const lootRoom5 = new Event(
  `Loot the treasury`,
  getItems,
  [
    [carrot, carrot],
    [
      `At first, you were very greedy. But then you realized you could only take two carrots with you.`,
    ],
  ],
  true,
  {},
);

export const heal5 = new Event(
  `Eat as much as possible`,
  heal,
  [[`You ate like a champ and recovered all your health.`]],
  false,
  {},
);

/************************************ End Area *****************************************/

export const treasury5 = [lootRoom5, heal5];

/************************************* Area6 *******************************************/

export const checkRoom6 = new Event(
  `Examine the room`,
  displayMessage,
  [
    [
      `You look around the room. It appears to be the main entrance to the building. You also see two dictator bunny posters. One of them looks a little funny...`,
    ],
  ],
  "switch",
  (areas) =>
    new Event(
      `Inspect the poster`,
      unlockAreas,
      [
        [4],
        [5],
        areas,
        [`Upon closer inspection, you find the key to the treasury.`],
      ],
      true,
      {},
    ),
);

/************************************ End Area *****************************************/

export const neRoom6 = [checkRoom6];

/************************************* Area5 *******************************************/

export const checkRoom7 = (areas) =>
  new Event(
    `Proceed through the forest`,
    randomEncounterWalk,
    [areas],
    true,
    {},
  );

/************************************ End Area *****************************************/

export const escape7 = [checkRoom7];

/************************************* Area5 *******************************************/

export const checkRoom8 = new Event(
  `Examine the area`,
  displayMessage,
  [
    [
      `You look around. You see a militaristic bunny and a large machine...a tank, maybe? Yikes. If you want to escape, you'll have to fight it.`,
    ],
  ],
  true,
  {},
);

export const finalBattle8 = new Event(`Fight!!!`, finalEncounter, [], true, {});

/************************************ End Area *****************************************/

export const forestExit8 = [checkRoom8, finalBattle8];

/********************************* Export EVENTS ***************************************/

const eventsByArea = {
  swRoom0,
  wRoom1,
  lab2,
  seRoom3,
  eRoom4,
  treasury5,
  neRoom6,
  escape7,
  forestExit8,
};

export default eventsByArea;
