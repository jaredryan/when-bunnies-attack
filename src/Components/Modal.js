import { useEffect, useRef } from "react";

export const Modal = ({ open, onClose, children, className }) => {
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
      onCancel={onClose}
      className={`dialog ${open ? "open" : "closed"}${className ? ` ${className}` : ""}`}
    >
      <button className="xButton" onClick={onClose}>
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {children}
    </dialog>
  );
};

export default Modal;
