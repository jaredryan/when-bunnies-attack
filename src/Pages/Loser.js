const Loser = (props) => (
    <div className="loserContainer">
        <h1>When Bunnies <span className="emphasis">Win</span></h1>
        <h2>Oof. Looks like they got you.</h2>
        <p>
            Don't worry. Many others thought: "It's just a harmless little bunny...", then
            promptly died. You're not alone.
        </p>
        <p>
            Some even went so far as to use something as barbaric as the "holy hand grenade."
            How unsettling. Here, we're refined: we use knives and swords instead.
            And a very handy <span className="emphasis">Restart</span> button.
        </p>
        <button className="gameButton" onClick={props.startGame}>Restart Game</button>
    </div>
)

export default Loser
