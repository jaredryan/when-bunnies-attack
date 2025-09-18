import { useEffect, useMemo, useState } from "react";

import QuitButton from "../Components/QuitButton";
import DialogueBox from "../Components/DialogueBox";

import Player from "../Entities/Player";
import areas from "../EventSystem/AreasList";
import decisionLoop from "../ExplorationSystem/DecisionLoop";

const Game = ({ endGame }) => {
  // Components
  const [quitModalIsOpen, setQuitModalIsOpen] = useState(false);

  // Initialization
  const player = useMemo(() => new Player(), []);

  const [area, setArea] = useState(areas[0]);
  const [text, setText] = useState([]);
  const [primaryActions, setPrimaryActions] = useState([]);
  const [secondaryActions, setSecondaryActions] = useState([]);
  const [textIsDoneAndActionsAreReady, setTextIsDoneAndActionsAreReady] =
    useState(true);

  // Keep an eye on player status to end the game when they've won or lost
  useEffect(() => {
    if (player.hasWon) {
      endGame(true);
    } else if (player.hasDied) {
      endGame(false);
    }
  }, [player, endGame]);

  // Every time the dialogue changes, reset this flag to stop the player
  // from taking action until the dialogue is over.
  useEffect(() => {
    setTextIsDoneAndActionsAreReady(false);
  }, [text]);

  // every time the area changes, rerun decision loop with new area
  useEffect(() => {
    if (
      textIsDoneAndActionsAreReady &&
      (!primaryActions || !primaryActions.length)
    ) {
      decisionLoop({
        player,
        area,
        areas,
        setNextArea: (area) => setArea(area),
        setText,
        setPrimaryActions,
        setSecondaryActions,
        textIsDoneAndActionsAreReady,
      });
    }
  }, [area, textIsDoneAndActionsAreReady, primaryActions, player]);

  // NEW FORMAT

  // 1. Area spits out story dialogue before anything happens
  //    a. Should also disable all default action buttons until dialogue is complete,
  //       except for Quit.
  // 2. Area should also spit out first set of available choices available
  //    a. This will be all the first row of actions that are Primary Button color
  // 3. Rinse, and repeat...text / info -> choices -> changes text / info -> new choices, etc.

  // In other words, I just need to cleverly manage the Dialogue Box and Action buttons to play out the game.
  // So...we need React useState to manage text and actions. Done.

  // That means our DecisionLoop logic will need access to the ability to modify gameState, text, and actions.
  // Done.

  // Then finally, with the way I currently organized my game into Areas...the DecisionLoop also needs access
  // to the current area, and the ability to change the area, when it's time to move on.

  // And as I think on it, the DecisionLoop would also need to know when the text is done being displayed, so
  // then it knows it's time to setActions...so we'll useState for tracking that as well, and we will pass its
  // state into the decision loop code, and we'll pass down the function to the text display Component, so it
  // can fire that function to let us know when it's done, and decision loop can continue its thing.

  // I am going to have the decision loop return the defaultActions that are always available to the user.
  // That way, I can easily add them to the buttons here....wait, no. The decisionLoop is going to be...well,
  // a loop that runs until the game ends, so that won't work. I need to use a callback to set them, just
  // like everything else.

  // All right, secondary / default actions will also be set as part of the DecisionLoop.

  // It might also need stuff like player data, how to fight, etc...So maybe more data needs to be initialized
  // and passed. Or it might be initialized elsewhere. One step at a time, though.

  const mapActions = (actions = []) => (
    <ul className="actionContainer">
      {actions.map((action) => (
        <li key={action.name}>
          <button onClick={action.execute}>{action.name}</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="gameContainer">
      <DialogueBox
        lines={text || []}
        onDone={() => setTextIsDoneAndActionsAreReady(true)}
      />
      <h2>Menu</h2>
      {/* Primary actions = actions unique to that area */}
      {textIsDoneAndActionsAreReady ? mapActions(primaryActions) : null}
      {/* Secondary actions = actions always available: leave area, inventory */}
      {/* Consider adding a new Map action button to make navigation better. */}
      {textIsDoneAndActionsAreReady ? mapActions(secondaryActions) : null}
      <QuitButton
        open={quitModalIsOpen}
        openModal={() => setQuitModalIsOpen(true)}
        onCancel={() => setQuitModalIsOpen(false)}
        onQuit={() => props.endGame(false)}
      />
    </div>
  );
};

export default Game;
