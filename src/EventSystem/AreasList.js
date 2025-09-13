/*********************************** Area List *****************************************/

/************************************* Area0 *******************************************/

var swRoom0 = new Area("SW Room", [], 0, function() {
	const entryMessage1 = [
		`"....ughhh"`,
		`"...what happened?"`,
		`As you wake up and look around, a name comes to mind...`,
		`"I must have hit my head. Can't believe I almost forgot. It's..."`,
	]

	// Name established
	player.name = readlineSync.question(`Please enter your name:`)

	const entryMessage2 = [
		`"...I'm ${player.name}. My head hurts. I wonder what else I forgot.`,
		`Like...for example, where I'm at. Where the heck am I?"`,
		`As you look around, you notice that you are in a simple room.`,
		`The walls are a dull grey; the bed you are on is simple: wood, white sheets, and white blankets.`,
		`There's a nightstand by the bed. You don't sense any danger, but you don't quite feel comfortable either.`,
	]
})

/*********************************** End Area ******************************************/

/************************************* Area1 *******************************************/

var wRoom1 = new Area("W Room", [0, 4], 1, function() {
	const entryMessage = [
		`As you walk down the hallway, you notice a bunny. It looks so cute.`,
		`You take a closer look and it turns around and looks at you.`,
		`Bunny: "Hi, how are you feeling? We found you the other day."`,
		`You: "...!!!!! (aka, internal screaming)"`,
		`Bunny: "What's wrong? Ain't you ever seen a talking bunny before?"`,
	]
	
	var index = readlineSync.keyInSelect([`You: "Yes"`, `You: "No"`, `You: "Where am I?"`], `Bunny: "Anyways, are you feeling better?"`)

	let responseMessage = []
	if (index === 0) {
		responseMessage = [
			`Bunny: "That's great! Let me lead you back to your room so you can finish your recovery."`,
		]
	} else if (index === 1) {
		responseMessage = [
			`Bunny: "Uh oh! Let me lead you back to your room so you can finish your recovery."`,
		]
	} else if (index === 2) {
		responseMessage = [
			`Bunny: "Uh no, you must have hit your head. Let me lead you back to your room."`,
		]
	} else {
		responseMessage = [
			`Bunny: "Uh no, you can't talk. You must have hit your head."`,
			`Let me lead you back to your room."`
		]
	}

	const entryMessage2 = [
		`...`,
		`Bunny: "What's with the suspicious look?`,
		`...`,
		`Bunny: "Fine, I'll take you back by force!"`,
	]	

	if (forcedFight(bunny, player)) {
		const endMessage = [
			`"That bunny talked! And it attacked me! Where the heck am I?"`,
		]
	}
})

/************************************ End Area *****************************************/

/************************************* Area2 *******************************************/

var lab2 = new Area("Lab", [1], 2, function() {
	const entryMessage = [
		`You step into the lab.`,
		`Bunny in a lab coat: "Hey, what are you doing in here?!`,
		`Get out of here!"`,
	]

	if (forcedFight(scientistBunny, player)) {
		const exitMessage = [
			`"Was that bunny...a scientist?! This just keeps getting weirder!"`,
		]
	}
})

/************************************ End Area *****************************************/

/************************************* Area3 *******************************************/

var seRoom3 = new Area("SE Room", [0, 4], 3, function() {
	const entryMessage = [
		`Walking through the hallway, you come across a bunny. It looks adorable.`,
		`You slowly approach it and take a closer look.`,
		`It turns around and stares at you. After a couple of seconds...`,
		`Bunny: "Hi, you must be new here. I'm Bob. Who are you?"`,
		`You: ......`,
		`Bunny: "Ahem...?"`,
		`You: "(Oh, right.) I'm ${player.name}."`,
		`Bunny: "Nice to meet you, ${player.name}. Are you lost?"`,
	]

	var index = readlineSync.keyInSelect([`You: "Can I talk to you about what's going on? I'm confused."`, `You: "I want to keep looking around, if that's okay."`], `Bunny: "I'll take you back to your room."`)

	const entryMessage2 = [	
		`...`,
		`Bunny: "How about I just make you come with me instead?!`,
	]

	if (forcedFight(bunny, player)) {
		const exitMessage = [
			`"He...she...it...?`,
			`They spoke to me! And attacked me! What's going on?!"`
		]
	}
})

/************************************ End Area *****************************************/

/************************************* Area4 *******************************************/

var eRoom4 = new Area("E Room", [1, 3, 6], 4, function() {
	const entryMessage = [
		`As you enter the room, you notice that it looks quite a bit like an armory.`,
		`Weapons are all over the place.`,
		`It seems like it hasn't been tidied up in some time.`,
		`You also notice a door on the east side of the room.`,
	]
})

/************************************ End Area *****************************************/

/************************************* Area5 *******************************************/

var treasury5 = new Area("Treasury", [4], 5, function() {
	const entryMessage = [
		`You step into the treasury.`,
		`"No bunnies. No other talking animals...`,
		`Finally.`,
		`I can rest a little bit here."`,
		`Gold is piled up all around the room. And...carrots.`,
		`Oh so many carrots.`,
		`"Figures..."`,
	]
})

/************************************ End Area *****************************************/

/************************************* Area6 *******************************************/

var neRoom6 = new Area("NE Room", [4, 7], 6, function() {
	const entryMessage = [
		`As you walk into the room, you see another bunny. Great.`,
		`This one is wearing armor. You don't even bother talking.`,
		`You walk over, ready to fight.`,
	]

	if (forcedFight(soldierBunny, player)) {
		const exitMessage = [
			`"And that was a soldier bunny. I'm not even surprised anymore."`,
		]
	}
})

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

var escape7 = new Area("Forest", [6], 7, function() {
	const entryMessage = [
		`As you step outside of the building, you realize that you are in a forest.`,
		`A bit of an ominous one, at that`,
		`How does it look ominous, you ask?`,
		`Well...no other structures within sight, one path, and dense vegetation.`,
		`In other words, you're alone; one way in, one way out; and so many hiding spots.`
		`Turning around, you gaze back at the building you just came out of.`,
		`It looks like a small fortress.`,
		`"Thank God I'm out of there. But...uh...now what?`,
		`I have to walk this path out of here from the spooky forest.`,
		`Terrific."`,
		`Maybe if you weren't so exhausted, you could try to clear your own path.`,
		`Beyond that, you don't know if or when backup bunnies will arrive might come out from the fortress.`,
		`You just need to get out of there is quick as you can, and hope for the best.`,
		`So, obvious it may be, and perhaps even unwise, you start walking on the path through the forest.`
		`You can only hope that if you encounter any enemies, you'll spot them first.`
		`Or perhaps duck into the forest real quick to ditch them, before eventually coming back on the path.`,
		`"I know this is probably stupid...but let's just get on with it.".`,
		`You start trek on the lone path through the forest.`,
	]
})

/************************************ End Area *****************************************/

/************************************* Area7 *******************************************/

var forestExit8 = new Area("Forest Exit", [7], 8, function() {
	const entryMessage = [
		`As you into a small clearing in the forest and into the clearing, you see another bunny and some sort of machine.`,
		`Past the bunny, you can see the rays of the morning sun.`,
		`Either there's another clearing past this one, or you're finally at the forest's edge.`
		`The bunny senses your presence, turns around, and speaks:`,
	]
})

/************************************ End Area *****************************************/

/*********************************** End Areas *****************************************/

/*********************************** Area Array ****************************************/

var areas = [swRoom0, wRoom1, lab2, seRoom3, eRoom4, treasury5, neRoom6, escape7, forestExit8]
