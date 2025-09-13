// EVENT CONSTRUCTOR
function Event(option, consequence, argumentsArray, removable, nextEvent) {
  this.option = option;
  this.consequence = consequence;
  this.arguments = argumentsArray;
  this.removable = removable;
  this.nextEvent = nextEvent;
}

export default Event;
