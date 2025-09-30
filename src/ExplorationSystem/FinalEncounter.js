import Enemy from "../Entities/Enemy";
import finalBoss from "../Entities/Enemies/FinalBoss";
import messages from '../Messages'

// The Final Boss Special Event
const finalEncounter = () => {
  return {
    text: messages.finalBossEncounter,
    encounter: {
      enemy: new Enemy(...finalBoss),
      noRetreat: true,
    }
  };
};

export default finalEncounter;
