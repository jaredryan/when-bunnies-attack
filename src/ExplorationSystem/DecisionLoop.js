/* Format of decisions: pass in area. The area contains information about all of
   its possible events. It uses this information to display options, and to carry
   out their consequences. The area is updated as needed.
   Once the loop of decisions in the current area is completed, the index of the
   next area in the areas array is returned. */

// TO-DO --

// The decision loop will be firing off functions based off of game state now.
// A notable change is that instead of returning the index when the loop is done, we
// will run setNextArea(index)...so instead "return index", "setNextArea(index)"
//
// Other things..."area.story()"" is just initial story, I may not be running it from here
// anymore, as I want original text right away with the new area, so I might be running
// it directly from the game component
//
// The "options" seem to correspond directly to the available unique actions, so I will
// likely be running setActions(options), with the way things are currently set

import { freeExplorationPrompt } from "../Messages";
import generateDefaultEvents from "../EventSystem/DefaultEvents";

const decisionLoop = ({
  player,
  area,
  areas,
  setNextArea,
  setText,
  setPrimaryActions,
  setSecondaryActions,
}) => {
  const secondaryActions = Object.values(generateDefaultEvents(player));

  // Let the story control text and actions until it's done
  let { text, actions } = area.runStory(player, setText, setPrimaryActions);

  if (!text && (!actions || !actions.length)) {
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
          const text = area.runEvent(player, eventIndex)
          setText(text);
          setPrimaryActions([]);
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
          setText([`Where do you want to go?`])
          setPrimaryActions([
            ...newAreas.map((availableArea) => ({
              name: availableArea.name,
              execute: () => setNextArea(availableArea),
            })),
            {
              name: "Stay",
              execute: () => {
                setText([`You decided to stay in the area.`])
                setPrimaryActions([])
              }
            }
          ])
        }
      }
      
      actions.push(leaveAreaAction);
    }
  } else {
    console.log("Running area story, no exploration yet.");
  }

  console.log('Decision Loop', { text, actions, secondaryActions });

  setText(text);
  setPrimaryActions(actions);
  setSecondaryActions(secondaryActions);
};

export default decisionLoop;
