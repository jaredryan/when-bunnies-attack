var bunny = [
  "Bunny",
  5,
  [1, 1],
  function (player) {
    console.log("You recovered 1 HP.");
    player.addItem(
      new Item(
        firstAidInfo[0],
        firstAidInfo[1],
        firstAidInfo[2],
        firstAidInfo[3],
      ),
    );
  },
];
