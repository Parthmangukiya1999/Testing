// These root hooks apply to all test suites in the current Mocha run.

before(function startTesting() {
  console.log("Testing started");
});

after(function finishTesting() {
  console.log("Testing completed");
});
