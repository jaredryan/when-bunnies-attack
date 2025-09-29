import Modal from "./Modal";

// MAP

//                   FE (8)
//                   |
// L (2)    NE (6) - FW (7) - FE (8)
// |        |
// W (1) -  E (4)  - TR (5)
// |        |
// SW (0) - SE (3)

// SW room is starting room, and you're isolated until you find the key
// L requires event to unlock it
// E Room requires event to unlock it
// FE requires event to unlock it

const mapIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <path d="M576 112C576 100.9 570.3 90.6 560.8 84.8C551.3 79 539.6 78.4 529.7 83.4L413.5 141.5L234.1 81.6C226 78.9 217.3 79.5 209.7 83.3L81.7 147.3C70.8 152.8 64 163.9 64 176L64 528C64 539.1 69.7 549.4 79.2 555.2C88.7 561 100.4 561.6 110.3 556.6L226.4 498.5L405.8 558.3C413.9 561 422.6 560.4 430.2 556.6L558.2 492.6C569 487.2 575.9 476.1 575.9 464L575.9 112zM256 440.9L256 156.4L384 199.1L384 483.6L256 440.9z" />
  </svg>
);

const generateMap = (currentArea, areas) => {
  const generateRoom = (area) => {
    const classNames = ["room"];
    let content = "";

    if (!area.visited) {
      classNames.push("placeholder");
    } else {
      content = area.mapName;
      if (currentArea.name === area.name) {
        classNames.push("active");
      }
    }

    return (
      <div className={classNames.join(" ")}>
        <p>{content}</p>
      </div>
    );
  };

  const generateConditionalConnectorClassNames = (
    areaIndex,
    connectedIndex,
    type,
    checkInverse = false,
  ) => {
    let area = areas[areaIndex];
    let connectionIndex = connectedIndex;
    const classNames = [type, "connector"];
    if (type === "vertical") {
      classNames.push("room");
    }

    if (!area?.visited || !area?.connectedAreas.includes(connectionIndex)) {
      if (!checkInverse) {
        classNames.push("placeholder");
      } else {
        area = areas[connectedIndex];
        connectionIndex = areaIndex;

        if (!area?.visited || !area?.connectedAreas.includes(connectionIndex)) {
          classNames.push("placeholder");
        }
      }
    }
    return classNames.join(" ");
  };

  const map = (
    <div className="map">
      <div className="exit row">
        <div className="room placeholder" />
        <div className="horizontal connector placeholder" />
        <div className="room placeholder" />
        <div className="horizontal connector placeholder" />
        {generateRoom(areas[8])}
      </div>
      <div className="verticalConnectors row">
        <div className="vertical connector room placeholder" />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
        <div className="vertical connector placeholder" />
        <div
          className={generateConditionalConnectorClassNames(7, 8, "vertical")}
        />
      </div>
      <div className="north row">
        {generateRoom(areas[2])}
        <div className="horizontal connector placeholder" />
        {generateRoom(areas[6])}
        <div
          className={generateConditionalConnectorClassNames(6, 7, "horizontal")}
        />
        {generateRoom(areas[7])}
      </div>
      <div className="verticalConnectors row">
        <div
          className={generateConditionalConnectorClassNames(1, 2, "vertical")}
        />
        <div className="vertical connector placeholder" />
        <div
          className={generateConditionalConnectorClassNames(4, 6, "vertical")}
        />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
      </div>
      <div className="middle row">
        {generateRoom(areas[1])}
        <div
          className={generateConditionalConnectorClassNames(
            1,
            4,
            "horizontal",
            true,
          )}
        />
        {generateRoom(areas[4])}
        <div
          className={generateConditionalConnectorClassNames(4, 5, "horizontal")}
        />
        {generateRoom(areas[5])}
      </div>
      <div className="verticalConnectors row">
        <div
          className={generateConditionalConnectorClassNames(0, 1, "vertical")}
        />
        <div className="vertical connector placeholder" />
        <div
          className={generateConditionalConnectorClassNames(
            3,
            4,
            "vertical",
            true,
          )}
        />
        <div className="vertical connector placeholder" />
        <div className="vertical connector room placeholder" />
      </div>
      <div className="south row">
        {generateRoom(areas[0])}
        <div
          className={generateConditionalConnectorClassNames(0, 3, "horizontal")}
        />
        {generateRoom(areas[3])}
        <div className="horizontal connector placeholder" />
        <div className="room placeholder" />
      </div>
    </div>
  );

  return map;
};

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
    <button className="map" onClick={props.openModal} aria-label="Map">
      {mapIcon}
    </button>
  </>
);

export default MapButton;
