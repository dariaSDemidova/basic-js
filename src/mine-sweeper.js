const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  const getNeighbors = (row, col) => {
    let minesCount = 0;

    for (let dr of [-1, 0, 1]) {
      for (let dc of [-1, 0, 1]) {
        if (dr === 0 && dc === 0) continue;

        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (matrix[newRow][newCol]) minesCount++;
        }
      }
    }

    return minesCount;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result[row][col] = getNeighbors(row, col);
    }
  }

  return result;
}

module.exports = {
  minesweeper,
};
