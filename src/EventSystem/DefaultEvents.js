// Default Events Available for All Areas
export const checkCurrentStatus = new Event(
  "Check your current status",
  checkStatus,
  player,
  false,
  {},
);

export const useItemInField = new Event(
  "Use an item",
  useItemInField,
  player,
  false,
  {},
);

export const leaveArea = new Event(
  "Leave the area",
  leaveTheArea,
  "",
  false,
  {},
);
