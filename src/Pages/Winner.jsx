const Winner = (props) => (
  <div className="winnerContainer pagePadding">
    <div className="caseFileEyebrow">Case File: Closed</div>
    <h1>Specimen Escaped</h1>
    <h2>Nice job, you got out!</h2>
    <div>
      <p>
        Hats off to you, my friend. Not only did you escape bunny experiments
        and the horrors of an unending vegetarian diet, but you, the player,
        had the patience to play all the way through my very first completed
        game.
      </p>
      <p>
        I'd give you some cake if I could (not carrot, of course), but since
        I can't, let me just take this moment to say, from the bottom of my
        heart: "Thank you!" And if you had fun despite its simplicity, feel
        free to share with a friend or click that big button below to play
        with your new friends again.
      </p>
    </div>
    <button className="gameButton" onClick={props.startGame}>
      <span className="btnText">Play Again</span>
    </button>
  </div>
);

export default Winner;
