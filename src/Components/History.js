import { useState, useEffect, useRef } from "react";

const Dialog = ({ open, onCancel, children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal(); // Opens the dialog modally, activating ::backdrop
        dialogRef.current.scrollTop = dialogRef.current.scrollHeight; // Scrolls to bottom
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel}
      className={`dialog ${open ? "open" : "closed"}`}
    >
      {children}
    </dialog>
  );
};

const History = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <button className="xButton" onClick={() => setOpen(false)}>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div className="scrollableHistory">
          {props.history.map((line) => (
            <p>{line}</p>
          ))}
        </div>
        <button autoFocus onClick={() => setOpen(false)}>
          Close
        </button>
      </Dialog>
      <button onClick={() => setOpen(true)}>History</button>
    </>
  );
};

export default History;
