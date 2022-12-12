/**
* Functions for mapping list of numbers
*/
const x_squared = (xList) => xList.map((x) => x ** 2);
const sin_x     = (xList) => xList.map((x) => Math.sin(x));
const cos_x     = (xList) => xList.map((x) => Math.cos(x));
const tan_x     = (xList) => xList.map((x) => Math.tan(x));
const func_x    = (xList, funcX) => xList.map((x) => funcX(x));