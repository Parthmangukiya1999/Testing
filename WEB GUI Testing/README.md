# Colour Converter — Web GUI Testing

A basic HTML, CSS and JavaScript application that converts colours
between hexadecimal and RGB formats.

## Features

- Convert six hexadecimal digits to RGB.
- Accept hexadecimal input with or without a leading #.
- Accept uppercase and lowercase hexadecimal letters.
- Convert RGB whole numbers from 0 to 255 to uppercase hexadecimal.
- Display validation messages for invalid or empty inputs.
- Clear previous results and errors when submitting a form again.
- Display a colour preview after successful conversion and clear it after invalid input.
## Project structure

- index.html — application interface
- style.css — basic styling and responsive layout
- script.js — conversion functions, validation and event handling
- test/ui.test.js — automated Selenium UI tests
- screenshots/ — screenshots of the application and test results
- package.json — dependencies and test command
- package-lock.json — dependency version information
- .gitignore — excludes node_modules from Git

## Open the application

Open index.html in a web browser.

No separate web server is required.

Example conversions:

- #FF5733 → RGB: 255, 87, 51
- RGB 255, 87, 51 → HEX: #FF5733

Placeholder numbers are examples only. All three RGB fields must
contain entered values before conversion.

## Set up automated testing

Requirements:

- Node.js 22 or newer
- npm
- Google Chrome
- Internet access for dependency installation and, if needed,
  initial browser-driver setup

Open a terminal in this project folder and install dependencies:

```bash
npm ci
```

## Run automated tests

```bash
npm test
```

Selenium opens Chrome, interacts with the application and checks
the displayed results. Mocha reports the test outcomes.

Each test starts with a freshly loaded page. Chrome closes after
the suite finishes.

## Automated test coverage

| ID | Test |
| --- | --- |
| UI01 | Hexadecimal-to-RGB conversion |
| UI02 | Lowercase hex without # |
| UI03 | RGB-to-hexadecimal conversion |
| UI04 | Minimum RGB boundary: 0 |
| UI05 | Maximum RGB boundary: 255 |
| UI06 | Invalid hexadecimal characters |
| UI07 | RGB value above 255 |
| UI08 | Empty RGB field despite a visible placeholder |
| UI09 | Recovery after correcting invalid hex |
| UI10 | Removal of an old result after invalid RGB input |
| UI11 | Preview updates after hex-to-RGB conversion |
| UI12 | Preview updates after RGB-to-hex conversion |
| UI13 | Existing preview clears after invalid hex |
| UI14 | Existing preview clears after invalid RGB |

## Recorded automated result

On 24 October 2026, the suite reported:

14 passing (4s)

This result applies to these ten automated cases, not every possible
input or browser configuration.

## Manual testing

Manual testing was performed separately using the prepared test
cases for valid, invalid and boundary inputs, plus keyboard and
narrow-layout checks.

Record individual outcomes and the browser version in the report.

## Limitations

- Automated testing uses Chrome only.
- The suite checks selected scenarios rather than every possible input.
- Automated text assertions do not establish visual quality or full
  accessibility compliance.
- Layout and basic usability require separate manual checks.