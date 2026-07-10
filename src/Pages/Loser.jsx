const Loser = (props) => (
  <div className="loserContainer pagePadding">
    <div className="caseFileEyebrow">Case File: Closed</div>
    <h1>
      Specimen Contained
    </h1>
    <hr className="caseFileDivider" />
    <div className="caseFileEyebrow">Details</div>
    <ul>
      <li>
        Don't worry. Many others thought: "It's just a harmless little bunny...",
        then promptly died. You're not alone.
      </li>
      <li>
        Some even went so far as to use something as barbaric as the "
        <a
          href="https://www.youtube.com/watch?v=tgj3nZWtOfA"
          target="_blank"
          rel="noopener noreferrer"
          className="emphasis"
        >
          holy hand grenade
        </a>
        ." How unsettling. Here, we're refined: we use knives and swords instead.
        And we have a very handy <span className="emphasis">Escape</span> button
        below.
      </li>
    </ul>
    <hr className="caseFileDivider" />
    <button className="gameButton" onClick={props.startGame}>
      <span className="btnText">Escape</span>
    </button>
  </div>
);

export default Loser;
