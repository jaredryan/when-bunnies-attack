import areas from './EventSystem/AreasList'
import decisionLoop from './ExplorationSystem/DecisionLoop'

import Game from './Pages/Game'

const GameController = (props) => {
  // In-game variables
  let won = false;
  let gameInProgress = true;
  let currentAreaIndex = 0;
  let connectedIndex;
  let area;

  while (gameInProgress) {
    area = areas[currentAreaIndex];
    connectedIndex = decisionLoop(area);
    currentAreaIndex = area.connectedAreas[connectedIndex];
  }

  if (!won) {
    lostGameMessage();
  } else {
    wonGameMessage();
  }
}

export default GameController
