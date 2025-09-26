import { useState } from "react";
import Modal from "./Modal";

const History = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="scrollableHistory">
          {props.history.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <button autoFocus onClick={() => setOpen(false)}>
          Close
        </button>
      </Modal>
      <button onClick={() => setOpen(true)}>History</button>
    </>
  );
};

export default History;
