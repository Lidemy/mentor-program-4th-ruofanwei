/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
const findTheWinner = (squares, x, y) => {
  if (x === null || y === null) return;
  // find out is black or white
  const blackOrWhite = squares[y][x];
  let winner;
  // calculate same color chesses in a row
  const countTotal = (blackOrWhite, x, y, directionX, directionY) => {
    let chessInRow = 0;
    let nextX = x;
    let nextY = y;

    while (chessInRow < 5) {
      nextX += directionX;
      nextY += directionY;
      if (
        nextX < 0
        || nextX >= 19
        || nextY < 0
        || nextY >= 19
        || squares[nextY][nextX] !== blackOrWhite
      ) break;
      chessInRow++;
    }
    return chessInRow;
  };
  // if 4 chesses in a row : winner

  if (
    countTotal(blackOrWhite, x, y, 1, 0)
      + countTotal(blackOrWhite, x, y, -1, 0)
      >= 4
    || countTotal(blackOrWhite, x, y, 0, 1)
      + countTotal(blackOrWhite, x, y, 0, -1)
      >= 4
    || countTotal(blackOrWhite, x, y, 1, 1)
      + countTotal(blackOrWhite, x, y, -1, -1)
      >= 4
    || countTotal(blackOrWhite, x, y, -1, 1)
      + countTotal(blackOrWhite, x, y, 1, -1)
      >= 4
  ) {
    winner = blackOrWhite;
    console.log(winner);
  }
  console.log(winner);
  return winner;
};

export default findTheWinner;
