import Modal from "./Modal";
import { classifyDialogueLine } from "./DialogueBox";

const History = ({
  history,
  open,
  openHistory,
  closeHistory,
  historyIsOpening,
  historyIsClosing,
  finalEncounterLineText = null,
}) => (
  <>
    <Modal open={open || historyIsOpening} onClose={closeHistory} className={`history${historyIsClosing ? ' exiting' : ''}`}>
      <div className="scrollableHistory">
        {history.map((line, index) => {
          const { hasQuote, speaker, isExternalSpeaker } = classifyDialogueLine(line);
          const isYou = speaker?.toLowerCase() === "you";
          const isThreatening =
            hasQuote && !isYou && finalEncounterLineText != null && line === finalEncounterLineText;
          const className = [
            "gameLog",
            hasQuote && "quoted",
            hasQuote && isThreatening && "threatening",
            hasQuote && isExternalSpeaker && !isThreatening && "externalSpeaker",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <p key={line + index} className={className}>
              {line}
            </p>
          );
        })}
      </div>
      <button autoFocus onClick={closeHistory}>
        <span className="btnText">Close</span>
      </button>
    </Modal>
    <button onClick={openHistory}><span className="btnText">History</span></button>
  </>
);

export default History;
