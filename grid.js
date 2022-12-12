/**
 * Draws a grid to the screen based on nGridx and nGridy
 * 
 * @param {Number} ps point size of the lines making up the grid
 * @param {Array} c colour of the grid lines 
 */
function drawGrid(ps, c, startX, startY) {
  const endX = -startX;
  const endY = -startY;

  const gridLines = [];

  // Create the column lines
  for (let col = 0; col <= GRID_X * 2; col++) {
    const colX = col - GRID_X;
    const startPoint = new Point(colX, endY, ps, c);
    const endPoint = new Point(colX, startY, ps, c);
    const l = new Line(startPoint, endPoint, ps, c);
    gridLines.push(l);
  }

  // Create the row lines
  for (let row = 0; row <= GRID_Y * 2; row++) {
    const rowY = row - GRID_Y;
    const endPoint = new Point(startX, rowY, ps, c);
    const startPoint = new Point(endX, rowY, ps, c);
    const l = new Line(startPoint, endPoint, ps, c);
    gridLines.push(l);
  }

  // Draw the grid
  gridLines.forEach((l) => l.draw());
}