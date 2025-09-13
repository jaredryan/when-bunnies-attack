// Leads to new decision tree.
const unlockAreas = (messageCurrentAreaIndexNewAreaIndex) => {
  var info = messageCurrentAreaIndexNewAreaIndex;
  console.log(info[0]);
  for (var i = 0; i < info[2].length; i++) {
    console.log("The " + areas[info[2][i]].name + " is now available.");
    areas[info[1]].connectedAreas.push(info[2][i]);
  }
  return true;
}

export default unlockAreas
