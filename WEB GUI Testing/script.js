/*
 * File: script.js
 * Purpose: Validate and convert hexadecimal/RGB colours,
 * display conversion results, and update the colour preview.
 */

"use strict";

/**
 * Convert six hexadecimal digits, with an optional leading #, to RGB.
 */
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new Error("Enter a valid hexadecimal colour.");
  }

  const cleanedHex = hex.trim();

  if (!/^#?[0-9a-fA-F]{6}$/.test(cleanedHex)) {
    throw new Error(
      "Enter exactly six hexadecimal digits (0–9, A–F), with an optional #."
    );
  }

  const digits = cleanedHex.replace(/^#/, "");

  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16)
  };
}

/**
 * Convert three integer RGB values from 0 to 255 to uppercase hex.
 */
function rgbToHex(r, g, b) {
  const channels = [r, g, b];

  const valid = channels.every(
    (value) =>
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 255
  );

  if (!valid) {
    throw new Error("RGB values must be whole numbers from 0 to 255.");
  }

  const hexDigits = channels
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");

  return `#${hexDigits.toUpperCase()}`;
}

// Find the hexadecimal form elements.
const hexForm = document.getElementById("hex-form");
const hexInput = document.getElementById("hex-input");
const hexResult = document.getElementById("hex-result");
const hexError = document.getElementById("hex-error");

// Find the RGB form elements.
const rgbForm = document.getElementById("rgb-form");
const redInput = document.getElementById("red-input");
const greenInput = document.getElementById("green-input");
const blueInput = document.getElementById("blue-input");
const rgbResult = document.getElementById("rgb-result");
const rgbError = document.getElementById("rgb-error");

// Find the shared colour preview elements.
const colourPreview = document.getElementById("colour-preview");
const previewText = document.getElementById("preview-text");

// Remove the previous colour before each conversion attempt.
function clearPreview() {
  colourPreview.style.backgroundColor = "";
  previewText.textContent = "No valid colour to preview.";
}

// Display a colour only after successful validation.
function showPreview(hex) {
  colourPreview.style.backgroundColor = hex;
  previewText.textContent = `Current colour: ${hex}`;
}

// Handle hexadecimal-to-RGB conversion.
hexForm.addEventListener("submit", (event) => {
  event.preventDefault();

  hexResult.textContent = "";
  hexError.textContent = "";
  clearPreview();

  try {
    const rgb = hexToRgb(hexInput.value);

    hexResult.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
    showPreview(rgbToHex(rgb.r, rgb.g, rgb.b));
  } catch (error) {
    hexError.textContent = error.message;
  }
});

// Handle RGB-to-hexadecimal conversion.
rgbForm.addEventListener("submit", (event) => {
  event.preventDefault();

  rgbResult.textContent = "";
  rgbError.textContent = "";
  clearPreview();

  try {
    const inputs = [redInput, greenInput, blueInput];

    // Check for empty fields before Number("") converts them to zero.
    const hasEmptyInput = inputs.some(
      (input) => input.value.trim() === ""
    );

    if (hasEmptyInput) {
      throw new Error("Enter values for red, green and blue.");
    }

    const r = Number(redInput.value);
    const g = Number(greenInput.value);
    const b = Number(blueInput.value);

    const hex = rgbToHex(r, g, b);

    rgbResult.textContent = `HEX: ${hex}`;
    showPreview(hex);
  } catch (error) {
    rgbError.textContent = error.message;
  }
});