const express = require("express");
const hexToRgb = require("./hexToRgb");

const app = express();

/**
 * GET /api/convert/:hex
 *
 * Uses the hexToRgb library to convert a six-digit hexadecimal colour.
 * If the input includes a leading #, encode it as %23 in the URL.
 *
 * Example request: GET /api/convert/FF5733
 * Success (200): { hex: "#FF5733", rgb: { r: 255, g: 87, b: 51 } }
 * Invalid input (400): { error: "Invalid hexadecimal colour" }
 *
 * Responses use JSON. The hex field includes one leading # and preserves
 * the letter case of the supplied colour.
 */
app.get("/api/convert/:hex", (req, res) => {
  try {
    const rgb = hexToRgb(req.params.hex);

    res.json({
      hex: `#${req.params.hex.replace(/^#/, "")}`,
      rgb: rgb
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// Export the app so integration tests can send requests to it.
module.exports = app;

// Start the server only when this file is executed directly.
if (require.main === module) {
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
