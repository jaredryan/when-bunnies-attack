const Game = (props) => (
    <div className="gameContainer">
        <p className="gameLog">{"messages from the game"}</p>
        <h2>Menu</h2>
        <ul className="actionContainer">
            <li><button>Fight</button></li>
            <li><button>Explore</button></li>
        </ul>
        <ul className="actionContainer">
            <li><button>Status</button></li>
            <li><button>Inventory</button></li>
            <li><button>Map</button></li>
            <li><button onClick={() => props.endGame(false)}>Quit</button></li>
        </ul>
    </div>
)

export default Game
