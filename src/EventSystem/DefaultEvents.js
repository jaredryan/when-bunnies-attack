// Default Events Available for All Areas

import checkStatus from "../ExplorationSystem/CheckStatus";
import utilizeItem from "../ExplorationSystem/UtilizeItemInField";

import Event from "./Event";

export const checkCurrentStatus = (player) =>
  new Event("Check your current status", checkStatus, [player], false, {});

export const utilizeItemInField = (player) =>
  new Event("Use an item", utilizeItem, [player], false, {});

const generateDefaultEvents = (player) => ({
  checkCurrentStatus: checkCurrentStatus(player),
  utilizeItemInField: utilizeItemInField(player),
});

export default generateDefaultEvents;
