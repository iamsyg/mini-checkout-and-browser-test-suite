// tests/qty-update.spec.js

import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173";

test("quantity change updates the exact order total", async ({ page }) => {
  await page.goto(URL);

  await page.getByRole("button", { name: "Add" }).first().click();

  await page.getByRole("button", {
    name: "Increase Wireless Mouse quantity"
  }).click();

  await expect(page.getByTestId("quantity-1"))
    .toHaveText("2");

  await expect(page.getByTestId("order-total"))
    .toHaveText("₹1598.00");
});