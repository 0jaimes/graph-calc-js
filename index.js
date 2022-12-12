const onFunctionSubmit = (funcName, funcForm) => {
    let xRange = [];
    for (let i = -GRID_X; i <= GRID_X; i += 0.01) {
        xRange.push(i);
    }

    let randColorIndx = Math.floor(Math.random() * colors.length);

    let yList = eval(`[${xRange}].map(x => ${document[funcForm][funcName].value})`);

    for (let i = 0; i < yList.length; i += 2) {
        let p1 = new Point(xRange[i], yList[i], DEFAULT_LINE_SIZE);
        let p2 = new Point(xRange[i + 1], yList[i + 1], DEFAULT_LINE_SIZE);

        let line = new Line(p1, p2, DEFAULT_LINE_SIZE, colors[randColorIndx]);
        line.draw();
    }
};

let funcCount = 1;


const addFunction = (e) => {
    let list = document.getElementById('funcList');
    let previousFunctions = {};

    for (let i = 0; i < funcCount; i++) {
        console.log(document[`funcForm${i + 1}`][`func${i + 1}`].value);
        previousFunctions[`${i + 1}`] = (document[`funcForm${i + 1}`][`func${i + 1}`].value);
    }

    list.innerHTML = list.innerHTML + `
    <li class="list-group-item">
        <form name="funcForm${funcCount + 1}">
        <input class="form-control" name="func${funcCount + 1}" type="text" placeholder="x**2">
        <button class="btn btn-warning w-25" type="button" onClick="onFunctionSubmit('func${funcCount + 1}', 'funcForm${funcCount + 1}')">Graph</button>
        </form>
    </li>
    `;

    for (let i = 0; i < funcCount; i++) {
        document[`funcForm${i + 1}`][`func${i + 1}`].value = previousFunctions[`${i + 1}`];
    }

    funcCount += 1;
};

const clear = () => {
    GL.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    drawGrid(1.25, black, GRID_X, GRID_Y);
};