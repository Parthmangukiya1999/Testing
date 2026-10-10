# JavaScript arithmetic library and unit tests

This project contains the `mylib` arithmetic library, a main programme, and
Mocha and Chai tests. It follows the source and test layout of the supplied
UnitTesting reference and implements the four operations required by the
arithmetic assignment.

The library provides addition, subtraction, multiplication, and division.
It rejects inputs that are not numbers and throws an error for division by
zero. Each Chai style has a separate test file: Assert, Expect, and Should.

## Start in VS Code

1. Extract the ZIP into a normal folder.
2. Open `mylib-arithmetic-project` with **File > Open Folder** in VS Code.
3. Open **Terminal > New Terminal** in the folder containing `package.json`.
4. Check your installed versions:

   ```bash
   node --version
   npm --version
   ```

   Use Node.js version 22.12.0 or later for this project. The locked
   dependencies are Mocha 12.0.3 and Chai 6.3.0. This CommonJS setup has been
   run successfully with Node.js 24.19.0.

5. Install the packages:

   ```bash
   npm install
   ```

6. Run the main programme:

   ```bash
   npm start
   ```

7. Run all the tests separately:

   ```bash
   npm test
   ```

   The expected result is **48 passing**: sixteen test cases in each of
   the three styles. The hooks print a start and finish message once per run.

These commands work in the VS Code terminal on Windows, macOS, and Linux.
You do not need `npm init -y` with this download because `package.json`
already exists.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/mylib.js` | Exports the four arithmetic functions |
| `src/main.js` | Imports the library and prints example calculations |
| `test/hooks.js` | Runs one function before all tests and one afterwards |
| `test/mylib.assert.test.js` | Tests using the Assert style |
| `test/mylib.expect.test.js` | Tests using the Expect style |
| `test/mylib.should.test.js` | Tests using the Should style |
| `package.json` | Defines the dependencies and run commands |
| `package-lock.json` | Records the dependency versions |
| `.gitignore` | Excludes `node_modules` and generated coverage files |
| `docs/VALIDATION.md` | Records the actual run results |
| `docs/REPORT_NOTES.md` | Explains the implementation, tests, and limitations |

## What follows the reference

The supplied reference uses `src/math.js`, a `test` directory, CommonJS
modules, and three test files. This project uses the same approach, with
the library named `mylib.js` to match the assignment.

| Reference | This project |
| --- | --- |
| `src/math.js` with `add()` and `isEven()` | `src/mylib.js` with four arithmetic operations |
| `test/math.assert.test.js` | `test/mylib.assert.test.js` |
| `test/math.expect.test.js` | `test/mylib.expect.test.js` |
| `test/math.should.test.js` | `test/mylib.should.test.js` |
| `require()` and `module.exports` | The same CommonJS module format |
| `npm test` runs Mocha | The same command, plus commands for individual styles |

The main programme, division-by-zero handling, and before/after hooks are
added to meet the assignment. The library does not need `isEven()` for this task.

## Library and main programme

The functions call a shared input check:

```javascript
function validateNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Inputs must be numbers");
  }
}
```

`add(6, 3)` returns `9`. `add("6", 3)` throws an error because `"6"`
is a string. The type check does not reject `NaN` or `Infinity`; both have
JavaScript's type `number`.

Division checks its divisor after checking the input types:

```javascript
function divide(a, b) {
  validateNumbers(a, b);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}
```

`throw` stops the function and raises an error. A normal JavaScript `Error`
is used; the instructions do not require a custom error class named
`ZeroDivision`. A zero numerator remains valid if the divisor is not zero.

The library makes its functions available to other files with:

```javascript
module.exports = { add, subtract, multiply, divide };
```

The main programme imports them using:

```javascript
const mylib = require("./mylib");
```

It calls each function and prints the results:

```text
Arithmetic examples
6 + 3 = 9
6 - 3 = 3
6 * 3 = 18
6 / 3 = 2
```

The `"type": "commonjs"` setting in `package.json` matches this use of
`require()` and `module.exports`.

## Test suite

Mocha runs the tests. Chai supplies assertions that compare actual behaviour
with expected behaviour. `describe()` groups related tests, while `it()`
defines one test case.

These examples check the same result in three styles:

```javascript
// Assert
assert.strictEqual(add(6, 3), 9);

// Expect
expect(add(6, 3)).to.equal(9);

