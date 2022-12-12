/**
 * Point class
 * @param {Number} x x position on grid
 * @param {Number} y y position on grid
 * @param {Number} ps point size
 * @param {Arrau} c color
 * @param {Number} w canvas width
 * @param {Number} h canvas height
 */
function Point(x, y, ps = 1, c = 'white', w = 1200, h = 1000) {
  this.x = x;
  this.y = y;
  this.ps = ps;
  this.c = c;
  this.w = w;
  this.h = h;
};

Point.prototype = {
  /**
   * Draws a point with given color and pointsize at pre-specified position
   */
  draw: function () {
    // Get the storage location of attribute variables
    var a_Position = GL.getAttribLocation(GL.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
    }

    var a_Color = GL.getAttribLocation(GL.program, 'a_Color');
    if (a_Color < 0) {
      console.log('Failed to get the storage location of a_Color');
      return;
    }

    var a_PointSize = GL.getAttribLocation(GL.program, 'a_PointSize');
    if (a_PointSize < 0) {
      console.log('Failed to get the storage location of a_PointSize');
      return;
    }

    // Get gl coordinates
    let glCoords = this.gridToGl(this.x, this.y);

    // Pass vertex position to attribute variable
    GL.vertexAttrib4f(a_Position, glCoords[0], glCoords[1], 0.0, 1);

    // Pass vertex color to attribute variable
    GL.vertexAttrib4f(a_Color, this.c[0], this.c[1], this.c[2], 1);

    // Pass vertext point size to attribute variables
    GL.vertexAttrib1f(a_PointSize, this.ps);

    // Draw point
    GL.drawArrays(GL.POINTS, 0, 1);
  },

  // convert from the grid coordinates to the canvas coordinates
  gridToCanvas: function (gridX, gridY) {
    let canvasX = (gridX + GRID_X) / (GRID_X * 2) * this.w;
    let canvasY = (gridY + GRID_Y) / (GRID_Y * 2) * this.h;
    return [canvasX, canvasY];
  },

  // convert from the canvas coordinates to the grid coordinates
  canvasToGrid: function (canvasX, canvasY) {
    let gridX = ((canvasX / this.w) * (GRID_X * 2)) - GRID_X;
    let gridY = ((canvasY / this.h) * (GRID_Y * 2)) - nGridy;
    return [gridX, gridY];
  },

  // convert from the canvas coordinates to the GL coordinates
  canvasToGL: function (canvasX, canvasY) {
    let [gridX, gridY] = this.canvasToGrid(canvasX, canvasY);
    let [glX, glY] = this.gridToGl(gridX, gridY);
    return [glX, glY];
  },

  // convert from the GL coordinates to the canvas coordinates
  glToCanvas: function (glX, glY) {
    let [gridX, gridY] = this.glToGrid(glX, glY);
    let [canvasX, canvasY] = this.gridToCanvas(gridX, gridY);
    return [canvasX, canvasY];
  },

  // convert from the grid coordinates to the GL coordinates
  gridToGl: function (gridX, gridY) {
    let glX = (gridX / GRID_X);
    let glY = (gridY / GRID_Y);
    return [glX, glY];
  },

  // convert from the GL coordinates to the grid coordinates
  glToGrid: function (glX, glY) {
    let gridX = glX * nGridx;
    let gridY = glY * nGridy;
    return [gridX, gridY];
  }
};