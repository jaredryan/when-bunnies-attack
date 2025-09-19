import Area from "./Area";
import bunny from "../Entities/Enemies/Bunny";
import scientistBunny from "../Entities/Enemies/ScientistBunny";
import soldierBunny from "../Entities/Enemies/SoldierBunny";

import fight from "../BattleSystem/Fight";

import messages from "../Messages";
import events from "./EventsList";

/*********************************** Area List *****************************************/

/************************************* Area0 *******************************************/

export const swRoom0 = new Area("Southwest Room", [], 0, events.swRoom0, [
  (_player) => ({
    text: messages.swRoom0EntryMessage1,
    actions: [],
  }),
]);

/*********************************** End Area ******************************************/

/************************************* Area1 *******************************************/

export const wRoom1 = new Area("West Room", [0, 4], 1, events.wRoom1, [
  (_player, setText, setPrimaryActions) => ({
    text: messages.wRoom1EntryMessage1,
    actions: [
      {
        name: messages.wRoom1EntryAnswerResponsePairs[0].answer,
        execute: () => {
          setText(messages.wRoom1EntryAnswerResponsePairs[0].response)
          setPrimaryActions([])
        },
      },
      {
        name: messages.wRoom1EntryAnswerResponsePairs[1].answer,
        execute: () => {
          setText(messages.wRoom1EntryAnswerResponsePairs[1].response)
          setPrimaryActions([])
        },
      },
      {
        name: messages.wRoom1EntryAnswerResponsePairs[2].answer,
        execute: () => {
          setText(messages.wRoom1EntryAnswerResponsePairs[2].response)
          setPrimaryActions([])
        },
      },
    ],
  }),
  (_player) => ({
    text: messages.wRoom1EntryMessage2,
    actions: [
      /* fight(bunny, player, true) */
    ],
  }),
  (_player) => ({
    text: messages.wRoom1ExitMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area2 *******************************************/

export const lab2 = new Area("Laboratory", [1], 2, events.lab2, [
  (_player) => ({
    text: messages.lab2EntryMessage1,
    actions: [
      /* fight(scientistBunny, _, true) */
    ],
  }),
  (_player) => ({
    text: messages.lab2ExitMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area3 *******************************************/

export const seRoom3 = new Area("Southeast Room", [0, 4], 3, events.seRoom3, [
  (_player, setText, setPrimaryActions) => ({
    text: messages.seRoom3EntryMessage1,
    actions: [
      {
        name: messages.seRoom3EntryAnswerResponsePairs[0].answer,
        execute: () => {
          setText([])
          setPrimaryActions([])
        },
      },
      {
        name: messages.seRoom3EntryAnswerResponsePairs[1].answer,
        execute: () => {
          setText([])
          setPrimaryActions([])
        },
      },
    ],
  }),
  (_player) => ({
    text: messages.seRoom3EntryMessage2,
    actions: [
      /* fight(bunny, player, true) */
    ],
  }),
  (_player) => ({
    text: messages.seRoom3ExitMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area4 *******************************************/

export const eRoom4 = new Area("East Room", [1, 3, 6], 4, events.eRoom4, [
  (_player) => ({
    text: messages.eRoom4EntryMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area5 *******************************************/

export const treasury5 = new Area("Treasury", [4], 5, events.treasury5, [
  (_player) => ({
    text: messages.treasury5EntryMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area6 *******************************************/

export const neRoom6 = new Area("Northeast Room", [4, 7], 6, events.neRoom6, [
  (_player) => ({
    text: messages.neRoom6EntryMessage,
    actions: [
      /* fight(soldierBunny, player, true) */
    ],
  }),
  (_player) => ({
    text: messages.neRoom6ExitMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

export const escape7 = new Area("Forest", [6], 7, events.escape7, (player) => [
  (_player) => ({
    text: messages.escape7EntryMessage,
    actions: [],
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

export const forestExit8 = new Area("Forest Exit", [7], 8, events.forestExit8, [
  (_player) => ({
    text: messages.forestExit8EntryMessage,
    actions: [],
  }),
]);

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

// Pass in "areas" to the event that need it,
//    wRoom1 => checkDoor1, wRoom1[0]
//    escape7 => randomEncounterWalk
//    swRoom0 => checkRoom0, swRoom[2].nextEvent
//    neRoom6 => checkRoom6, neRoom6[0].nextEvent

areas[1].events[0] = areas[1].events[0](areas);
areas[7].events[0] = areas[7].events[0](areas);
areas[0].events[2].nextEvent = areas[0].events[2].nextEvent(areas);
areas[6].events[0].nextEvent = areas[6].events[0].nextEvent(areas);

/*********************************** Add Events ****************************************/

export default areas;