// Should
add(6, 3).should.equal(9);
```

Assert uses assertion functions. Expect and Should use chains that read like
short sentences. The Should file first calls `chai.should()` to add the
`.should` assertion property to `Object.prototype` in the test process.

### Cases repeated in each style

| Function | Behaviour checked | Expected result |
| --- | --- | --- |
| `add` | Positive numbers: `6, 3` | `9` |
| `add` | Negative and positive: `-6, 3` | `-3` |
| `add` | Decimals: `0.1, 0.2` | Close to `0.3` within `1e-12` |
| `add` | A string in either input position | Input error |
| `subtract` | Positive numbers: `6, 3` | `3` |
| `subtract` | Larger second number: `3, 6` | `-3` |
| `subtract` | A string in either input position | Input error |
| `multiply` | Positive numbers: `6, 3` | `18` |
| `multiply` | Negative and positive: `-6, 3` | `-18` |
| `multiply` | Multiplication by zero: `6, 0` | `0` |
| `multiply` | A string in either input position | Input error |
| `divide` | Positive numbers: `6, 3` | `2` |
| `divide` | Fractional result: `5, 2` | `2.5` |
| `divide` | Zero numerator: `0, 3` | `0` |
| `divide` | A string in either input position | Input error |
| `divide` | Zero divisor: `6, 0` | Division error |

Each invalid-input test contains two assertions, checking a string in the
first and second position. Mocha counts that `it()` block as one test.
There are sixteen test cases per style and forty-eight in the full run.
Repeating the cases is useful for learning the styles but does not increase
the range of inputs checked by itself.

### Checking division by zero

```javascript
expect(() => divide(6, 0)).to.throw(Error, "Cannot divide by zero");
```

The arrow function gives Chai an action to call. Chai checks that calling
it throws an `Error` whose message contains the expected text. This test
passes when the error is thrown correctly.

### Before and after all tests

`test/hooks.js` contains root hooks outside any `describe()` block:

```javascript
before(function startTesting() {
  console.log("Testing started");
});

after(function finishTesting() {
  console.log("Testing completed");
});
```

Mocha loads the hooks file alongside the test files. With the supplied
sequential commands, the hooks run once before and once after all selected
tests. They demonstrate the lifecycle; this library has no resources to
prepare or close. Hooks do not count as test cases.

## Run one style at a time

```bash
npm run test:assert
npm run test:expect
npm run test:should
```

Each command includes `test/hooks.js` and its selected style file.
Each should report **16 passing**.

You can also run all tests directly:

```bash
npx --no-install mocha
```

The tests import `src/mylib.js` directly. Neither the library nor the tests
import `src/main.js`, so testing does not execute the main programme.

## Limitations and improvements

- Selected examples cannot prove that every possible input works.
- The `typeof` check accepts `NaN` and `Infinity`. A future improvement
  would use `Number.isFinite()` if only finite numbers should be supported.
- Decimal arithmetic can have small rounding differences. The decimal
  addition test uses a tolerance rather than exact equality.
- Very large numbers and missing arguments do not have dedicated tests.
- Three similar test files require updating the same cases in three places.
  One style would normally be enough for a small project.
- Should modifies `Object.prototype` within the test process. Expect may
  be easier to use where prototype changes are undesirable.
- The hooks only display messages. Larger applications may need real
  setup and cleanup, such as opening and closing a database connection.
- The library tests do not check the main programme's output format.
  The separate validation run checks its four demonstration results.

## GitHub and the coursework report

Create a public repository on your own GitHub account and upload the source,
test, package, README, and docs files. Keep the folders intact and exclude
`node_modules` and the ZIP itself. Verify that the repository opens while
signed out, then add your repository URL to the report's references.
The reference's repository URL is not a link to your own implementation.

Use the LAB thesis template from eLAB to prepare a brief report. Explain the
tests, assertions, hooks, error handling, separate execution, run results,
and limitations. `docs/REPORT_NOTES.md` contains explanations and snippets
as a starting point. Run the code on your own computer and keep your own
terminal output too. Review the wording to match your understanding and
follow the course's AI-use guidance.

The PDF report and your public repository still need to be completed before
submission. Export the report to PDF and submit it through the course activity.

## References

- Supplied UnitTesting reference archive. Its `package.json` identifies
  [Petri Rantanen's reference repository](https://github.com/petri-rantanen/AT00CK37-3003-Week38).
- [Mocha getting started](https://mochajs.org/getting-started/)
- [Mocha hooks](https://mochajs.org/features/hooks/)
- [Chai assertion styles](https://www.chaijs.com/guide/styles/)
- [Chai Assert API](https://www.chaijs.com/api/assert/)
- [Chai Expect and Should API](https://www.chaijs.com/api/bdd/)
- [Node.js CommonJS modules](https://nodejs.org/api/modules.html)
