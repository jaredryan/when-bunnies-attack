const Winner = (props) => (
  <div className="winnerContainer">
    <h1>
      When Bunnies <span className="emphasis">Lose</span>
    </h1>
    <h2>Nice job, you escaped!</h2>
    <p>
      Hats off to you, my friend. Not only did you escape bunny experiments and
      the horrors of an unending vegetarian diet, but you managed to play
      through a novice developer's game! That's a 3-fold escape: a hat trick, if
      you will.
    </p>
    <p>
      I'd give you some cake if I could (not carrot, of course), but since I
      can't, let me just take this moment to say "Thank you!" And if you had fun
      anyways, please share with a friend or click that big button below to play
      with your new friends again.
    </p>
    <button className="gameButton" onClick={props.startGame}>
      Play Again
    </button>
  </div>
);

export default Winner;
