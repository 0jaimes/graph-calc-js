let funcCount = 1;  // Total functions counter

// yo shoutout @chatGPT for this piece of absolute fuego 🔥
function createFunctionFromEquation(equation) {
  equation = equation.replace(/x/g, 'arguments[0]');
  equation = `return ${equation};`;
  return new Function(equation);
}

const onFunctionSubmit = (funcName, funcForm) => {
  let xRange = [];
  for (let i = -GRID_X; i <= GRID_X; i += 0.01) {
    xRange.push(i);
  }

  let randColorIndx = Math.floor(Math.random() * colors.length);

  let exprr = document[funcForm][funcName].value;
  if (!exprr) {
    alert('Please provide a function');
    return;
  }

  try {
    // Sketch js suff. Start.
    let graphFunc = createFunctionFromEquation(exprr);
    let yList = xRange.map((x) => graphFunc(x));
    // Sketch js suff. Done.

    for (let i = 0; i < yList.length; i += 2) {
      let p1 = new Point(xRange[i], yList[i], DEFAULT_LINE_SIZE);
      let p2 = new Point(xRange[i + 1], yList[i + 1], DEFAULT_LINE_SIZE);

      let line = new Line(p1, p2, DEFAULT_LINE_SIZE, colors[randColorIndx]);
      line.draw();
    }
  } catch (e) {
    alert(e);
  }
};

const onClear = () => {
  GL.clear(GL.DEPTH_BUFFER_BIT);
  GL.clear(GL.DEPTH_BUFFER_BIT | GL.COLOR_BUFFER_BIT);

   // reinitialize by drawing the grid onto the canvas
   drawGrid(1.25, black, GRID_X, GRID_Y);
};

const onAddFunction = () => {
  let list = document.getElementById('funcList');
  let previousFunctions = {};

  // Store the values of the previously defined function definition fields
  for (let i = 0; i < funcCount; i++) {
    previousFunctions[`${i + 1}`] = (document[`funcForm${i + 1}`][`func${i + 1}`].value);
  }

  list.innerHTML = list.innerHTML + `
    <li class="list-group-item">
        <form name="funcForm${funcCount + 1}">
        <input class="form-control" name="func${funcCount + 1}" type="text" placeholder="x**2">
        <button class="btn btn-info w-25 mt-2" type="button" onClick="onFunctionSubmit('func${funcCount + 1}', 'funcForm${funcCount + 1}')">Graph</button>
        </form>
    </li>
    `;

  // Restore the values of the previously defined function definition fields
  for (let i = 0; i < funcCount; i++) {
    document[`funcForm${i + 1}`][`func${i + 1}`].value = previousFunctions[`${i + 1}`];
  }

  funcCount += 1;
};