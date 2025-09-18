import loseItem from "./LoseItem";
import unlockAreas from "./UnlockAreas";

const loseItemAndUnlockAreas = (
  itemMessageCurAreaIndexNewAreaIndexAreas,
  player,
) => {
  var info = itemMessageCurAreaIndexNewAreaIndexAreas;
  loseItem([info[0], info[1]], player);
  unlockAreas([info[2], info[3], info[4]]);
  return true;
};

export default loseItemAndUnlockAreas;
