// EVENT CONSTRUCTOR
function Event(name, consequence, argumentsArray, removable, nextEvent) {
  this.name = name;
  this.consequence = consequence;
  this.arguments = argumentsArray;
  this.removable = removable;
  this.nextEvent = nextEvent;

  this.trigger = (player) => {
    this.consequence(this.arguments, player)
  }
}

export default Event;
