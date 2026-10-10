// should() adds the .should assertion property to Object.prototype.
const chai = require("chai");
chai.should();
const { add, subtract, multiply, divide } = require("../src/mylib");

describe("mylib.js (Should style)", () => {
  describe("add()", () => {
    it("adds two positive numbers", () => {
      add(6, 3).should.equal(9);
    });

    it("adds a negative number and a positive number", () => {
      add(-6, 3).should.equal(-3);
    });

    it("adds decimals within a small rounding tolerance", () => {
      add(0.1, 0.2).should.be.closeTo(0.3, 1e-12);
    });

    it("rejects a non-number in either input position", () => {
      (() => add("6", 3)).should.throw(Error, "Inputs must be numbers");
      (() => add(6, "3")).should.throw(Error, "Inputs must be numbers");
    });
  });

  describe("subtract()", () => {
    it("subtracts two positive numbers", () => {
      subtract(6, 3).should.equal(3);
    });

    it("returns a negative result when the second number is larger", () => {
      subtract(3, 6).should.equal(-3);
    });

    it("rejects a non-number in either input position", () => {
      (() => subtract("6", 3)).should.throw(Error, "Inputs must be numbers");
      (() => subtract(6, "3")).should.throw(Error, "Inputs must be numbers");
    });
  });

  describe("multiply()", () => {
    it("multiplies two positive numbers", () => {
      multiply(6, 3).should.equal(18);
    });

    it("multiplies a negative number by a positive number", () => {
      multiply(-6, 3).should.equal(-18);
    });

    it("returns zero when multiplying by zero", () => {
      multiply(6, 0).should.equal(0);
    });

    it("rejects a non-number in either input position", () => {
      (() => multiply("6", 3)).should.throw(Error, "Inputs must be numbers");
      (() => multiply(6, "3")).should.throw(Error, "Inputs must be numbers");
    });
  });

  describe("divide()", () => {
    it("divides two positive numbers", () => {
      divide(6, 3).should.equal(2);
    });

    it("returns a decimal result when needed", () => {
      divide(5, 2).should.equal(2.5);
    });

    it("returns zero when the numerator is zero", () => {
      divide(0, 3).should.equal(0);
    });

    it("rejects a non-number in either input position", () => {
      (() => divide("6", 3)).should.throw(Error, "Inputs must be numbers");
      (() => divide(6, "3")).should.throw(Error, "Inputs must be numbers");
    });

    it("throws an error when the divisor is zero", () => {
      (() => divide(6, 0)).should.throw(Error, "Cannot divide by zero");
    });
  });
});
