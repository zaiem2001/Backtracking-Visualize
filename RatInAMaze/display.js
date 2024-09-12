import { COMMON_STYLES } from "./constants.js";
import { applyStyles } from "./utils.js";

const mazeDiv = document.getElementById("maze");

export const updateMazeDisplay = (row, col) => {
  const ratCell = document.querySelector(`.cell-${row}-${col}`);
  ratCell.classList.add("rat");
  applyStyles(ratCell, {
    backgroundImage: "url('./assets/rat.png')",
    ...COMMON_STYLES,
  });
};

export const removeRat = (row, col) => {
  const ratCell = document.querySelector(`.cell-${row}-${col}`);
  ratCell.classList.remove("rat");
  ratCell.style.backgroundImage = "";
};

export const updateStackDisplay = (stack) => {
  const stackDiv = document.querySelector(".stack");
  stackDiv.innerHTML = "";

  stack.forEach((stackItem, indx) => {
    const stackItemEle = document.createElement("div");
    stackItemEle.innerHTML = `dfs(${stackItem.row}, ${stackItem.col}, "${stackItem.path}")`;
    stackItemEle.classList.add("stackItem");
    stackDiv.appendChild(stackItemEle);
  });
};

export const updatePathDisplay = (result) => {
  const pathsContainer = document.querySelector(".paths");
  pathsContainer.innerHTML = "";

  result.forEach((path, indx) => {
    const pathEle = document.createElement("div");
    pathEle.innerHTML = path;
    pathEle.classList.add("path-card");
    pathEle.id = `path${indx + 1}`;
    pathsContainer.appendChild(pathEle);
  });
};

export const renderMaze = (maze) => {
  mazeDiv.innerHTML = "";

  maze.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellDiv = document.createElement("div");

      mazeDiv.style.gridTemplateColumns = `repeat(${maze.length}, 50px)`;
      mazeDiv.style.gridTemplateRows = `repeat(${maze.length}, 50px)`;

      cellDiv.classList.add("cell");
      cellDiv.classList.add(`cell-${rowIndex}-${cellIndex}`);
      cellDiv.style.transition = "background-image 0.5s";

      if (cell === 0) {
        cellDiv.classList.add("wall");
      }

      if (rowIndex === maze.length - 1 && cellIndex === maze.length - 1) {
        cellDiv.classList.add("cheese");
        applyStyles(cellDiv, {
          backgroundImage: "url('./assets/cheese.png')",
          ...COMMON_STYLES,
        });
      }

      if (rowIndex === 0 && cellIndex === 0) {
        cellDiv.classList.add("rat");
        applyStyles(cellDiv, {
          backgroundImage: "url('./assets/rat.png')",
          ...COMMON_STYLES,
        });
      }

      mazeDiv.appendChild(cellDiv);
    });
  });
};
