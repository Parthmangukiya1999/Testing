/**
 * Amazon UI Testing — homepage and product search.
 *
 * Features:
 * - Explicit waits for dynamic page elements.
 * - Retries when Amazon replaces an element.
 * - Assertions for the search query and results.
 * - Screenshots for successful steps and failures.
 * - Automatic browser cleanup.
 *
 * Run: node amazon.test.js
 */

const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

const AMAZON_URL = "https://www.amazon.com/ref=nav_logo";
const SEARCH_TERM = "wireless mouse";
const WAIT_MS = 30000;

const SEARCH_FIELD = By.css("input[name='field-keywords']");
const RESULT_CARD = By.css(
  "[data-component-type='s-search-result']"
);

const screenshotFolder = path.join(__dirname, "screenshots");

// Only these temporary element errors should trigger a retry.
function isTemporaryElementError(error) {
  return (
    error.name === "StaleElementReferenceError" ||
    error.name === "NoSuchElementError"
  );
}

async function saveScreenshot(driver, filename) {
  await fs.writeFile(
    path.join(screenshotFolder, filename),
    await driver.takeScreenshot(),
    "base64"
  );

  console.log(`Screenshot saved: screenshots/${filename}`);
}

// Find the element again on each attempt instead of keeping
// a reference that Amazon may invalidate.
async function waitForSearchField(driver) {
  return driver.wait(async () => {
    try {
      const field = await driver.findElement(SEARCH_FIELD);

      return (
        (await field.isDisplayed()) &&
        (await field.isEnabled())
      );
    } catch (error) {
      if (isTemporaryElementError(error)) return false;
      throw error;
    }
  }, WAIT_MS, "Amazon search field was not ready.");
}

async function enterSearchText(driver) {
  await driver.wait(async () => {
    try {
      const field = await driver.findElement(SEARCH_FIELD);

      if (!(await field.isDisplayed())) return false;
      if (!(await field.isEnabled())) return false;

      await field.clear();
      await field.sendKeys(SEARCH_TERM);

      return (await field.getAttribute("value")) === SEARCH_TERM;
    } catch (error) {
      if (isTemporaryElementError(error)) return false;
      throw error;
    }
  }, WAIT_MS, "Could not enter the search text.");
}

async function submitSearch(driver) {
  // Locate a fresh field and submit using Enter.
  // The result wait below determines whether submission worked.
  const field = await driver.findElement(SEARCH_FIELD);
  await field.sendKeys(Key.ENTER);
}

async function waitForVisibleResults(driver) {
  return driver.wait(async () => {
    try {
      const results = await driver.findElements(RESULT_CARD);
      let visibleCount = 0;

      for (const result of results) {
        if (await result.isDisplayed()) {
          visibleCount++;
        }
      }

      return visibleCount > 0 ? visibleCount : false;
    } catch (error) {
      if (isTemporaryElementError(error)) return false;
      throw error;
    }
  }, WAIT_MS, "No visible product results appeared.");
}

