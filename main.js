// Globals
const GRID_X            = 20;
const GRID_Y            = 20;
const DEFAULT_LINE_SIZE = 5;
const CANVAS            = document.getElementById('main-canvas');
const GL                = getWebGLContext(CANVAS, { preserveDrawingBuffer: true });

// Color constants
const red    = [1.0, 0.0, 0.0];
const green  = [0.0, 1.0, 0.0];
const purple = [1.0, 0.0, 1.0];
const blue   = [0.0, 0.0, 1.0];
const cyan   = [0.0, 1.0, 1.0];
const black  = [0.0, 0.0, 0.0];
const colors = [red, green, purple, blue, cyan, black];


var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute float a_PointSize;
  varying vec4 color;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
    color = a_Color;
  }
`;

var FSHADER_SOURCE = `
  precision mediump float; // This is required
  varying vec4 color;
  void main() {
    gl_FragColor = color;
  }
`;


function main() {
  const parent = CANVAS.parentNode,
    styles = getComputedStyle(parent),
    w = parseInt(styles.getPropertyValue("width"), 10) - 15,
    h = parseInt(styles.getPropertyValue("height"), 10);

  CANVAS.style.width = `${w}px`;
  CANVAS.style.height = `${h}px`;

  if (!initShaders(GL, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.');
    return;
  }

  GL.clearColor(1.0, 1.0, 1.0, 1.0);
  GL.clear(GL.COLOR_BUFFER_BIT);


  // Initialize by drawing the grid onto the canvas
  drawGrid(1.25, black, GRID_X, GRID_Y);
}


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
