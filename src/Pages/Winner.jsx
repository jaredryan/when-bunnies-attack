const Winner = (props) => (
  <div className="winnerContainer pagePadding">
    <div className="caseFileEyebrow">Case File: Closed</div>
    <h1>Specimen Escaped</h1>
    <hr className="caseFileDivider" />
    <div className="caseFileEyebrow">Details</div>
    <ul>
      <li>
        Hats off to you, my friend. Not only did you escape bunny experiments
        and the horrors of an unending vegetarian diet, but you, the player,
        had the patience to play all the way through my very first completed
        game.
      </li>
      <li>
        I'd give you some cake if I could (not carrot, of course), but since
        I can't, let me just take this moment to say, from the bottom of my
        heart: "Thank you!" And if you had fun despite its simplicity, feel
        free to share with a friend or <span className="emphasis">Play</span> with
        your new friends again.
      </li>
    </ul>
    <hr className="caseFileDivider" />
    <button className="gameButton" onClick={props.startGame}>
      <span className="btnText">Play</span>
    </button>
  </div>
);

export default Winner;
