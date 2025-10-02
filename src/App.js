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
  const [className, setClassName] = useState('');

  useViewportHeight();

  useEffect(() => window.scrollTo(0, 0), [gameInProgress, hasWon]);

  const startGame = () => {
    setGameInProgress(true);
    setHasWon(null);
  };

  // State management is slightly off in this game, refreshing the browser
  // is the easiest solution to restart the game. Use params to tell the
  // site to immediately start the game after the refresh.
  const restartGame = () => {
    window.location.reload();
    window.location.href = `${window.location.pathname}?restart=true`;
  };

  // If restarting the game, restart param will be set on url, so you know
  // to start the game immediately after refresh, then clear the param
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const restart = searchParams.get('restart');

    if (restart === 'true') {
      const currentUrl = new URL(window.location.href);
      const newUrlWithoutParams = currentUrl.origin + currentUrl.pathname
      window.history.replaceState({}, '', newUrlWithoutParams);
      startGame()
    }
  }, []);

  const endGame = (hasWon) => {
    setGameInProgress(false);
    setHasWon(hasWon);
  };

  let page = <Title startGame={startGame} />;

  if (gameInProgress) page = <Game endGame={endGame} setClassName={setClassName} />;
  else if (hasWon === false) page = <Loser startGame={restartGame} />;
  else if (hasWon === true) page = <Winner startGame={restartGame} />;

  return (
    <div
      className={`pageContainer${className ? ` ${className}` : ''}`}
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {page}
    </div>
  );
};

export default App;
