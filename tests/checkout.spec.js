// tests/checkout.spec.js

import { test, expect } from "@playwright/test";

const URL = "http://localhost:5173";

test("successful checkout displays confirmation", async ({ page }) => {
  await page.goto(URL);

  // Add Wireless Mouse
  await page.getByRole("button", { name: "Add" }).first().click();

  await expect(page.getByTestId("order-total"))
    .toHaveText("₹799.00");

  // Enter customer name
  await page.getByTestId("customer-name").fill("Swayam");

  // Place order
  await page.getByRole("button", { name: "Place Order" }).click();

  // Verify confirmation
  await expect(page.getByTestId("order-confirmation"))
    .toHaveText("Order placed successfully!");

  // Verify order reference
  await expect(page.getByTestId("order-reference"))
    .toHaveText(/^ORD-\d+$/);
});