// Assert style uses functions such as assert.strictEqual().
const { assert } = require("chai");
const { add, subtract, multiply, divide } = require("../src/mylib");

describe("mylib.js (Assert style)", () => {
  describe("add()", () => {
    it("adds two positive numbers", () => {
      assert.strictEqual(add(6, 3), 9);
    });

    it("adds a negative number and a positive number", () => {
      assert.strictEqual(add(-6, 3), -3);
    });

    it("adds decimals within a small rounding tolerance", () => {
      assert.closeTo(add(0.1, 0.2), 0.3, 1e-12);
    });

    it("rejects a non-number in either input position", () => {
      assert.throws(() => add("6", 3), Error, "Inputs must be numbers");
      assert.throws(() => add(6, "3"), Error, "Inputs must be numbers");
    });
  });

  describe("subtract()", () => {
    it("subtracts two positive numbers", () => {
      assert.strictEqual(subtract(6, 3), 3);
    });

    it("returns a negative result when the second number is larger", () => {
      assert.strictEqual(subtract(3, 6), -3);
    });

    it("rejects a non-number in either input position", () => {
      assert.throws(() => subtract("6", 3), Error, "Inputs must be numbers");
      assert.throws(() => subtract(6, "3"), Error, "Inputs must be numbers");
    });
  });

  describe("multiply()", () => {
    it("multiplies two positive numbers", () => {
      assert.strictEqual(multiply(6, 3), 18);
    });

    it("multiplies a negative number by a positive number", () => {
      assert.strictEqual(multiply(-6, 3), -18);
    });

    it("returns zero when multiplying by zero", () => {
      assert.strictEqual(multiply(6, 0), 0);
    });

    it("rejects a non-number in either input position", () => {
      assert.throws(() => multiply("6", 3), Error, "Inputs must be numbers");
      assert.throws(() => multiply(6, "3"), Error, "Inputs must be numbers");
    });
  });

  describe("divide()", () => {
    it("divides two positive numbers", () => {
      assert.strictEqual(divide(6, 3), 2);
    });

    it("returns a decimal result when needed", () => {
      assert.strictEqual(divide(5, 2), 2.5);
    });

    it("returns zero when the numerator is zero", () => {
      assert.strictEqual(divide(0, 3), 0);
    });

    it("rejects a non-number in either input position", () => {
      assert.throws(() => divide("6", 3), Error, "Inputs must be numbers");
      assert.throws(() => divide(6, "3"), Error, "Inputs must be numbers");
    });

    it("throws an error when the divisor is zero", () => {
      assert.throws(() => divide(6, 0), Error, "Cannot divide by zero");
    });
  });
});
