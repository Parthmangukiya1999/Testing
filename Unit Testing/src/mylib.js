/**
 * Checks that both inputs have JavaScript's number type.
 * This type check also accepts NaN and Infinity.
 * @param {number} a - The first input.
 * @param {number} b - The second input.
 * @throws {Error} If either input is not a number.
 */
function validateNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Inputs must be numbers");
  }
}

/**
 * Adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 * @throws {Error} If either input is not a number.
 */
function add(a, b) {
  validateNumbers(a, b);
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a - The number to subtract from.
 * @param {number} b - The number to subtract.
 * @returns {number} The difference between the two numbers.
 * @throws {Error} If either input is not a number.
 */
function subtract(a, b) {
  validateNumbers(a, b);
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The product of the two numbers.
 * @throws {Error} If either input is not a number.
 */
function multiply(a, b) {
  validateNumbers(a, b);
  return a * b;
}

/**
 * Divides the first number by the second.
 * @param {number} a - The number to divide.
 * @param {number} b - The divisor.
 * @returns {number} The quotient of the two numbers.
 * @throws {Error} If either input is not a number or the divisor is zero.
 */
function divide(a, b) {
  validateNumbers(a, b);

  // Stop before dividing if the divisor is zero.
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

// Make the four functions available to other files.
module.exports = { add, subtract, multiply, divide };