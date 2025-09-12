import DialogueBox from "../Components/DialogueBox"

const Game = (props) => (
    <div className="gameContainer">
        <DialogueBox
            lines={[
                `"Ughhh...my head hurts."`,
                `As you wake up, you look around, and see that you are in a drab room.`,
                `Oh so very drab.`,
                `"Clearly, the designer of this room watched a lot of HGTV."`,
                `So very grey. With a splash of sage green on the bedstand. It's borderline sterile.`,
                `It's just as off-putting as the headache you've got, which just reminded you that it's here to stay.`,
                `"Well, this sucks. And uh...I don't exactly remember how I got here, and I don't know this room."`,
                `Unsure if you just partied too hard last night or got kidnapped, you scratch your head.`,
                `"I guess I'll take a look around...and I'll do that quietly, just in case."`,
                `"Hopefully it'll come back to me."`,
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
