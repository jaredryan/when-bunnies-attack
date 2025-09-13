var soldierBunny = [
  "Soldier Bunny",
  8,
  [1, 1],
  function (player) {
    console.log("You recovered 3 HP.");
    player.addItem(
      new Item(
        throwingKnife[0],
        throwingKnife[1],
        throwingKnife[2],
        throwingKnife[3],
      ),
    );
  },
];
