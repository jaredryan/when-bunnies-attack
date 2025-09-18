// Default Events Available for All Areas

import checkStatus from "../ExplorationSystem/CheckStatus";
import utilizeItem from "../ExplorationSystem/UtilizeItemInField";
import leaveTheArea from "../ExplorationSystem/LeaveTheArea";

import Event from "./Event";

export const checkCurrentStatus = (player) =>
  new Event("Check your current status", checkStatus, player, false, {});

export const utilizeItemInField = (player) =>
  new Event("Use an item", utilizeItem, player, false, {});

export const leaveArea = (player) =>
  new Event("Leave the area", leaveTheArea, "", false, {});

const generateDefaultEvents = (player) => ({
  checkCurrentStatus: checkCurrentStatus(player),
  utilizeItemInField: utilizeItemInField(player),
  leaveArea: leaveArea(player),
});

export default generateDefaultEvents;
