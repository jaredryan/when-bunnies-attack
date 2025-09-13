
export const fleeAttemptMessage = `You tried to run away!`
export const fleeSuccessMessage = `You successfully ran away!`
export const fleeFailureMessage = `You were unable to escape!`

export const lostGameMessage = [
	`"Everything is going dark..."`,
	`..`,
	`.`,
	`You were never seen again.`,
]

export const wonGameMessage = [
	`That's it. It's finished. You escaped the clutches of those bunnies.`,
	`...`,
	`At least you think you did. To be sure, You take a quick look around.`,
	`There's a...BUNNY!!!!!!!!`,
	`"DIE BUNNY!!!"`,
	`Right before you strike, you realize it's just a normal bunny.`,
	`It looks like it wants food and is asking you for some.`,
	`"Awww...sorry little guy. I don't have anything."`,
	`You walk away.`,
	`As you walk away and disappear out of sight,`,
	`the bunny slowly approaches towards the bunny dictator...`,
	`..`,
	`.`,
	`\nCongratulations, you won the game!!! And escaped...probably.\n`,
]

/********************************* Area Messages ***************************************/

export const swRoom0EntryMessage1 = [
	`"....ughhh"`,
	`"...what happened?"`,
	`As you wake up and look around, a name comes to mind...`,
	`"I must have hit my head. Can't believe I almost forgot. It's..."`,
]

export const swRoom0EntryMessage2 = (player) => [
	`"...I'm ${player.name}. My head hurts. I wonder what else I forgot.`,
	`Like...for example, where I'm at. Where the heck am I?"`,
	`As you look around, you notice that you are in a simple room.`,
	`The walls are a dull grey; the bed you are on is simple: wood, white sheets, and white blankets.`,
	`There's a nightstand by the bed. You don't sense any danger, but you don't quite feel comfortable either.`,
]





export const wRoom1EntryMessage1 = [
	`As you walk down the hallway, you notice a bunny. It looks so cute.`,
	`You take a closer look and it turns around and looks at you.`,
	`Bunny: "Hi, how are you feeling? We found you the other day."`,
	`You: "...!!!!! (aka, internal screaming)"`,
	`Bunny: "What's wrong? Ain't you ever seen a talking bunny before?"`,
]

export const wRoom1EntryMessage2 = [
	`...`,
	`Bunny: "What's with the suspicious look?`,
	`...`,
	`Bunny: "Fine, I'll take you back by force!"`,
]

export const wRoom1EntryQuestion = [
	`Bunny: "Anyways, are you feeling better?"`
]

export const wRoom1EntryAnswerResponsePairs = [{
	answer: `You: "Yes"`,
	response: [
		`Bunny: "That's great! Let me lead you back to your room so you can finish your recovery."`,
	],
}, {
	answer: `You: "No"`,
	response: [
		`Bunny: "Uh oh! Let me lead you back to your room so you can finish your recovery."`,
	],
}, {
	answer: `You: "Where am I?"`,
	response: [
		`Bunny: "Uh no, you must have hit your head. Let me lead you back to your room."`,
	],
}, {
	answer: null,
	response: [
		`Bunny: "Uh no, you can't talk. You must have hit your head."`,
		`Let me lead you back to your room."`,
	],
}]

export const wRoom1ExitMessage = [
	`"That bunny talked! And it attacked me! Where the heck am I?"`,
]





export const lab2EntryMessage1 = [
	`You step into the lab.`,
	`Bunny in a lab coat: "Hey, what are you doing in here?!`,
	`Get out of here!"`,
]

export const lab2ExitMessage = [
	`"Was that bunny...a scientist?! This just keeps getting weirder!"`,
]





export const seRoom3EntryMessage1 = (player) => [
	`Walking through the hallway, you come across a bunny. It looks adorable.`,
	`You slowly approach it and take a closer look.`,
	`It turns around and stares at you. After a couple of seconds...`,
	`Bunny: "Hi, you must be new here. I'm Bob. Who are you?"`,
	`You: ......`,
	`Bunny: "Ahem...?"`,
	`You: "(Oh, right.) I'm ${player.name}."`,
	`Bunny: "Nice to meet you, ${player.name}. Are you lost?"`,
]

export const seRoom3EntryMessage2 = [	
	`...`,
	`Bunny: "How about I just make you come with me instead?!`,
]

export const seRoom3EntryQuestion = [
	`Bunny: "I'll take you back to your room."`,
]

export const seRoom3EntryAnswerResponsePairs = [{
	answer: `You: "Can I talk to you about what's going on? I'm confused."`,
	response: seRoom3EntryMessage2,
}, {
	answer: `You: "I want to keep looking around, if that's okay."`,
	response: seRoom3EntryMessage2,
}]

export const seRoom3ExitMessage = [
	`"He...she...it...?`,
	`They spoke to me! And attacked me! What's going on?!"`
]





export const eRoom4EntryMessage = [
	`As you enter the room, you notice that it looks quite a bit like an armory.`,
	`Weapons are all over the place.`,
	`It seems like it hasn't been tidied up in some time.`,
	`You also notice a door on the east side of the room.`,
]





export const treasury5EntryMessage = [
	`You step into the treasury.`,
	`"No bunnies. No other talking animals...`,
	`Finally.`,
	`I can rest a little bit here."`,
	`Gold is piled up all around the room. And...carrots.`,
	`Oh so many carrots.`,
	`"Figures..."`,
]





export const neRoom6EntryMessage = [
	`As you walk into the room, you see another bunny. Great.`,
	`This one is wearing armor. You don't even bother talking.`,
	`You walk over, ready to fight.`,
]

export const neRoom6ExitMessage = [
	`"And that was a soldier bunny. I'm not even surprised anymore."`,
]





export const escape7EntryMessage = [
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





export const forestExit8EntryMessage = [
	`As you into a small clearing in the forest and into the clearing, you see another bunny and some sort of machine.`,
	`Past the bunny, you can see the rays of the morning sun.`,
	`Either there's another clearing past this one, or you're finally at the forest's edge.`
	`The bunny senses your presence, turns around, and speaks:`,
]
