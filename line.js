/**
 * Line class
 * @param {Point} startPoint 
 * @param {Point} endPoint 
 * @param {Number} pointSize 
 * @param {Array} color 
 */
function Line(startPoint, endPoint, pointSize, color) {
  this.startPoint = startPoint;
  this.endPoint = endPoint;
  this.pointSize = pointSize;
  this.color = color;
  this.drawn = false;
};

Line.prototype = {
  // Interpolates point size for a point within a line, based on x and y grid coordinates
  interpolatePointSize: function (x, y) {
    // Only 1 point size if start ps === end ps
    if (this.startPoint.ps === this.endPoint.ps) { return this.startPoint.ps; }

    // Calculate point size for x direction
    let xPs = 0;
    if (x !== 0) {
      x += nGridx; // translate x so that x values start at 0 instead of -nGridx
      let xStartRatio = (x / (nGridx * 2));
      let xEndRatio = 1 - xStartRatio;
      xPs = ((xEndRatio * this.startPoint.ps) + (xStartRatio * this.endPoint.ps));
    }

    // Calculate point size for y direction
    let yPs = 0;
    if (y !== 0) {
      y += nGridy; // translate y so that y values start at 0 instead of -nGridy
      let yStartRatio = (y / (nGridy * 2));
      let yEndRatio = 1 - yStartRatio;
      yPs = (yStartRatio * this.endPoint.ps) + (yEndRatio * this.startPoint.ps);
    }

    if (yPs === 0) { yPs = xPs; }
    if (xPs === 0) { xPs = yPs; }

    return (xPs + yPs) / 2;
  },

  // Interpolates point color for a point within a line, based on x and y grid coordinates
  interpolateColor: function (x, y) {
    // If color property was passed into constructor, use it
    if (this.color) {
      return this.color;
    }

    // If start and end are same color, just keep it that way
    if (this.startPoint.c === this.endPoint.c) {
      return this.startPoint.c;
    }

    // Calculate color for x direction
    let xColor;
    if (x !== 0) {
      x += nGridx; // translate x so that x values start at 0 instead of -nGridx
      let xStartRatio = (x / (nGridx * 2));
      let xEndRatio = 1 - xStartRatio;

      const xStartColor = this.startPoint.c.map((cv) => cv * xEndRatio);
      const xEndColor = this.endPoint.c.map((cv) => cv * xStartRatio);
      xColor = [];

      for (let i = 0; i < xStartColor.length; i++) {
        xColor.push((xStartColor[i] + xEndColor[i]));
      }
    }

    // Calculate color for y direction
    let yColor;
    if (y !== 0) {
      y += nGridy; // translate y so that y values start at 0 instead of -nGridy
      let yStartRatio = (y / (nGridy * 2));
      let yEndRatio = 1 - yStartRatio;

      const yStartColor = this.startPoint.c.map((cv) => cv * yEndRatio);
      const yEndColor = this.endPoint.c.map((cv) => cv * yStartRatio);
      yColor = [];

      for (let i = 0; i < yStartColor.length; i++) {
        yColor.push((yStartColor[i] + yEndColor[i]));
      }
    }

    // if either x or y is 0, don't alter color values
    if ((y == 0 || this.startPoint.y === this.endPoint.y) && xColor) { yColor = xColor; }
    if ((x == 0 || this.startPoint.x === this.endPoint.x) && yColor) { xColor = yColor; }

    // Avg of x and y colors
    return [
      (xColor[0] + yColor[0]) / 2,
      (xColor[1] + yColor[1]) / 2,
      (xColor[2] + yColor[2]) / 2
    ];
  },

  // draws a line from the start point to the end point
  draw: function () {
    let dx = Math.abs(this.startPoint.x - this.endPoint.x);
    let dy = Math.abs(this.startPoint.y - this.endPoint.y);

    let steps;
    // multiply by ratio of canvas to grid in order to get proper step size
    dx > dy ? steps = dx * (this.startPoint.w / (GRID_X * 2))
      : steps = dy * (this.startPoint.h / (GRID_Y * 2));
    steps /= 2;

    // Width of steps
    xInc = 0.5 * dx / steps;
    yInc = 0.5 * dy / steps;

    currX = this.startPoint.x;
    currY = this.startPoint.y;

    // Create all points lying on the line
    let points = [];
    for (let i = 0; i < steps * 2; i++) {
      points.push(
        new Point(currX,
          currY,
          this.interpolatePointSize(currX, currY),
          this.interpolateColor(currX, currY)
        )
      );
      currX += xInc;
      currY += yInc;
    }

    // Draw all the points in the line
    points.forEach((p) => { p.draw(); });
    this.drawn = true;
  },
};