import { delay } from "./utils.js";
import {
  removeRat,
  updateMazeDisplay,
  updatePathDisplay,
  updateStackDisplay,
} from "./display.js";

const messageEle = document.querySelector(".message");
const noPathEle = document.querySelector(".no_path");
const solveBtn = document.getElementById("solve");
const resetMazeBtn = document.getElementById("reset");

export const solveMaze = async (maze) => {
  let result = [];
  let visited = Array(maze.length)
    .fill(0)
    .map(() => Array(maze.length).fill(0));

  let stack = [];
  messageEle.innerHTML = "Solving the maze...";

  dfs(0, 0, maze.length, "", result, visited, maze, stack).then(() => {
    if (result.length === 0) {
      noPathEle.innerHTML = "No path found!";
    }

    solveBtn.disabled = false;
    resetMazeBtn.disabled = false;
    messageEle.innerHTML = "";

    solveBtn.innerHTML = "Restart";
    return result;
  });
};

const dfs = async (row, col, n, path, result, visited, maze, stack) => {
  if (row === n - 1 && col === n - 1) {
    result.push(path);
    updateStackDisplay([]);
    messageEle.innerHTML = "Path found!";
    updatePathDisplay(result);
    return;
  }

  if (
    row < 0 ||
    col < 0 ||
    row >= n ||
    col >= n ||
    visited[row][col] === 1 ||
    maze[row][col] === 0
  ) {
    return;
  }

  visited[row][col] = 1;
  stack.push({ row, col, path });
  updateStackDisplay(stack);
  updateMazeDisplay(row, col);
  await delay();

  await dfs(row + 1, col, n, path + "D", result, visited, maze, stack);
  await dfs(row, col - 1, n, path + "L", result, visited, maze, stack);
  await dfs(row, col + 1, n, path + "R", result, visited, maze, stack);
  await dfs(row - 1, col, n, path + "U", result, visited, maze, stack);

  visited[row][col] = 0;
  stack.pop();
  updateStackDisplay(stack);
  removeRat(row, col);
  await delay();
};
