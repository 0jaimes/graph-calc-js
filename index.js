const onFunctionSubmit = (e) => {
    let xRange = [];
    for (let i = -GRID_X; i <= GRID_X; i += 0.01) {
        xRange.push(i);
    }

    let randColorIndx = Math.floor(Math.random() * colors.length);

    let yList = eval(`[${xRange}].map(x => ${document.funcForm.func.value})`);

    for (let i = 0; i < yList.length; i += 2) {
        let p1 = new Point(xRange[i], yList[i], DEFAULT_LINE_SIZE);
        let p2 = new Point(xRange[i + 1], yList[i + 1], DEFAULT_LINE_SIZE);

        let line = new Line(p1, p2, DEFAULT_LINE_SIZE, colors[randColorIndx]);
        line.draw();
    }
};

const addFunction = (e) => {
    let list = document.getElementById('funcList');
    list.innerHTML += `
    <li class="list-group-item">
        <form name="funcForm">
        <input class="form-control" name="func" type="text" value="x**2">
        <button class="btn btn-warning w-25" type="button" onClick="onFunctionSubmit()">Graph Function</button>
        </form>
    </li>
    `;
};

const clear = () => {
    GL.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    drawGrid(1.25, black, GRID_X, GRID_Y);
};