// tests/missing-name.spec.js

import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173";

test("checkout is blocked when customer name is missing", async ({ page }) => {
  await page.goto(URL);

  await page.getByRole("button", { name: "Add" }).first().click();

  await page.getByRole("button", { name: "Place Order" }).click();

  await expect(page.getByTestId("validation-error"))
    .toHaveText("Please enter your name before placing the order.");

  await expect(page.getByTestId("order-total"))
    .toHaveText("₹799.00");

  await expect(page.getByTestId("order-confirmation"))
    .toHaveCount(0);
});