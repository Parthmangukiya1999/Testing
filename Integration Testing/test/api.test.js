const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/server");

/**
 * Integration tests send HTTP requests to the Express app with Supertest.
 * They use the real conversion library and check the JSON content type,
 * HTTP status and complete response body. Each table entry is one test.
 */
describe("Integration tests - Hex to RGB API", function () {
  const validCases = [
    {
      name: "a mixed colour",
      input: "FF5733",
      expected: { hex: "#FF5733", rgb: { r: 255, g: 87, b: 51 } }
    },
    {
      name: "blue",
      input: "0000FF",
      expected: { hex: "#0000FF", rgb: { r: 0, g: 0, b: 255 } }
    },
    {
      name: "a colour with lower-case letters",
      input: "ff5733",
      expected: { hex: "#ff5733", rgb: { r: 255, g: 87, b: 51 } }
    },
    {
      name: "black",
      input: "000000",
      expected: { hex: "#000000", rgb: { r: 0, g: 0, b: 0 } }
    },
    {
      name: "white",
      input: "FFFFFF",
      expected: { hex: "#FFFFFF", rgb: { r: 255, g: 255, b: 255 } }
    },
    {
      name: "a colour with an encoded leading #",
      input: "#FF5733",
      expected: { hex: "#FF5733", rgb: { r: 255, g: 87, b: 51 } }
    }
  ];

  validCases.forEach(({ name, input, expected }) => {
    it(`should return 200 and the correct RGB values for ${name}`, async function () {
      // Encode # as %23 so it is sent as part of the URL path.
      const response = await request(app)
        .get(`/api/convert/${encodeURIComponent(input)}`)
        .expect("Content-Type", /json/);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(expected);
    });
  });

  const invalidCases = [
    { name: "invalid hexadecimal characters", input: "GGGGGG" },
    { name: "a value that is too short", input: "12345" },
    { name: "a value that is too long", input: "1234567" },
    { name: "# in the middle of a value", input: "FF#5733" },
    { name: "# at the end of a value", input: "FF5733#" }
  ];

  invalidCases.forEach(({ name, input }) => {
    it(`should return 400 and a JSON error for ${name}`, async function () {
      const response = await request(app)
        .get(`/api/convert/${encodeURIComponent(input)}`)
        .expect("Content-Type", /json/);

      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        error: "Invalid hexadecimal colour"
      });
    });
  });
});
