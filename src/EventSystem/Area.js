// AREA CONSTRUCTOR
function Area(name, connectedAreas, number, story) {
	this.name = name;
	this.events = [leaveArea, checkCurrentStatus, useItemInField];
	this.connectedAreas = connectedAreas;
	this.story = story;
	this.number = number;
}
