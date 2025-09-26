import Modal from "./Modal";

// MAP

// L (2)    NE (6) - FW (7) - FE (8)
// |        |
// W (1) -  E (4)  - TR (5)
// |        | 
// SW (0) - SE (3)

// SW room is starting room, and you're isolated until you find the key
// L requires event to unlock it
// E Room requires event to unlock it
// FE requires event to unlock it

const generateMap = (currentArea, areas) => {
  const generateRoom = (area) => {
    const classNames = ['room']
    let content = ''

    if (!area.visited) {
      classNames.push('placeholder')
    } else {
      content = area.mapName
      if (currentArea.name === area.name) {
        classNames.push('active')
      }
    }

    return (
      <div className={classNames.join(' ')}><p>{content}</p></div>
    )
  }
  
  const generateConditionalConnectorClassNames = (areaIndex, connectedIndex, type, checkInverse = false) => {
    let area = areas[areaIndex]
    let connectionIndex = connectedIndex
    const classNames = [type, 'connector']
    if (type === 'vertical') {
      classNames.push('room')
    }

    console.log({ visited: area?.visited, connected: area?.connectedAreas, connectionIndex })

    if (!area?.visited || !area?.connectedAreas.includes(connectionIndex)) {
      if (!checkInverse) {
        classNames.push('placeholder')
      } else {
        area = areas[connectedIndex]
        connectionIndex = areaIndex

        if (!area?.visited || !area?.connectedAreas.includes(connectionIndex)) {
          classNames.push('placeholder')
        }
      }
    }
    return classNames.join(' ')
  }

  const map = (
    <div className="map">
      <div className="north row">
        {generateRoom(areas[2])}
        <div className="horizontal connector placeholder" />
        {generateRoom(areas[6])}
        <div className={generateConditionalConnectorClassNames(6, 7, 'horizontal')} />
        {generateRoom(areas[7])}
        <div className={generateConditionalConnectorClassNames(7, 8, 'horizontal')} />
        {generateRoom(areas[8])}
      </div>
      <div className="verticalConnectors row">
        <div className={generateConditionalConnectorClassNames(1, 2, 'vertical')} />
        <div className="vertical connector placeholder" />
        <div className={generateConditionalConnectorClassNames(4, 6, 'vertical')} />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
      </div>
      <div className="middle row">
        {generateRoom(areas[1])}
        <div className={generateConditionalConnectorClassNames(1, 4, 'horizontal', true)} />
        {generateRoom(areas[4])}
        <div className={generateConditionalConnectorClassNames(4, 5, 'horizontal')} />
        {generateRoom(areas[5])}
        <div className="horizontal connector placeholder" />
        <div className="room placeholder" />
      </div>
      <div className="verticalConnectors row">
        <div className={generateConditionalConnectorClassNames(0, 1, 'vertical')} />
        <div className="vertical connector placeholder" />
        <div className={generateConditionalConnectorClassNames(3, 4, 'vertical', true)} />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
      </div>
      <div className="south row">
        {generateRoom(areas[0])}
        <div className={generateConditionalConnectorClassNames(0, 3, 'horizontal')} />
        {generateRoom(areas[3])}
        <div className="horizontal connector placeholder" />
        <div className="room placeholder" />
        <div className="horizontal connector placeholder" />
        <div className="room placeholder" />
      </div>
    </div>
  )

  return map
}

const MapButton = (props) => (
  <>
    <Modal open={props.open} onClose={props.onCancel} className="mapModal">
      {generateMap(props.area, props.areas)}
      <div className="buttonContainer">
        <button autoFocus onClick={props.onCancel}>
          Close
        </button>
      </div>
    </Modal>
    <button className="map" onClick={props.openModal}>
      Open map
    </button>
  </>
);

export default MapButton;
