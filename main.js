// Globals
const GRID_X = 20;
const GRID_Y = 20;
const DEFAULT_LINE_SIZE = 5;
const CANVAS = document.getElementById('main-canvas');
const GL = getWebGLContext(CANVAS, { preserveDrawingBuffer: true });


// Color constants
const red = [1.0, 0.0, 0.0];
const green = [0.0, 1.0, 0.0];
const purple = [1.0, 0.0, 1.0];
const blue = [0.0, 0.0, 1.0];
const cyan = [0.0, 1.0, 1.0];
const black = [0.0, 0.0, 0.0];
const colors = [red, green, purple, blue, cyan, black];

let LINES = [];

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


  drawGrid(1.25, black, GRID_X, GRID_Y);

}

const drawLines = () => {
  LINES.forEach((l) => { if (!l.drawn) l.draw() });
}

const drawFunction = (func, color) => {
  let xRange = [];
  for (let i = -GRID_X; i <= GRID_X; i += 0.01) {
    xRange.push(i);
  }

  let sinXList = func(xRange);

  for (let i = 0; i < sinXList.length; i += 2) {
    let p1 = new Point(xRange[i], sinXList[i], DEFAULT_LINE_SIZE);
    let p2 = new Point(xRange[i + 1], sinXList[i + 1], DEFAULT_LINE_SIZE);

    let line = new Line(p1, p2, DEFAULT_LINE_SIZE, color);
    line.draw();
  }
}

function initArrayBuffer(gl, data, num, type, attribute) {
  let buffer = gl.createBuffer(); // create buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Write data into buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  let a_attribute = gl.getAttribLocation(gl.program, attribute);

  if (a_attribute < 0) {
    console.log('Failed to get attribute location');
    return -1;
  }

  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);

  return true;
}
