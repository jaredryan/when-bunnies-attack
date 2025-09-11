const Game = (props) => (
    <div className="gameContainer">
        <p className="gameLog">{"messages from the game"}</p>
        <h2>Menu</h2>
        <ul className="actionContainer">
            <li><button>Fight</button></li>
            <li><button>Leave</button></li>
        </ul>
        <ul className="actionContainer">
            <li><button>Status</button></li>
            <li><button>Inventory</button></li>
            <li><button>Map</button></li> {/* Doing this would be a new feature! */}
            <li><button>History</button></li> {/* Doing this would be a new feature! */}
        </ul>
        <button className="quit" onClick={() => props.endGame(false)}>Quit</button>
    </div>
)

export default Game