async function main() {
  let driver;
  let step = "Preparing screenshot folder";

  try {
    await fs.mkdir(screenshotFolder, { recursive: true });

    // Remove old evidence so it cannot be mistaken for this run.
    for (const filename of [
      "01-amazon-home.png",
      "02-search-results.png",
      "failure.png",
    ]) {
      await fs.rm(path.join(screenshotFolder, filename), {
        force: true,
      });
    }

    step = "Starting Chrome";
    console.log(`STEP: ${step}`);

    driver = await new Builder().forBrowser("chrome").build();

    await driver.manage().window().setRect({
      width: 1280,
      height: 900,
    });

    await driver.manage().setTimeouts({
      pageLoad: 60000,
      implicit: 0,
    });

    step = "Opening Amazon";
    console.log(`STEP: ${step}`);

    await driver.get(AMAZON_URL);
    step = "Checking Amazon's opening page";
console.log(`STEP: ${step}`);

let continueClicked = false;

await driver.wait(async () => {
  try {
    // The homepage may already be available.
    const fields = await driver.findElements(SEARCH_FIELD);

    for (const field of fields) {
      if (
        (await field.isDisplayed()) &&
        (await field.isEnabled())
      ) {
        return true;
      }
    }

    // Handle the optional "Continue shopping" screen once.
    if (!continueClicked) {
      const buttons = await driver.findElements(
        By.xpath(
          "//button[normalize-space(.)='Continue shopping']" +
          " | //input[@type='submit' and @value='Continue shopping']" +
          " | //a[normalize-space(.)='Continue shopping']"
        )
      );

      for (const button of buttons) {
        if (
          (await button.isDisplayed()) &&
          (await button.isEnabled())
        ) {
          await button.click();
          continueClicked = true;
          console.log("Clicked: Continue shopping");
          break;
        }
      }
    }

    return false;
  } catch (error) {
    if (isTemporaryElementError(error)) return false;
    throw error;
  }
}, WAIT_MS, "Amazon search field did not appear after the opening page.");

    await waitForSearchField(driver);

    console.log("PASS: Amazon search field is visible and enabled.");
    await saveScreenshot(driver, "01-amazon-home.png");

    step = "Entering the search text";
    console.log(`STEP: ${step}`);

    await enterSearchText(driver);

    step = "Submitting the search";
    console.log(`STEP: ${step}`);

    // Retry submission only if the field reference becomes stale
    // or temporarily disappears before Selenium can use it.
    await driver.wait(async () => {
      try {
        await submitSearch(driver);
        return true;
      } catch (error) {
        if (isTemporaryElementError(error)) return false;
        throw error;
      }
    }, WAIT_MS, "Could not submit the search.");

    step = "Checking the search query";
    console.log(`STEP: ${step}`);

    await driver.wait(async () => {
      const url = new URL(await driver.getCurrentUrl());
      return url.searchParams.get("k") === SEARCH_TERM;
    }, WAIT_MS, "The URL did not contain the expected search query.");

    const resultsUrl = new URL(await driver.getCurrentUrl());

    assert.equal(
      resultsUrl.searchParams.get("k"),
      SEARCH_TERM,
      "The search query should match the entered text."
    );

    console.log("PASS: Search URL contains the correct query.");

    step = "Checking visible product results";
    console.log(`STEP: ${step}`);

    const visibleCount = await waitForVisibleResults(driver);

    assert.ok(
      visibleCount > 0,
      "At least one product result should be visible."
    );

    console.log(
      `PASS: ${visibleCount} product result cards are displayed.`
    );

    await saveScreenshot(driver, "02-search-results.png");
    step = "Dismissing the delivery pop-up";
console.log(`STEP: ${step}`);

const dismissButtons = await driver.findElements(
  By.xpath(
    "//input[@type='submit' and @value='Dismiss']" +
    " | //button[normalize-space(.)='Dismiss']" +
    " | //a[normalize-space(.)='Dismiss']"
  )
);

for (const button of dismissButtons) {
  if (await button.isDisplayed()) {
    await button.click();
    console.log("Dismissed the delivery pop-up.");
    break;
  }
}

step = "Selecting a product";
console.log(`STEP: ${step}`);

// Locate a product-title link within a search result.
// Supports a heading inside a link or a link inside a heading.
const product = await driver.wait(async () => {
  try {
    const links = await driver.findElements(
      By.css(
        "[data-component-type='s-search-result'] a:has(h2)," +
        "[data-component-type='s-search-result'] h2 a"
      )
    );

    for (const link of links) {
      const title = (await link.getText()).trim();

      if ((await link.isDisplayed()) && title.length > 0) {
        return { link, title };
      }
    }

    return false;
  } catch (error) {
    if (isTemporaryElementError(error)) return false;
    throw error;
  }
}, WAIT_MS, "No usable product-title link appeared.");

console.log("Selected product:", product.title);

const originalWindow = await driver.getWindowHandle();
const previousWindows = await driver.getAllWindowHandles();

step = "Opening the selected product";
console.log(`STEP: ${step}`);

await product.link.click();

// Support links opening either in this tab or a new tab.
await driver.wait(async () => {
  const windows = await driver.getAllWindowHandles();
  const newWindow = windows.find(
    (handle) => !previousWindows.includes(handle)
  );

  if (newWindow) {
    await driver.switchTo().window(newWindow);
    return true;
  }

  return (await driver.findElements(By.id("productTitle"))).length > 0;
}, WAIT_MS, "The product page did not open.");

step = "Checking the product title";
console.log(`STEP: ${step}`);

const detailTitle = await driver.wait(async () => {
  try {
    const titleElement = await driver.findElement(
      By.id("productTitle")
    );

    if (!(await titleElement.isDisplayed())) return false;

    const text = (await titleElement.getText()).trim();
    return text || false;
  } catch (error) {
    if (isTemporaryElementError(error)) return false;
    throw error;
  }
}, WAIT_MS, "The product title was not visible.");

// Ignore differences in whitespace when comparing titles.
const normaliseTitle = (text) => text.replace(/\s+/g, " ").trim();

assert.equal(
  normaliseTitle(detailTitle),
  normaliseTitle(product.title),
  "The product page title should match the selected result."
);

console.log("PASS: Product title matches the selected result.");
await saveScreenshot(driver, "03-product-details.png");

step = "Returning to search results";
console.log(`STEP: ${step}`);

if ((await driver.getWindowHandle()) !== originalWindow) {
  await driver.close();
  await driver.switchTo().window(originalWindow);
} else {
  await driver.navigate().back();
}

await driver.wait(async () => {
  const url = new URL(await driver.getCurrentUrl());
  return url.searchParams.get("k") === SEARCH_TERM;
}, WAIT_MS, "Did not return to the expected search.");

const returnedCount = await waitForVisibleResults(driver);
assert.ok(returnedCount > 0, "Results should appear after returning.");

console.log("PASS: Returned to the original search results.");
await saveScreenshot(driver, "04-return-to-results.png");

    console.log("\nSUCCESS: Search, product and return checks passed.");
  } catch (error) {
    console.error(`\nFAIL during: ${step}`);
    console.error(`${error.name}: ${error.message}`);
    process.exitCode = 1;

    if (driver) {
      try {
        await saveScreenshot(driver, "failure.png");
      } catch (screenshotError) {
        console.error(
          "Could not save failure screenshot:",
          screenshotError.message
        );
      }
    }
  } finally {
    if (driver) {
      try {
        await driver.quit();
        console.log("Chrome closed.");
      } catch (closeError) {
        console.error("Could not close Chrome:", closeError.message);
        process.exitCode = 1;
      }
    }
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exitCode = 1;
});