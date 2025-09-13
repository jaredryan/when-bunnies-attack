import React, { useState } from "react";
import "./index.css";
import Title from "./Pages/Title";
import Game from "./Pages/Game";
import Loser from "./Pages/Loser";
import Winner from "./Pages/Winner";

const App = () => {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [hasWon, setHasWon] = useState(null);

  const startGame = () => {
    setGameInProgress(true);
    setHasWon(null);
  };

  const endGame = (hasWon) => {
    setGameInProgress(false);
    setHasWon(hasWon);
  };

  let page = <Title startGame={startGame} />;

  if (gameInProgress) page = <Game endGame={endGame} />;
  else if (hasWon === false) page = <Loser startGame={startGame} />;
  else if (hasWon === true) page = <Winner startGame={startGame} />;

  return <div className="pageContainer">{page}</div>;
};

export default App;
