# Validation results

The revised CommonJS project was verified on 6 October 2026.
Verification time: `2026-10-06T14:22:35+03:00`.

These results come from the supplied implementation. Run it on your own
computer too and keep your own results for the coursework report.

## Environment

| Tool | Verified version |
| --- | --- |
| Node.js | v24.19.0 |
| npm | 11.9.0 |
| Mocha | 12.0.3 |
| Chai | 6.3.0 |

Dependencies were installed from `package-lock.json` using `npm ci`.

## Commands and results

| Command | Result | Exit code |
| --- | --- | --- |
| `npm start` | Four correct example calculations | 0 |
| `npm test` | 48 passing | 0 |
| `npm run test:assert` | 16 passing | 0 |
| `npm run test:expect` | 16 passing | 0 |
| `npm run test:should` | 16 passing | 0 |
| `npx --no-install mocha` | 48 passing | 0 |

The forty-eight cases in the full run are the same sixteen cases repeated
in three assertion styles. Each input-validation test includes assertions
for both argument positions.

## Main programme output

```text
> mylib-arithmetic-project@1.0.0 start
> node src/main.js

Arithmetic examples
6 + 3 = 9
6 - 3 = 3
6 * 3 = 18
6 / 3 = 2
```

All four arithmetic results were checked against the expected values.

## Full unit test output

```text
> mylib-arithmetic-project@1.0.0 test
> mocha



Testing started
  mylib.js (Assert style)
    add()
      ✔ adds two positive numbers
      ✔ adds a negative number and a positive number
      ✔ adds decimals within a small rounding tolerance
      ✔ rejects a non-number in either input position
    subtract()
      ✔ subtracts two positive numbers
      ✔ returns a negative result when the second number is larger
      ✔ rejects a non-number in either input position
    multiply()
      ✔ multiplies two positive numbers
      ✔ multiplies a negative number by a positive number
      ✔ returns zero when multiplying by zero
      ✔ rejects a non-number in either input position
    divide()
      ✔ divides two positive numbers
      ✔ returns a decimal result when needed
      ✔ returns zero when the numerator is zero
      ✔ rejects a non-number in either input position
      ✔ throws an error when the divisor is zero

  mylib.js (Expect style)
    add()
      ✔ adds two positive numbers
      ✔ adds a negative number and a positive number
      ✔ adds decimals within a small rounding tolerance
      ✔ rejects a non-number in either input position
    subtract()
      ✔ subtracts two positive numbers
      ✔ returns a negative result when the second number is larger
      ✔ rejects a non-number in either input position
    multiply()
      ✔ multiplies two positive numbers
      ✔ multiplies a negative number by a positive number
      ✔ returns zero when multiplying by zero
      ✔ rejects a non-number in either input position
    divide()
      ✔ divides two positive numbers
      ✔ returns a decimal result when needed
      ✔ returns zero when the numerator is zero
      ✔ rejects a non-number in either input position
      ✔ throws an error when the divisor is zero

  mylib.js (Should style)
    add()
      ✔ adds two positive numbers
      ✔ adds a negative number and a positive number
      ✔ adds decimals within a small rounding tolerance
      ✔ rejects a non-number in either input position
    subtract()
      ✔ subtracts two positive numbers
      ✔ returns a negative result when the second number is larger
      ✔ rejects a non-number in either input position
    multiply()
      ✔ multiplies two positive numbers
      ✔ multiplies a negative number by a positive number
      ✔ returns zero when multiplying by zero
      ✔ rejects a non-number in either input position
    divide()
      ✔ divides two positive numbers
      ✔ returns a decimal result when needed
      ✔ returns zero when the numerator is zero
      ✔ rejects a non-number in either input position
      ✔ throws an error when the divisor is zero

Testing completed

  48 passing (17ms)
```

The invalid-input tests passed by checking for an `Error` containing
`Inputs must be numbers`. The zero-divisor tests passed by checking for
an `Error` containing `Cannot divide by zero`.

## Hooks and independent execution

Every test command printed `Testing started` once before the first test
case and `Testing completed` once after the last test case. None printed
the main programme's heading or example calculations.

Each single-style command ran only its selected style. The direct Mocha
command also passed. The library and test files do not import `src/main.js`.

## Supporting output files

- `main-output.txt`: captured main programme output.
- `test-output.txt`: all three styles together.
- `assert-output.txt`, `expect-output.txt`, `should-output.txt`: each style separately.
- `direct-test-output.txt`: direct Mocha command output.
- `verification.json`: commands, exit codes, versions, and checks.

## Verification scope

This confirms the selected behaviours and separation of tests from the main
programme. It does not prove that every possible input is supported or
establish that the project has been published on GitHub.
