// The Final Boss Special Event
function finalEncounter(enemyPlayer) {
	console.log('Bunny Dictator: "Hmmm...?');
	sleep.msleep(1500);
	console.log('I see. You\'ve woken up. Welcome.');
	sleep.msleep(2000);
	console.log('You probably don\'t understand what\'s going on.');
	sleep.msleep(2000);
	console.log('This is our headquarters.');
	sleep.msleep(2000);
	console.log('Our kind has been experimented on by humans for years.');
	sleep.msleep(2000);
	console.log('What humans didn\'t know is how intelligent we bunnies were.');
	sleep.msleep(2000);
	console.log('One of our kind, who was formerly experimented on; she escaped.');
	sleep.msleep(2000);
	console.log('She vowed that our times of abuse were over.');
	sleep.msleep(1800);
	console.log('She established these headquarters as a place of protection and research."');
	sleep.msleep(2000);
	console.log("...");
	sleep.msleep(1000);
	console.log('"But I see that you killed my closest comrades.');
	sleep.msleep(2000);
	console.log('There is nothing left for me here, now.');
	sleep.msleep(2000);
	console.log('But for her, our founder, and my mother...');
	sleep.msleep(2000);
	console.log('I will see that her dream continues and annihilate all who stand in my way!"');
	sleep.msleep(2500);
	if (!forcedFight(enemyPlayer[0], enemyPlayer[1])) {
		gameInProgress = false;
	} else {
		return false;
	}
}