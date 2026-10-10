# Hex to RGB Converter API

This project contains a JavaScript library that converts hexadecimal colours
to RGB values and an Express REST API that uses the library.

Mocha runs the automated tests, Chai checks the expected results, and
Supertest sends requests to the Express app for integration testing.

## Requirements

Use Node.js 22.12 or newer with npm. The project also supports Node.js 20.19
or newer within the 20.x release series. These requirements match the locked
Mocha version and allow the CommonJS tests to load Chai.

## Project files

| File | Purpose |
| --- | --- |
| `src/hexToRgb.js` | The conversion library and input validation. |
| `src/server.js` | The Express API and server startup. |
| `test/hexToRgb.test.js` | Unit tests for the library. |
| `test/api.test.js` | Integration tests for the API. |
| `package.json` | Dependencies, entry point and commands. |
| `package-lock.json` | Exact dependency versions for repeatable installation. |
| `.gitignore` | Excludes installed dependencies, environment files and local logs. |
| `README.md` | Setup, usage and testing instructions. |

## Installation

Open a terminal in the folder that contains `package.json`, then run:

```bash
npm ci
```

Keep `package-lock.json` in the repository. Do not commit `node_modules`.

## Library usage

The library accepts exactly six hexadecimal digits, with an optional leading
`#`. Upper-case and lower-case letters are both accepted. It returns an object
with red, green and blue values between 0 and 255.

```javascript
const hexToRgb = require("./src/hexToRgb");

console.log(hexToRgb("#FF5733"));
// { r: 255, g: 87, b: 51 }
```

Invalid strings throw `Error("Invalid hexadecimal colour")`. Non-string
inputs throw `Error("Hex value must be a string")`. Three-digit shorthand,
alpha values, spaces and incorrectly placed `#` characters are not supported.

## REST API

Start the server:

```bash
npm start
```

The server runs at `http://localhost:3000`.

Send a GET request to `/api/convert/:hex`, for example:

```text
GET http://localhost:3000/api/convert/FF5733
```

The response has status `200 OK` and a JSON body:

```json
{
  "hex": "#FF5733",
  "rgb": {
    "r": 255,
    "g": 87,
    "b": 51
  }
}
```

The `hex` response field has one leading `#` and preserves the input letter
case. To include a leading `#` in the request, use `%23` in the URL:

```text
GET http://localhost:3000/api/convert/%23FF5733
```

Invalid values on this route return `400 Bad Request` with a JSON body:

```json
{
  "error": "Invalid hexadecimal colour"
}
```

A request to `/api/convert/` has no value and does not match this route, so
Express returns `404 Not Found`.

## Automated tests

Run all tests:

```bash
npm test
```

Run each suite separately:

```bash
npm run test:unit
npm run test:integration
```

There are **31 tests: 20 unit tests and 11 integration tests**. The server does
not need to be started separately for these tests.

### Unit tests

Unit tests call the library directly. They check red, green, blue, a mixed
colour, an omitted leading `#`, lower-case letters, black and white. They also
check invalid characters, short and long values, an empty string, misplaced
or repeated `#` characters, and five kinds of non-string input.

### Integration tests

Integration tests use the real Express route and conversion library. They
check six valid inputs and five invalid inputs. Every test checks the JSON
content type, the HTTP status and the complete response body. Inputs with
`#` are URL-encoded before the request is sent.

The misplaced-`#` tests are regression tests. They detect the earlier bug
where a `#` in the middle or at the end was removed and the invalid value was
accepted. Passing tests confirm the checked cases, rather than every possible
input or server condition.

## Manual checks with cURL

Keep the server running in one terminal and run these commands in a second
terminal:

```bash
curl -i "http://localhost:3000/api/convert/FF5733"
curl -i "http://localhost:3000/api/convert/GGGGGG"
curl -i "http://localhost:3000/api/convert/FF%235733"
curl -i "http://localhost:3000/api/convert/%23FF5733"
```

The expected statuses are `200`, `400`, `400` and `200`, respectively. Check
the response bodies too. The first and fourth requests return the RGB values
`255`, `87` and `51`. The other two return the JSON error shown above.

The same URLs can be tested in Postman using the GET method.

## Assignment report

Use the LAB thesis template for the report and export it to PDF. Explain the
test coverage and important code snippets, compare Postman with tests written
in code, and add screenshots of the unit, integration and manual API results
with short explanations. Add the actual public GitHub repository link to the
references and check that the teacher can open it without signing in.
