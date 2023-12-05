function isValidWalk(walk) {
  direcctions = {
    northSouth: 0,
    eastWest: 0,
  };

  if (walk.length !== 10) {
    return false;
  }

  walk.forEach((dir) => {
    if (dir === "n") direcctions.northSouth++;
    if (dir === "s") direcctions.northSouth--;
    if (dir === "e") direcctions.eastWest++;
    if (dir === "w") direcctions.eastWest--;
  });
 return coordinates.northSouth === 0 && coordinates.eastWest === 0;
}

console.log(isValidWalk(["n", "s", "n", "s", "n", "s", "n", "s", "n", "s"]));
