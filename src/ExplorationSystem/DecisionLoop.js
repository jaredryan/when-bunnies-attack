import messages from "../Messages";

const decisionLoop = ({
  player,
  area,
  areas,
  setText,
  setPrimaryActions,
  setEncounter,
  setIsChoosingNextArea,
  setPageContainerClassName,
}) => {
  // Let the story control text and actions until it's done
  let { text, actions, encounter } = area.runStory({
    player,
    setText,
    setPrimaryActions,
    setEncounter,
  });

  if ((!text || !text.length) && (!actions || !actions.length) && !encounter) {
    // After scripted story is done, allow exploration to trigger events
    text = messages.freeExplorationPrompt;
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
            text = [],
            actions = [],
            encounter = null,
          } = area.runEvent(player, eventIndex, setPageContainerClassName);
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
        name: messages.leaveAreaButton,
        execute: () => {
          setText(messages.leaveRoomPrompt);
          setPrimaryActions([])
          setIsChoosingNextArea(true);
        },
      };

      actions.push(leaveAreaAction);
    }
  }

  setText(text);
  setPrimaryActions(actions);
  setEncounter(encounter);
};

export default decisionLoop;
