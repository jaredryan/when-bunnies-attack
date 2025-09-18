import Area from "./Area";
import bunny from "../Entities/Enemies/Bunny";
import scientistBunny from "../Entities/Enemies/ScientistBunny";
import soldierBunny from "../Entities/Enemies/SoldierBunny";

import fight from "../BattleSystem/Fight";

import messages from "../Messages";
import events from "./EventsList";

/*********************************** Area List *****************************************/

/************************************* Area0 *******************************************/

export const swRoom0 = new Area("SW Room", [], 0, events.swRoom0, (player) => [
  {
    text: messages.swRoom0EntryMessage1,
    actions: [],
  },
]);

/*********************************** End Area ******************************************/

/************************************* Area1 *******************************************/

export const wRoom1 = new Area("W Room", [0, 4], 1, events.wRoom1, (player) => [
  {
    text: messages.wRoom1EntryMessage1,
    actions: [
      {
        name: messages.wRoom1EntryAnswerResponsePairs[0].answer,
        execute: () => ({
          text: messages.wRoom1EntryAnswerResponsePairs[0].response,
          actions: [],
        }),
      },
      {
        name: messages.wRoom1EntryAnswerResponsePairs[1].answer,
        execute: () => ({
          text: messages.wRoom1EntryAnswerResponsePairs[1].response,
          actions: [],
        }),
      },
      {
        name: messages.wRoom1EntryAnswerResponsePairs[2].answer,
        execute: () => ({
          text: messages.wRoom1EntryAnswerResponsePairs[2].response,
          actions: [],
        }),
      },
    ],
  },
  {
    text: messages.wRoom1EntryMessage2,
    actions: [fight(bunny, player, true)],
  },
  {
    text: messages.wRoom1ExitMessage,
    actions: [],
  },
]);

/************************************ End Area *****************************************/

/************************************* Area2 *******************************************/

export const lab2 = new Area("Lab", [1], 2, events.lab2, (player) => [
  {
    text: messages.lab2EntryMessage1,
    actions: [fight(scientistBunny, player, true)],
  },
  {
    text: messages.lab2ExitMessage,
    actions: [],
  },
]);

/************************************ End Area *****************************************/

/************************************* Area3 *******************************************/

export const seRoom3 = new Area(
  "SE Room",
  [0, 4],
  3,
  events.seRoom3,
  (player) => [
    {
      text: messages.seRoom3EntryMessage1(player),
      actions: [
        {
          name: messages.seRoom3EntryAnswerResponsePairs[0].answer,
          execute: () => ({
            text: [],
            actions: [],
          }),
        },
        {
          name: messages.seRoom3EntryAnswerResponsePairs[1].answer,
          execute: () => ({
            text: [],
            actions: [],
          }),
        },
      ],
    },
    {
      text: messages.seRoom3EntryMessage2,
      actions: [fight(bunny, player, true)],
    },
    {
      text: messages.seRoom3ExitMessage,
      actions: [],
    },
  ],
);

/************************************ End Area *****************************************/

/************************************* Area4 *******************************************/

export const eRoom4 = new Area(
  "E Room",
  [1, 3, 6],
  4,
  events.eRoom4,
  (player) => [
    {
      text: messages.eRoom4EntryMessage,
      actions: [],
    },
  ],
);

/************************************ End Area *****************************************/

/************************************* Area5 *******************************************/

export const treasury5 = new Area(
  "Treasury",
  [4],
  5,
  events.treasury5,
  (player) => [
    {
      text: messages.treasury5EntryMessage,
      actions: [],
    },
  ],
);

/************************************ End Area *****************************************/

/************************************* Area6 *******************************************/

export const neRoom6 = new Area(
  "NE Room",
  [4, 7],
  6,
  events.neRoom6,
  (player) => [
    {
      text: messages.neRoom6EntryMessage,
      actions: [fight(soldierBunny, player, true)],
    },
    {
      text: messages.neRoom6ExitMessage,
      actions: [],
    },
  ],
);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

export const escape7 = new Area("Forest", [6], 7, [], (player) => [
  {
    text: messages.escape7EntryMessage,
    actions: [],
  },
]);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

export const forestExit8 = new Area(
  "Forest Exit",
  [7],
  8,
  events.forestExit8,
  (player) => [
    {
      text: messages.forestExit8EntryMessage,
      actions: [],
    },
  ],
);

/************************************ End Area *****************************************/

/*********************************** End Areas *****************************************/

/*********************************** Area Array ****************************************/

const areas = [
  swRoom0,
  wRoom1,
  lab2,
  seRoom3,
  eRoom4,
  treasury5,
  neRoom6,
  escape7,
  forestExit8,
];

// Pass in areas to the event that need it,
//    escape7 => randomEncounterWalk
//    swRoom0 => checkRoom0, swRoom[2]

areas[7].events.unshift(...events.escape7(areas));
areas[0].events[2].nextEvent = areas[0].events[2].nextEvent(areas);

/*********************************** Add Events ****************************************/

export default areas;
