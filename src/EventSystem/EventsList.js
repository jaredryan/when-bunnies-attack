/************************************* Area0 *******************************************/

export const checkCupboard0 = new Event(
  "Examine the cupboard",
  getWeapon,
  [player, knife, "You searched the cupboard and found a knife."],
  true,
  {},
);

export const checkDoor0 = new Event(
  "Examine the door",
  displayMessage,
  "You check the door and notice it is locked. It seems sturdy, but you notice a keyhole.",
  true,
  {},
);

export const checkRoom0 = new Event(
  "Examine the room",
  getItems,
  [
    player,
    [key],
    "As you examined the bed, you saw something shining and decided to examine it closer.",
  ],
  "switch",
  new Event(
    "Open the door",
    loseItemAndUnlockAreas,
    [player, key, "You used the key to open the door.", [0], [1, 3]],
    true,
    {},
  ),
);

/************************************ End Area *****************************************/

swRoom0.events.push(checkCupboard0, checkDoor0, checkRoom0);

/************************************* Area1 *******************************************/

export const checkRoom1 = new Event(
  "Examine the room",
  displayMessage,
  "You look around the room. You see a door and a hallway. There is a poster on the wall that looks like a...bunny army soluting a bunny dictator. Cute but disturbing.",
  true,
  {},
);

export const checkDoor1 = new Event(
  "Examine the door",
  unlockAreas,
  [
    "You check the door and see that it is unlocked. It looks like it leads to a laboratory of some sort.",
    [1],
    [2],
  ],
  true,
  {},
);

/************************************ End Area *****************************************/

wRoom1.events.push(checkDoor1, checkRoom1);

/************************************* Area2 *******************************************/

export const checkRoom2 = new Event(
  "Examine the room",
  displayMessage,
  "You look around the lab. You see what looks like a human body on the table. Are they performing a dissection on them?",
  "switch",
  new Event(
    "Inspect the dissection table",
    getWeapon,
    [
      player,
      surgicalKnife,
      "After inspection and being scarred for life, you decide to take the surgical knife with you.",
    ],
    true,
    {},
  ),
);

/************************************ End Area *****************************************/

lab2.events.push(checkRoom2);

/************************************* Area3 *******************************************/

export const checkRoom3 = new Event(
  "Examine the room",
  displayMessage,
  "You look around the room. It's empty. The hallway continues down into another room.",
  true,
  {},
);

/************************************ End Area *****************************************/

seRoom3.events.push(checkRoom3);

/************************************* Area4 *******************************************/

export const checkRoom4 = new Event(
  "Examine the door",
  displayMessage,
  "The door looks like it belongs to a treasury. You notice a keyhole.",
  true,
  {},
);

export const checkArmory4 = new Event(
  "Search the armory",
  getWeapon,
  [player, bunnySword, "You searched the armory and found a bunny sword."],
  true,
  {},
);

/************************************ End Area *****************************************/

eRoom4.events.push(checkRoom4, checkArmory4);

/************************************* Area5 *******************************************/

export const lootRoom5 = new Event(
  "Loot the treasury",
  getItems,
  [
    player,
    [carrot, carrot],
    "At first, you were very greedy. But then you realized you could only take two carrots with you.",
  ],
  true,
  {},
);

export const heal5 = new Event(
  "Eat as much as possible",
  heal,
  [player, "You ate like a champ and recovered all your health."],
  false,
  {},
);

/************************************ End Area *****************************************/

treasury5.events.push(lootRoom5, heal5);

/************************************* Area6 *******************************************/

export const checkRoom6 = new Event(
  "Examine the room",
  displayMessage,
  "You look around the room. It appears to be the main entrance to the building. You also see two dictator bunny posters. One of them looks a little funny...",
  "switch",
  new Event(
    "Inspect the poster",
    unlockAreas,
    ["Upon closer inspection, you find the key to the treasury.", [4], [5]],
    true,
    {},
  ),
);

/************************************ End Area *****************************************/

neRoom6.events.push(checkRoom6);

/************************************* Area5 *******************************************/

export const checkRoom7 = new Event(
  "Proceed through the forest",
  randomEncounterWalk,
  [player, areas],
  true,
  {},
);

/************************************ End Area *****************************************/

escape7.events.push(checkRoom7);

/************************************* Area5 *******************************************/

export const checkRoom8 = new Event(
  "Examine the area",
  displayMessage,
  "You look around. You see a militaristic bunny and a large machine...a tank, maybe? Yikes. If you want to escape, you'll have to fight it.",
  true,
  {},
);

export const finalBattle8 = new Event(
  "Fight!!!",
  finalEncounter,
  [finalBoss, player],
  true,
  {},
);

/************************************ End Area *****************************************/

forestExit8.events.push(checkRoom8, finalBattle8);

/*********************************** END EVENTS ****************************************/
