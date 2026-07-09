import Modal from "./Modal";

const History = ({ history, open, openHistory, closeHistory, historyIsOpening, historyIsClosing }) => (
  <>
    <Modal open={open || historyIsOpening} onClose={closeHistory} className={`history${historyIsClosing ? ' exiting' : ''}`}>
      <div className="scrollableHistory">
        {history.map((line, index) => (
          <p key={line + index}>{line}</p>
        ))}
      </div>
      <button autoFocus onClick={closeHistory}>
        Close
      </button>
    </Modal>
    <button onClick={openHistory}>History</button>
  </>
);

export default History;
