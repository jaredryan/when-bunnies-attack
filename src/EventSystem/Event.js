// EVENT CONSTRUCTOR
function Event(name, consequence, argumentsArray, removable, nextEvent) {
  this.name = name;
  this.consequence = consequence;
  this.arguments = argumentsArray;
  this.removable = removable;
  this.nextEvent = nextEvent;

  this.trigger = (player, setPageContainerClassName) => {
    return this.consequence(...this.arguments, player, setPageContainerClassName);
  };
}

export default Event;
