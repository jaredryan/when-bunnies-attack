import { useState, useEffect } from "react";

const flipIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Title = ({ startGame, onCoverChange }) => {
  const [flipped, setFlipped] = useState(false);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    onCoverChange?.(!flipped);
  }, [flipped, onCoverChange]);

  const flipTo = (next) => {
    setFlipping(true);
    setTimeout(() => setFlipped(next), 300);
    setTimeout(() => setFlipping(false), 600);
  };

  return (
    <div
      className={`titleContainer pagePadding ${flipped ? "titleContents" : "titleCover"}${
        flipping ? " flipping" : ""
      }`}
    >
      {flipped ? (
        <div className="titlePanel">
          <div className="titleContentsHeader">
            <div className="caseFileEyebrow">A Case Study</div>
            <button className="stampButton backButton" onClick={() => flipTo(false)}>
              <span className="btnText">Back</span>
            </button>
          </div>
          <h1>Contents</h1>
          <hr className="caseFileDivider" />
          <ul>
            <li>
              My first experimental game, built from scratch with love and JavaScript.
            </li>
            <li>
              It's a simple game: 10-15 minutes long, and no save feature, so make sure
              you got the time before diving in, and don't refresh the page — you'll have
              to start over.
            </li>
            <li>
              Good luck and have fun!
            </li>
          </ul>
          <hr className="caseFileDivider" />
          <button className="gameButton" onClick={startGame}>
            <span className="btnText">Open Case File</span>
          </button>
        </div>
      ) : (
        <div className="titlePanel">
          <h1>When Bunnies Attack</h1>
          <h2>A short and not-so-sweet text-based adventure</h2>
          <button
            className="flipButton"
            onClick={() => flipTo(true)}
            aria-label="Turn the page"
          >
            {flipIcon}
          </button>
        </div>
      )}
    </div>
  );
};

export default Title;
