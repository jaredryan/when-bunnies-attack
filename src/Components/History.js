import { useState, useEffect, useRef } from "react";

const Dialog = ({ open, onCancel, children }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current) {
            if (open) {
                dialogRef.current.showModal(); // Opens the dialog modally, activating ::backdrop
            } else {
                dialogRef.current.close();
            }
        }
    }, [open]);

    return (
        <dialog ref={dialogRef} onCancel={onCancel} className="dialog">
            {children}
        </dialog>
    )
};

const History = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div>
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
