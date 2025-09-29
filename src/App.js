import React, { useState, useEffect } from "react";
import "./index.css";
import Title from "./Pages/Title";
import Game from "./Pages/Game";
import Loser from "./Pages/Loser";
import Winner from "./Pages/Winner";

import useViewportHeight from "./Components/useViewportHeight";

const App = () => {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [hasWon, setHasWon] = useState(null);

  useViewportHeight();

  useEffect(() => window.scrollTo(0, 0), [gameInProgress, hasWon]);

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

  return (
    <div
      className="pageContainer"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {page}
    </div>
  );
};

export default App;
