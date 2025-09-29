import { freeExplorationPrompt } from "../Messages";

const decisionLoop = ({
  player,
  area,
  areas,
  setNextArea,
  setText,
  setPrimaryActions,
  setEncounter,
}) => {
  // Let the story control text and actions until it's done
  let { text, actions, encounter } = area.runStory({
    player,
    setText,
    setPrimaryActions,
    setEncounter,
  });

  if (!text && (!actions || !actions.length) && !encounter) {
    // After scripted story is done, allow exploration to trigger events
    console.log("Free exploration in area, generating events.");

    text = freeExplorationPrompt;
    actions = [];

    for (let eventIndex = 0; eventIndex < area.events.length; eventIndex++) {
      const event = area.events[eventIndex];
      actions.push({
        name: event.name,
        execute: () => {
          // Events change game state and display information based on the change
          // They don't create new actions directly...instead, they change the
          // list of events in the area. So, setText to display new message,
          // and empty out Actions so they can't take action until the event is over
          const {
            text = "",
            actions = [],
            encounter = null,
          } = area.runEvent(player, eventIndex);
          setText(text);
          setPrimaryActions(actions);
          setEncounter(encounter);
        },
      });
    }

    // Generate the "Leave the Area" Primary Action
    const newAreas = [];
    let areaIndex;
    for (var i = 0; i < area.connectedAreas.length; i++) {
      areaIndex = area.connectedAreas[i];
      newAreas.push(areas[areaIndex]);
    }

    if (newAreas.length) {
      const leaveAreaAction = {
        name: "Leave the Area",
        execute: () => {
          setText([`Where do you want to go?`]);
          setPrimaryActions([
            ...newAreas.map((availableArea) => ({
              name: availableArea.name,
              execute: () => setNextArea(availableArea),
            })),
            {
              name: "Stay",
              execute: () => {
                setText([`You decided to stay in the area.`]);
                setPrimaryActions([]);
              },
            },
          ]);
        },
      };

      actions.push(leaveAreaAction);
    }
  } else {
    console.log("Running area story, no exploration yet.");
  }

  console.log("Decision Loop", { text, actions });

  setText(text);
  setPrimaryActions(actions);
  setEncounter(encounter);
};

export default decisionLoop;
