// The Final Boss Special Event
function finalEncounter(enemyPlayer) {
  const entryMessage = [
    `Bunny Dictator: "Hmmm...?`,
    `I see. You\'ve woken up. Welcome.`,
    `You probably don\'t understand what\'s going on.`,
    `This is our headquarters.`,
    `Our kind has been experimented on by humans for years.`,
    `What humans didn\'t know is how intelligent we bunnies were.`,
    `One of our kind, who was formerly experimented on; she escaped.`,
    `She vowed that our times of abuse were over.`,
    `She established these headquarters as a place of protection and research."`,
    `...``"But I see that you killed my closest comrades.`,
    `There is nothing left for me here, now.`,
    `But for her, our founder — and my mother —`,
    `I will see that her dream continues."`,
    `And annihilate all who stand in my way!!!"`,
  ];

  if (!forcedFight(enemyPlayer[0], enemyPlayer[1])) {
    gameInProgress = false;
  } else {
    return false;
  }
}
