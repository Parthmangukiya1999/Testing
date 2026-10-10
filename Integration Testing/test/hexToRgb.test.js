const { expect } = require("chai");
const hexToRgb = require("../src/hexToRgb");

/**
 * Unit tests call the library directly, without Express or HTTP requests.
 * They check exact RGB values, supported formats and input validation.
 */
describe("Unit tests - hexToRgb", function () {
  it("should convert red correctly", function () {
    expect(hexToRgb("#FF0000")).to.deep.equal({ r: 255, g: 0, b: 0 });
  });

  it("should convert green correctly", function () {
    expect(hexToRgb("#00FF00")).to.deep.equal({ r: 0, g: 255, b: 0 });
  });

  it("should convert blue correctly", function () {
    expect(hexToRgb("#0000FF")).to.deep.equal({ r: 0, g: 0, b: 255 });
  });

  it("should convert a mixed colour correctly", function () {
    expect(hexToRgb("#FF5733")).to.deep.equal({ r: 255, g: 87, b: 51 });
  });

  it("should accept hexadecimal values without #", function () {
    expect(hexToRgb("FF5733")).to.deep.equal({ r: 255, g: 87, b: 51 });
  });

  it("should accept lower-case hexadecimal letters", function () {
    expect(hexToRgb("#ff5733")).to.deep.equal({ r: 255, g: 87, b: 51 });
  });

  it("should convert black to the minimum channel values", function () {
    expect(hexToRgb("#000000")).to.deep.equal({ r: 0, g: 0, b: 0 });
  });

  it("should convert white to the maximum channel values", function () {
    expect(hexToRgb("#FFFFFF")).to.deep.equal({ r: 255, g: 255, b: 255 });
  });

  it("should reject invalid hexadecimal characters", function () {
    expect(() => hexToRgb("#GGGGGG")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  it("should reject hexadecimal values that are too short", function () {
    expect(() => hexToRgb("#12345")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  it("should reject hexadecimal values that are too long", function () {
    expect(() => hexToRgb("#1234567")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  it("should reject an empty string", function () {
    expect(() => hexToRgb("")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  // Regression tests for the misplaced-hash validation bug.
  it("should reject # in the middle of a hexadecimal value", function () {
    expect(() => hexToRgb("FF#5733")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  it("should reject # at the end of a hexadecimal value", function () {
    expect(() => hexToRgb("FF5733#")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  it("should reject more than one leading #", function () {
    expect(() => hexToRgb("##FF5733")).to.throw(
      Error, "Invalid hexadecimal colour"
    );
  });

  // Each entry creates a separate test for a non-string input.
  const nonStringInputs = [
    { name: "a number", value: 123456 },
    { name: "null", value: null },
    { name: "undefined", value: undefined },
    { name: "an object", value: { hex: "FF5733" } },
    { name: "an array", value: ["FF5733"] }
  ];

  nonStringInputs.forEach(({ name, value }) => {
    it(`should reject ${name}`, function () {
      expect(() => hexToRgb(value)).to.throw(
        Error, "Hex value must be a string"
      );
    });
  });
});
