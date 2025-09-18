// Leads to new decision tree.
const unlockAreas = (currentAreaIndexNewAreaIndexesAreas) => {
  const areas = currentAreaIndexNewAreaIndexesAreas[2];

  const currentArea = areas[currentAreaIndexNewAreaIndexesAreas[0]];

  for (const newAreaIndex of currentAreaIndexNewAreaIndexesAreas[1]) {
    console.log(`The ${areas[newAreaIndex].name} is now available.`);
    currentArea.connectedAreas.push(newAreaIndex);
  }
  return true;
}

export default unlockAreas
