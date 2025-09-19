// Leads to new decision tree.
const unlockAreas = (currentAreaIndex, newAreaIndexes, areas) => {
  const currentArea = areas[currentAreaIndex];

  console.log(currentAreaIndex)
  console.log(newAreaIndexes)
  console.log(areas)

  const message = []
  for (const newAreaIndex of newAreaIndexes) {
    message.push(`The ${areas[newAreaIndex].name} is now available.`);
    currentArea.connectedAreas.push(newAreaIndex);
  }
  return message;
};

export default unlockAreas;
