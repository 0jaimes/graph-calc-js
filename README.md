#### Assignment #1
##### Author: Oscar Jaimes
##### Date: September 17th, 2022


##### Files
1. index.html - The main HTML holding the canvas and JS imports
2. main.js - The entry point to the JS files. Contains main() function
3. point.js - Contains Point class
4. line.js - Contains Line class
5. grid.js - Contains drawGrid() function


##### Point Class (point.js)
- Constructor - new Point(x, y, ps, c, w, h)
- draw() - Used to draw a point to the screen
- gridToCanvas(gridX, gridY) - Converts grid coordinates to canvas coordinates
- canvasToGrid(canvasX, canvasY) - Converts canvas coordinates to grid coordinates
- canvasToGL(canvasX, canvasY) - Converts canvas coordinates to GL coordinates
- glToCanvas(glX, glY) - Converts GL coordinates to canvas coordinates
- gridToGL(gridX, gridY) - Converts grid coordinates to GL coordinates (This function is used in Point.draw() in order to translate grid coordinates to GL coordinates)
- glToGrid(glX, glY) - Converts GL coordinates to grid coordinates

##### Line Class (line.js)
- Constructor - new Line(startPoint, endPoint, pointSize, color)
- draw() - Used to draw a line on the screen
- interpolatePointSize(x, y) - Chooses a point size for the current point on the line based on the distance from the start and end point. Used in Line.draw()
- interpolateColor(x, y) - Chooses a color for the current point on the line based on the distance from the start and end points. Used in Line.draw()

##### Draw Grid (grid.js)
- drawGrid(pointSize, color) - Draws a grid to the screen (based on nGridX and nGridY)