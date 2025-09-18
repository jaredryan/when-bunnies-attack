import Modal from './Modal'

const QuitButton = (props) => (
  <>
    <Modal open={props.open} onClose={props.onCancel} className="quitModal">
      <p>Are you sure you want to quit?</p>
      <div className="buttonContainer">
        <button autoFocus onClick={props.onCancel} className="secondary">
          No
        </button>
        <button onClick={props.onQuit}>
          Yes
        </button>
      </div>
    </Modal>
    <button className="quit" onClick={props.openModal}>
      Quit
    </button>
  </>
)

export default QuitButton
