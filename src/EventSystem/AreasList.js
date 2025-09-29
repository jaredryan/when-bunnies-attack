import Area from "./Area";
import Enemy from "../Entities/Enemy";
import bunny from "../Entities/Enemies/Bunny";
import scientistBunny from "../Entities/Enemies/ScientistBunny";
import soldierBunny from "../Entities/Enemies/SoldierBunny";


import messages from "../Messages";
import events from "./EventsList";

/*********************************** Area List *****************************************/

/************************************* Area0 *******************************************/

export const swRoom0 = new Area("Southwest Room", 'SW', [], 0, events.swRoom0, [
  () => ({
    text: messages.swRoom0EntryMessage1,
    actions: [],
    encounter: null,
  }),
]);

/*********************************** End Area ******************************************/

/************************************* Area1 *******************************************/

export const wRoom1 = new Area("West Room", 'W', [0, 4], 1, events.wRoom1, [
  ({ setText, setPrimaryActions }) => ({
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
    encounter: null,
  }),
  () => ({
    text: messages.wRoom1EntryMessage2,
    actions: [],
    encounter: null,
  }),
  () => ({
    text: [],
    actions: [],
    encounter: {
      enemy: new Enemy(...bunny),
      noRetreat: true
    },
  }),
  () => ({
    text: messages.wRoom1ExitMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area2 *******************************************/

export const lab2 = new Area("Laboratory", 'Lab', [1], 2, events.lab2, [
  () => ({
    text: messages.lab2EntryMessage1,
    actions: [],
    encounter: null,
  }),
  () => ({
    text: [],
    actions: [],
    encounter: {
      enemy: new Enemy(...scientistBunny),
      noRetreat: true
    },
  }),
  () => ({
    text: messages.lab2ExitMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area3 *******************************************/

export const seRoom3 = new Area("Southeast Room", 'SE', [0, 4], 3, events.seRoom3, [
  ({ setText, setPrimaryActions }) => ({
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
    encounter: null,
  }),
  () => ({
    text: messages.seRoom3EntryMessage2,
    actions: [],
    encounter: null,
  }),
  () => ({
    text: [],
    actions: [],
    encounter: {
      enemy: new Enemy(...bunny),
      noRetreat: true
    },
  }),
  () => ({
    text: messages.seRoom3ExitMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area4 *******************************************/

export const eRoom4 = new Area("East Room", 'E', [1, 3, 6], 4, events.eRoom4, [
  () => ({
    text: messages.eRoom4EntryMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area5 *******************************************/

export const treasury5 = new Area("Treasury", 'TR', [4], 5, events.treasury5, [
  () => ({
    text: messages.treasury5EntryMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area6 *******************************************/

export const neRoom6 = new Area("Northeast Room", 'NE', [4, 7], 6, events.neRoom6, [
  () => ({
    text: messages.neRoom6EntryMessage,
    actions: [],
    encounter: null,
  }),
  () => ({
    text: [],
    actions: [],
    encounter: {
      enemy: new Enemy(...soldierBunny),
      noRetreat: true
    },
  }),
  () => ({
    text: messages.neRoom6ExitMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

export const escape7 = new Area("Forest", 'Path', [6], 7, events.escape7, (player) => [
  () => ({
    text: messages.escape7EntryMessage,
    actions: [],
    encounter: null,
  }),
]);

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

export const forestExit8 = new Area("Forest Exit", 'Exit', [7], 8, events.forestExit8, [
  () => ({
    text: messages.forestExit8EntryMessage,
    actions: [],
    encounter: null,
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
