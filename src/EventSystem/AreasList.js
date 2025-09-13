import messages from '../Messages'

/*********************************** Area List *****************************************/

/************************************* Area0 *******************************************/

var swRoom0 = new Area("SW Room", [], 0, function() {
	messages.swRoom0EntryMessage1
	
	// Name established
	player.name = readlineSync.question(`Please enter your name:`)

	messages.swRoom0EntryMessage2(player)
})

/*********************************** End Area ******************************************/

/************************************* Area1 *******************************************/

var wRoom1 = new Area("W Room", [0, 4], 1, function() {
	messages.wRoom1EntryMessage1
	
	var index = readlineSync.keyInSelect([
		messages.wRoom1EntryAnswerResponsePairs[0].answer,
		messages.wRoom1EntryAnswerResponsePairs[1].answer,
		messages.wRoom1EntryAnswerResponsePairs[2].answer,
	], wRoom1EntryQuestion)

	let responseMessage = []
	if (index === 0) {
		responseMessage = messages.wRoom1EntryAnswerResponsePairs[0].response
	} else if (index === 1) {
		responseMessage = messages.wRoom1EntryAnswerResponsePairs[1].response
	} else if (index === 2) {
		responseMessage = messages.wRoom1EntryAnswerResponsePairs[2].response
	} else {
		responseMessage = messages.wRoom1EntryAnswerResponsePairs[3].response
	}

	messages.wRoom1EntryMessage2

	if (forcedFight(bunny, player)) {
		const endMessage = messages.wRoom1ExitMessage
	}
})

/************************************ End Area *****************************************/

/************************************* Area2 *******************************************/

var lab2 = new Area("Lab", [1], 2, function() {
	messages.lab2EntryMessage1

	if (forcedFight(scientistBunny, player)) {
		messages.lab2ExitMessage
	}
})

/************************************ End Area *****************************************/

/************************************* Area3 *******************************************/

var seRoom3 = new Area("SE Room", [0, 4], 3, function() {
	messages.seRoom3EntryMessage1(player)

	readlineSync.keyInSelect([
		messages.seRoom3EntryAnswerResponsePairs[0].answer,
		messages.seRoom3EntryAnswerResponsePairs[1].answer
	], seRoom3EntryQuestion)

	messages.seRoom3EntryMessage2

	if (forcedFight(bunny, player)) {
		messages.seRoom3ExitMessage
	}
})

/************************************ End Area *****************************************/

/************************************* Area4 *******************************************/

var eRoom4 = new Area("E Room", [1, 3, 6], 4, function() {
	messages.eRoom4EntryMessage
})

/************************************ End Area *****************************************/

/************************************* Area5 *******************************************/

var treasury5 = new Area("Treasury", [4], 5, function() {
	messages.treasury5EntryMessage
})

/************************************ End Area *****************************************/

/************************************* Area6 *******************************************/

var neRoom6 = new Area("NE Room", [4, 7], 6, function() {
	messages.neRoom6EntryMessage

	if (forcedFight(soldierBunny, player)) {
		messages.neRoom6ExitMessage
	}
})

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

var escape7 = new Area("Forest", [6], 7, function() {
	messages.escape7EntryMessage
})

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

var forestExit8 = new Area("Forest Exit", [7], 8, function() {
	messages.forestExit8EntryMessage
})

/************************************ End Area *****************************************/

/*********************************** End Areas *****************************************/

/*********************************** Area Array ****************************************/

var areas = [swRoom0, wRoom1, lab2, seRoom3, eRoom4, treasury5, neRoom6, escape7, forestExit8]
