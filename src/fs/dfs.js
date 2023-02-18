function DFS(startNode, endNode) {
  let stack = [];
  let visitedNodes = [];
  let path = [];

  stack.push(startNode);

  while (stack.length > 0) {
    let current = stack.pop();
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

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!visitedNodes.includes(neighbour) && !neighbour.isWall) {
        neighbour.previous = current;
        stack.push(neighbour);
      }
    }
  }
  return { path, visitedNodes, error: "found no path" };
}
export default DFS;
