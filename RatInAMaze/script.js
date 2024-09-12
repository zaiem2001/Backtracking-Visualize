import { generateRandomMaze } from "./utils.js";
import { renderMaze, updatePathDisplay } from "./display.js";
import { solveMaze } from "./solveMaze.js";
import { setDelay } from "./constants.js";

const solveBtn = document.getElementById("solve");
const resetMazeBtn = document.getElementById("reset");
const delayBtn = document.getElementById("delay");
const delayValueElem = document.getElementById("delayValue");
const noPathEle = document.querySelector(".no_path");

// const MAZE = [
//   [1, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0],
//   [0, 1, 1, 1, 0],
//   [1, 1, 1, 0, 0],
//   [0, 0, 1, 1, 1],
// ];

let MAZE = generateRandomMaze(5);

// inpur for delay range button type
delayBtn.addEventListener("change", (e) => {
  const value = parseInt(e.target.value) || 0;
  console.log({ value });

  delayValueElem.innerHTML = value + "ms";

  setDelay(value);
});

resetMazeBtn.addEventListener("click", () => {
  MAZE = generateRandomMaze(5);
  renderMaze(MAZE);
  updatePathDisplay([]);
  solveBtn.disabled = false;
  solveBtn.innerHTML = "Solve";
  noPathEle.innerHTML = "";
});

solveBtn.addEventListener("click", () => {
  solveBtn.disabled = true;
  resetMazeBtn.disabled = true;
  noPathEle.innerHTML = "";

  solveBtn.innerHTML = "Solving...";

  solveMaze(MAZE).then(() => {
    updatePathDisplay([]);
  });
});

renderMaze(MAZE);
