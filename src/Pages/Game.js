import DialogueBox from "../Components/DialogueBox"

const Game = (props) => (
    <div className="gameContainer">
        <DialogueBox
            lines={[
                "Once upon a time, there was a hero...",
                "He set out on a long journey.",
                "The path ahead was full of danger and wonder."
            ]}
        />
        <h2>Menu</h2>
        <ul className="actionContainer">
            <li><button>Fight</button></li>
            <li><button>Leave</button></li>
        </ul>
        <ul className="actionContainer">
            <li><button>Status</button></li>
            <li><button>Inventory</button></li>
            <li><button>Map</button></li> {/* Doing this would be a new feature! */}
        </ul>
        <button className="quit" onClick={() => props.endGame(false)}>Quit</button>
    </div>
)

export default Game
