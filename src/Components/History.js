import Modal from "./Modal";

const History = ({ history, open, setOpen}) => (
  <>
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="scrollableHistory">
        {history.map((line, index) => (
          <p key={line + index}>{line}</p>
        ))}
      </div>
      <button autoFocus onClick={() => setOpen(false)}>
        Close
      </button>
    </Modal>
    <button onClick={() => setOpen(true)}>History</button>
  </>
);

export default History;
