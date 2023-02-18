function Astar(startNode, endNode) {
  let openSet = [];
  let closedSet = [];
  let path = [];
  let visitedNodes = [];
  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }
    let current = openSet[leastIndex];
    visitedNodes.push(current);
    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return { path, visitedNodes };
    }
    openSet = openSet.filter((e) => e !== current);
    closedSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let temp = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (temp < neighbour.g) {
            neighbour.g = temp;
            newPath = true;
          }
        } else {
          neighbour.g = temp;
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.h = heuristic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.f;
          neighbour.previous = current;
        }
      }
    }
  }
  return { path, visitedNodes, error: "found no path" };
}

function heuristic(a, b) {
  let d = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
  return d;
}
export default Astar;
