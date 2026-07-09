const Title = (props) => (
  <div className="titleContainer pagePadding">
    <h1>When Bunnies Attack</h1>
    <h2>A short and not-so-sweet text-based adventure</h2>
    <p>
      My first experimental game, built from scratch with love and JavaScript.
    </p>
    <p>
      It's a simple game: 10-15 minutes long, and no save feature, so make sure
      you got the time before diving in, and don't refresh the page — you'll have
      to start over.
    </p>
    <p>Good luck and have fun!</p>
    <button className="gameButton" onClick={props.startGame}>
      Start Game
    </button>
  </div>
);

export default Title;
