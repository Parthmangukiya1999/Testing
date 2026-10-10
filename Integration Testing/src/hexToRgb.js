/**
 * Converts a six-digit hexadecimal colour to an RGB object.
 *
 * Accepts "RRGGBB" or "#RRGGBB", using upper-case or lower-case letters.
 * A hash is allowed only at the beginning. Three-digit shorthand, alpha
 * values, surrounding spaces and non-string inputs are not supported.
 *
 * @param {string} hex - A six-digit hexadecimal colour, with an optional #.
 * @returns {{r: number, g: number, b: number}} RGB channels from 0 to 255.
 * @throws {Error} If hex is not a string or its format is invalid.
 * @example
 * hexToRgb("#FF5733"); // { r: 255, g: 87, b: 51 }
 */
function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex value must be a string");
  }

  // Remove a hash only when it is the first character.
  const cleanHex = hex.replace(/^#/, "");

  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error("Invalid hexadecimal colour");
  }

  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16)
  };
}

module.exports = hexToRgb;
