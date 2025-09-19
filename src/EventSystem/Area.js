// AREA CONSTRUCTOR

function Area(name, connectedAreas, number, events, story) {
  this.name = name;
  this.events = events;
  this.connectedAreas = connectedAreas;
  this.story = story; // array of story events
  this.number = number;

  this.runStory = (player, setText, setPrimaryActions) => {
    const story = this.story.shift();
    return story
      ? story(player, setText, setPrimaryActions)
      : { text: null, actions: [] };
  };

  this.runEvent = (player, eventIndex) => {
    const event = this.events[eventIndex];

    // Handle event list in area: if it's a one-time shot or leads
    // to another event, update the area's events accordingly
    if (event.removable === "switch") {
      this.events.splice(eventIndex, 1, event.nextEvent);
    } else if (event.removable) {
      this.events.splice(eventIndex, 1);
    }

    return event.trigger(player);
  };
}

export default Area;
