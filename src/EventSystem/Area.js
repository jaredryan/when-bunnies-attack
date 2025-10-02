// AREA CONSTRUCTOR

function Area(name, mapName, connectedAreas, number, events, story, visited = false) {
  this.name = name;
  this.mapName = mapName;
  this.events = events;
  this.connectedAreas = connectedAreas;
  this.story = story; // array of story events
  this.number = number;
  this.visited = visited;

  this.visit = () => {
    this.visited = true;
  };

  this.runStory = ({ player, setText, setPrimaryActions, setEncounter }) => {
    const story = this.story.shift();
    return story
      ? story({ player, setText, setPrimaryActions, setEncounter })
      : { text: null, actions: [], encounter: null };
  };

  this.runEvent = (player, eventIndex, setPageContainerClassName) => {
    const event = this.events[eventIndex];

    // Handle event list in area: if it's a one-time shot or leads
    // to another event, update the area's events accordingly
    if (event.removable === "switch") {
      this.events.splice(eventIndex, 1, event.nextEvent);
    } else if (event.removable) {
      this.events.splice(eventIndex, 1);
    }

    return event.trigger(player, setPageContainerClassName);
  };
}

export default Area;
