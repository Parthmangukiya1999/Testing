const mylib = require("./mylib");

const a = 6;
const b = 3;

console.log("Arithmetic examples");
console.log(`${a} + ${b} = ${mylib.add(a, b)}`);
console.log(`${a} - ${b} = ${mylib.subtract(a, b)}`);
console.log(`${a} * ${b} = ${mylib.multiply(a, b)}`);
console.log(`${a} / ${b} = ${mylib.divide(a, b)}`);
