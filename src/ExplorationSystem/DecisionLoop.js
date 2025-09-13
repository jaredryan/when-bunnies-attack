/* Format of decisions: pass in area. The area contains information about all of
   its possible events. It uses this information to display options, and to carry
   out their consequences. The area is updated as needed.
   Once the loop of decisions in the current area is completed, the index of the
   next area in the areas array is returned. */
const decisionLoop = (area) => {
  var isRunning = true;
  area.story(); // run story dialogue and events for the first time entering the area
  while (isRunning) {
    // Prepare options for display
    options = [];
    for (var i = 0; i < area.events.length; i++) {
      options.push(area.events[i].option);
    }

    var index = readlineSync.keyInSelect(options, "What do you want to do?");
    // Handle the "cancel case"
    if (index === -1) {
      if (cancelExecution()) {
        return;
      }
      console.log("Please select one of the other options.");
      continue;
    }

    var event = area.events[index];
    isRunning = event.consequence(event.arguments);

    // Replace events that no longer have any purpose and that build on each other
    if (event.removable === "switch") {
      area.events.splice(index, 1, event.nextEvent);
    } else if (event.removable) {
      // Remove events that serve no further purpose
      area.events.splice(index, 1);
    }
  }
  // Stop the decision making process if you're dead.
  if (!gameInProgress) {
    return;
  }
  // Remove dialogue if you return to the area
  area.story = function () {};
  // Produce string array for where to go next.
  var newAreas = [];
  var areaIndex;
  for (var i = 0; i < area.connectedAreas.length; i++) {
    areaIndex = area.connectedAreas[i];
    newAreas.push(areas[areaIndex].name);
  }
  // Check if you can leave the area.
  if (newAreas.length === 0) {
    console.log("But, you cannot leave the area.");
    return decisionLoop(area);
  }
  // Return index of next area, or return the same area if canceled.
  var newIndex = readlineSync.keyInSelect(newAreas, "Where do you want to go?");
  if (newIndex === -1) {
    console.log("You decided to stay in the area.");
    return decisionLoop(area);
  }
  return newIndex;
}

export default decisionLoop
