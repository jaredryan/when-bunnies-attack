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
import generateDefaultEvents from '../EventSystem/DefaultEvents'

const decisionLoop = ({
  player,
  area,
  areas,
  setNextArea,
  setText,
  setPrimaryActions,
  setSecondaryActions,
  textIsDoneAndActionsAreReady,
}) => {
  const secondaryActions = generateDefaultEvents(player);

  // Let the story control text and actions until it's done
  let { text, actions } = area.runStory(player);

  if (!text && !actions) {
    // After scripted story is done, allow exploration to trigger events
    text = freeExplorationPrompt;
    actions = [];

    for (let eventIndex = 0; eventIndex < area.events.length; eventIndex++) {
      const event = area.events[eventIndex];
      actions.push({
        name: event.name,
        execute: () => {
          area.runEvent(player, eventIndex)
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
      const leaveAreaAction = [
        [`Where do you want to go?`],
        [...newAreas.map(availableArea => ({
          name: availableArea.name,
          execute: () => setNextArea(availableArea),
        })), {
          name: 'Stay',
          execute: () => [
            [`You decided to stay in the area.`],
            []
          ]
        }]
      ];
      
      actions.push(leaveAreaAction)
    }
  }

  setText(text)
  setPrimaryActions(actions)
  setSecondaryActions(secondaryActions)
};

export default decisionLoop;
