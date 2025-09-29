import loseItem from "./LoseItem";
import unlockAreas from "./UnlockAreas";

const loseItemAndUnlockAreas = (
  item,
  message,
  currentAreaIndex,
  newAreaIndexes,
  areas,
  player,
) => {
  const loseItemMessage = loseItem(item, message, player);
  const unlockAreasMessage = unlockAreas(
    currentAreaIndex,
    newAreaIndexes,
    areas,
  );
  return { text: [...loseItemMessage.text, ...unlockAreasMessage.text] };
};

export default loseItemAndUnlockAreas;
