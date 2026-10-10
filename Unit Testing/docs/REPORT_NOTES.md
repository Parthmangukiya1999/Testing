# Notes for the arithmetic unit testing report

These notes describe the revised implementation. Use the LAB thesis template
for the submitted report and add your own public GitHub repository URL to its
references. This Markdown file is not the final PDF submission.

## Purpose and structure

The project implements a JavaScript module called `mylib`. It provides four
functions: `add()`, `subtract()`, `multiply()`, and `divide()`. A separate main
programme imports the library and prints four example calculations.

The structure follows the supplied UnitTesting reference: source files are
stored in `src`, tests are stored in `test`, and each Chai style has a separate
file. The project uses CommonJS modules with `require()` and `module.exports`.

## Relevant implementation

The functions call a shared input check. It raises an error if either argument
has a type other than `number`. This prevents values such as numeric strings
from being used as ordinary numbers.

```javascript
function validateNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Inputs must be numbers");
  }
}
```

Division also checks its divisor:

```javascript
function divide(a, b) {
  validateNumbers(a, b);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}
```

This stops division by zero and throws an error. A zero numerator is still
valid when the divisor is not zero. For example, `divide(0, 3)` returns `0`.

## What the test suite tests

Each of the three style files contains sixteen test cases. They check normal
arithmetic results, selected negative results, decimal results, multiplication
by zero, a zero numerator, input errors, and division by zero. Every function
has at least one normal-result test and one input-error test.

The invalid-input tests check both argument positions. For example, the
addition error test checks `add("6", 3)` and `add(6, "3")`.

The complete test run has forty-eight test cases. These are the same sixteen
cases repeated in Assert, Expect, and Should styles, so the extra executions
demonstrate syntax rather than checking forty-eight different behaviours.

`describe()` groups tests by style and function. Each `it()` block describes
one test case, and the assertions inside it check the expected behaviour.

## Crucial assertions

```javascript
assert.strictEqual(add(6, 3), 9);
expect(add(6, 3)).to.equal(9);
add(6, 3).should.equal(9);
```

All three statements check that adding `6` and `3` produces the number `9`.
The difference is the syntax used to express the assertion.

```javascript
expect(() => divide(6, 0)).to.throw(Error, "Cannot divide by zero");
```

The function wrapper lets Chai call the division function and inspect the
error. This test passes when the call throws an `Error` whose message contains
the expected words. Without the wrapper, division would throw before Chai
could make its assertion.

```javascript
expect(add(0.1, 0.2)).to.be.closeTo(0.3, 1e-12);
```

JavaScript may store the result of `0.1 + 0.2` with a small rounding difference.
This test allows an absolute difference of at most `0.000000000001` from `0.3`.

## Hooks and separate execution

```javascript
before(function startTesting() {
  console.log("Testing started");
});

after(function finishTesting() {
  console.log("Testing completed");
});
```

These hooks are outside the individual suites in `test/hooks.js`. In the
provided sequential run, the first function runs once before all selected
tests. The second runs once after them. The messages make their execution
visible. The library does not need database or file resources, so the hooks
do not perform resource setup or cleanup.

`npm start` runs `src/main.js`. `npm test` runs Mocha on the files in `test`.
The tests import `src/mylib.js`, so they can run without executing the main
programme. The three `test:assert`, `test:expect`, and `test:should` scripts
also allow each style to run independently with the same hooks.

## Validation evidence

The exact commands, versions, exit codes, and captured output are recorded
in `docs/VALIDATION.md` and the supporting output files. Use those results
alongside your own run on your computer. Distinguish the full run of forty-eight
tests from the sixteen tests in a single-style run.

## Problems and limitations

The input check only checks JavaScript types. It does not reject `NaN` or
`Infinity`, because both have the type `number`. A finite-number check would
make this rule stricter. The suite also does not have dedicated cases for very
large numbers or missing arguments, so passing these tests cannot prove that
every possible input works correctly.

Decimal rounding requires suitable comparison tolerances. The chosen tolerance
is appropriate for the small addition example and may need adjustment for
other calculations or numerical scales.

Repeating the same cases across three styles increases maintenance work. In
a normal small project, selecting one assertion style would keep the tests
shorter and easier to update. The Should style also adds a property to
`Object.prototype` in the test process.

The before and after hooks demonstrate the required lifecycle but only display
messages. The unit tests check the library rather than the main programme's
output formatting. The separate programme run is used to confirm its example
calculations.

## References to include

Include your own public GitHub implementation repository, the supplied
reference repository if you used it, and the Mocha, Chai, and Node.js
documentation listed in the README. Verify that your own repository is public.
Follow the course guidance when acknowledging assistance from AI.
