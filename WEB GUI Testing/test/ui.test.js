/*
 * File: test/ui.test.js
 * Purpose: Test colour conversions, input validation and colour
 * preview behaviour using Selenium WebDriver and Mocha.
 */

"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { Builder, By, until } = require("selenium-webdriver");

const applicationUrl = pathToFileURL(
  path.resolve(__dirname, "..", "index.html")
).href;

describe("Colour Converter - Selenium UI tests", function () {
  this.timeout(60000);

  let driver;

  const hexErrorMessage =
    "Enter exactly six hexadecimal digits (0–9, A–F), with an optional #.";

  const rgbErrorMessage =
    "RGB values must be whole numbers from 0 to 255.";

  // Open Chrome before running the suite.
  before(async function () {
    this.timeout(120000);

    driver = await new Builder()
      .forBrowser("chrome")
      .build();

    await driver.manage().window().setRect({
      width: 1100,
      height: 900
    });
  });

  // Start each test with a freshly loaded page.
  beforeEach(async function () {
    await driver.get(applicationUrl);

    await driver.wait(
      until.elementLocated(By.id("hex-input")),
      10000
    );
  });

  // Close Chrome even when a test fails.
  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  // Clear an input and enter a value, unless it should stay empty.
  async function fillInput(id, value) {
    const input = await driver.findElement(By.id(id));

    await input.clear();

    if (value !== "") {
      await input.sendKeys(String(value));
    }
  }

  async function submitHex(value) {
    await fillInput("hex-input", value);

    await driver
      .findElement(By.id("hex-convert-button"))
      .click();
  }

  async function submitRgb(red, green, blue) {
    await fillInput("red-input", red);
    await fillInput("green-input", green);
    await fillInput("blue-input", blue);

    await driver
      .findElement(By.id("rgb-convert-button"))
      .click();
  }

  // Wait for the expected visible message and verify it.
  async function expectText(id, expected) {
    const element = await driver.findElement(By.id(id));

    await driver.wait(
      async () => (await element.getText()) === expected,
      5000,
      `Expected "${expected}" in #${id}`
    );

    assert.equal(await element.getText(), expected);
  }

  async function expectEmpty(id) {
    const element = await driver.findElement(By.id(id));

    assert.equal(await element.getText(), "");
  }

  // Accept either RGB or RGBA formatting for opaque colours.
  async function expectPreviewColour(r, g, b) {
    const preview = await driver.findElement(
      By.id("colour-preview")
    );

    const actual = (
      await preview.getCssValue("background-color")
    ).replace(/\s+/g, "");

    const accepted = [
      `rgb(${r},${g},${b})`,
      `rgba(${r},${g},${b},1)`
    ];

    assert.ok(
      accepted.includes(actual),
      `Expected preview RGB ${r}, ${g}, ${b}; received ${actual}`
    );

    assert.equal(await preview.isDisplayed(), true);
  }

  async function expectClearedPreview() {
    const preview = await driver.findElement(
      By.id("colour-preview")
    );

    const actual = (
      await preview.getCssValue("background-color")
    ).replace(/\s+/g, "");

    assert.ok(
      actual === "rgba(0,0,0,0)" || actual === "transparent",
      `Expected a transparent preview; received ${actual}`
    );

    await expectText(
      "preview-text",
      "No valid colour to preview."
    );
  }

  it("UI01: converts hexadecimal to RGB", async function () {
    await submitHex("#FF5733");

    await expectText("hex-result", "RGB: 255, 87, 51");
    await expectEmpty("hex-error");
  });

  it("UI02: accepts lowercase hex without #", async function () {
    await submitHex("ff5733");

    await expectText("hex-result", "RGB: 255, 87, 51");
    await expectEmpty("hex-error");
  });

  it("UI03: converts RGB to hexadecimal", async function () {
    await submitRgb(255, 87, 51);

    await expectText("rgb-result", "HEX: #FF5733");
    await expectEmpty("rgb-error");
  });

  it("UI04: accepts zero for all RGB channels", async function () {
    await submitRgb(0, 0, 0);

    await expectText("rgb-result", "HEX: #000000");
    await expectEmpty("rgb-error");
  });

  it("UI05: accepts 255 for all RGB channels", async function () {
    await submitRgb(255, 255, 255);

    await expectText("rgb-result", "HEX: #FFFFFF");
    await expectEmpty("rgb-error");
  });

  it("UI06: rejects invalid hexadecimal characters", async function () {
    await submitHex("GGGGGG");

    await expectText("hex-error", hexErrorMessage);
    await expectEmpty("hex-result");
  });

  it("UI07: rejects an RGB value above 255", async function () {
    await submitRgb(256, 0, 0);

    await expectText("rgb-error", rgbErrorMessage);
    await expectEmpty("rgb-result");
  });

  it("UI08: rejects an empty RGB field despite its placeholder", async function () {
    await submitRgb("", 0, 0);

    await expectText(
      "rgb-error",
      "Enter values for red, green and blue."
    );

    await expectEmpty("rgb-result");
  });

  it("UI09: clears the hex error after correcting input", async function () {
    await submitHex("GGGGGG");
    await expectText("hex-error", hexErrorMessage);

    await submitHex("0000FF");

    await expectText("hex-result", "RGB: 0, 0, 255");
    await expectEmpty("hex-error");
  });

  it("UI10: removes an old RGB result when the next input is invalid", async function () {
    await submitRgb(255, 0, 0);
    await expectText("rgb-result", "HEX: #FF0000");

    await submitRgb(256, 0, 0);

    await expectText("rgb-error", rgbErrorMessage);
    await expectEmpty("rgb-result");
  });

  it("UI11: updates the preview after hex-to-RGB conversion", async function () {
    await submitHex("#FF5733");

    await expectText(
      "preview-text",
      "Current colour: #FF5733"
    );

    await expectPreviewColour(255, 87, 51);
  });

  it("UI12: updates the preview after RGB-to-hex conversion", async function () {
    await submitRgb(0, 0, 255);

    await expectText(
      "preview-text",
      "Current colour: #0000FF"
    );

    await expectPreviewColour(0, 0, 255);
  });

  it("UI13: clears an existing preview after invalid hex", async function () {
    await submitHex("#FF5733");
    await expectPreviewColour(255, 87, 51);

    await submitHex("GGGGGG");

    await expectText("hex-error", hexErrorMessage);
    await expectClearedPreview();
  });

  it("UI14: clears an existing preview after invalid RGB", async function () {
    await submitRgb(0, 0, 255);
    await expectPreviewColour(0, 0, 255);

    await submitRgb(256, 0, 0);

    await expectText("rgb-error", rgbErrorMessage);
    await expectClearedPreview();
  });
});