const Title = (props) => (
    <div className="titleContainer">
        <h1>When Bunnies Attack</h1>
        <h2>A short and not-so-sweet text-based adventure</h2>
        <p>
            While learning the basics of web development at a coding bootcamp,
            I made this game as a learning project. As an avid video game lover,
            my first fun coding project just had to be a video game! It was
            originally one single JavaScript file ran by Node.js in the terminal,
            and now, years later, I did some spring cleaning and hosted it.
        </p>
        <p>
            It's about 5-10 minutes, and there is no save feature, so make sure
            you got the time to spare...or, you know, just leave this open in some
            tab until you can come back to it. Good luck!
        </p>
        <button className="gameButton" onClick={props.startGame}>Start Game</button>
    </div>
)

export default Title
