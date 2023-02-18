import React, { useState, useEffect } from "react";
import Node from "./Node";
import "./PathFind.css";
import Astar from "../astar/astar";
import Dijkstra from "../dijkstra/dijkstra";
import DFS from "../fs/dfs";
import BFS from "../fs/bfs";
import breadthFirstSearch from "../fs/bfs";
const cols = 20;
const rows = 20;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;
const PathFind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [visitednodes, setvisitednodes] = useState([]);
  const [algo, setalgo] = useState("Dijkstra");
  useEffect(() => {
    initalizeGrid();
  }, []);

  const initalizeGrid = () => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    createSpot(grid);

    setGrid(grid);

    addNeighbours(grid);
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    /*    if (algo === "Dijkstra") {
      path = Dijkstra(startNode, endNode);
    }
    if (algo === "DFS") {
      path = DFS(startNode, endNode);
    } */
    startNode.isWall = false;
    endNode.isWall = false;
    setPath(path.path);
    setvisitednodes(path.visitedNodes);
  };

  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  const addNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.neighbours = [];
    this.isWall = false;
    if (Math.random(1) < 0) {
      this.isWall = true;
    }

    this.previous = undefined;
    this.addneighbours = function (grid) {
      this.i = this.x;
      this.j = this.y;
      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }

  const gridwithNode = (
    <div>
      {Grid.map((row, rowindex) => {
        return (
          <div key={rowindex} className="rowWrapper">
            {row.map((col, colindex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colindex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowindex}
                  col={colindex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
  const visualizeHortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 10 * i);
    }
  };

  const visualizePath = () => {
    for (let i = 0; i <= visitednodes.length; i++) {
      if (i === visitednodes.length) {
        setTimeout(() => {
          visualizeHortestPath(Path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitednodes[i];
          document.getElementById(`node-${node.x}-${node.y}`).className =
            "node node-visited";
        }, 20 * i);
      }
    }
  };

  console.log(Path);
  return (
    <div className="Wrapper">
      <h1>Searching Algorithm Visualizer</h1>
      <h1>{`Selected Algorithm: ${algo}`}</h1>
      <div className="cont">
        <select value={algo} onChange={(e) => setalgo(e.target.value)}>
          <option>Dijkstra</option>
          <option>A-Stern</option>
          <option>DFS</option>
        </select>
        <button onClick={visualizePath}>Visualize</button>
      </div>
      <button
        onClick={() => {
          window.location.reload(true);
        }}
      >
        re-generate
      </button>
      {gridwithNode}
    </div>
  );
};

export default PathFind;
