// Expect style uses chains such as expect(result).to.equal(value).
const { expect } = require("chai");
const { add, subtract, multiply, divide } = require("../src/mylib");

describe("mylib.js (Expect style)", () => {
  describe("add()", () => {
    it("adds two positive numbers", () => {
      expect(add(6, 3)).to.equal(9);
    });

    it("adds a negative number and a positive number", () => {
      expect(add(-6, 3)).to.equal(-3);
    });

    it("adds decimals within a small rounding tolerance", () => {
      expect(add(0.1, 0.2)).to.be.closeTo(0.3, 1e-12);
    });

    it("rejects a non-number in either input position", () => {
      expect(() => add("6", 3)).to.throw(Error, "Inputs must be numbers");
      expect(() => add(6, "3")).to.throw(Error, "Inputs must be numbers");
    });
  });

  describe("subtract()", () => {
    it("subtracts two positive numbers", () => {
      expect(subtract(6, 3)).to.equal(3);
    });

    it("returns a negative result when the second number is larger", () => {
      expect(subtract(3, 6)).to.equal(-3);
    });

    it("rejects a non-number in either input position", () => {
      expect(() => subtract("6", 3)).to.throw(Error, "Inputs must be numbers");
      expect(() => subtract(6, "3")).to.throw(Error, "Inputs must be numbers");
    });
  });

  describe("multiply()", () => {
    it("multiplies two positive numbers", () => {
      expect(multiply(6, 3)).to.equal(18);
    });

    it("multiplies a negative number by a positive number", () => {
      expect(multiply(-6, 3)).to.equal(-18);
    });

    it("returns zero when multiplying by zero", () => {
      expect(multiply(6, 0)).to.equal(0);
    });

    it("rejects a non-number in either input position", () => {
      expect(() => multiply("6", 3)).to.throw(Error, "Inputs must be numbers");
      expect(() => multiply(6, "3")).to.throw(Error, "Inputs must be numbers");
    });
  });

  describe("divide()", () => {
    it("divides two positive numbers", () => {
      expect(divide(6, 3)).to.equal(2);
    });

    it("returns a decimal result when needed", () => {
      expect(divide(5, 2)).to.equal(2.5);
    });

    it("returns zero when the numerator is zero", () => {
      expect(divide(0, 3)).to.equal(0);
    });

    it("rejects a non-number in either input position", () => {
      expect(() => divide("6", 3)).to.throw(Error, "Inputs must be numbers");
      expect(() => divide(6, "3")).to.throw(Error, "Inputs must be numbers");
    });

    it("throws an error when the divisor is zero", () => {
      expect(() => divide(6, 0)).to.throw(Error, "Cannot divide by zero");
    });
  });
});
