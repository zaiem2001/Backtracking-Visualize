import { DELAY_TIME } from "./constants.js";

export const applyStyles = (element, styles) => {
  for (const style in styles) {
    element.style[style] = styles[style];
  }
};

export const delay = () =>
  new Promise((resolve) => setTimeout(resolve, DELAY_TIME));

export const generateRandomMaze = (n) => {
  if (n > 7) {
    n = 7;
  }

  let maze = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  maze[0][0] = 1;
  maze[n - 1][n - 1] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!(i === 0 && j === 0) && !(i === n - 1 && j === n - 1)) {
        maze[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }
  }

  return maze;
};
