function breadthFirstSearch(startNode, endNode) {
  let queue = [];
  let visitedNodes = [];
  let path = [];

  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.g + startNode.h;

  queue.push(startNode);
  visitedNodes.push(startNode);

  while (queue.length > 0) {
    let current = queue.shift();

    if (current === endNode) {
      let temp = current;

      while (temp !== startNode) {
        path.push(temp);
        temp = temp.previous;
      }

      path.push(startNode);
      path.reverse();

      return { path, visitedNodes };
    }

    let neighbors = current.neighbours;

    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];

      if (!visitedNodes.includes(neighbor) && !neighbor.isWall) {
        visitedNodes.push(neighbor);
        neighbor.g = current.g + 1;
        neighbor.h = heuristic(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
        queue.push(neighbor);
      }
    }
  }

  return { path, visitedNodes, error: "found no path" };
}

function heuristic(a, b) {
  let d = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
  return d;
}

export default breadthFirstSearch;