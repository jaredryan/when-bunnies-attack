import { printStatus } from "../Utilities";

// Checks status in the tree. Stay in the area.
const checkStatus = (player) => {
  return { text: printStatus(player), actions: [] };
};

export default checkStatus;
