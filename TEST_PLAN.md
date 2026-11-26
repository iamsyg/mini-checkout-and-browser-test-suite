# Test Plan – Mini Checkout

## Objective
Verify that the checkout application correctly handles cart operations, order calculations, customer validation and order confirmation.

## Testing Priorities
| Risk | Reason |
|---|---|
| Incorrect order total | Customers may be charged an incorrect amount. |
| Duplicate order submission | Multiple confirmations may be generated for one checkout. |
| Missing customer information | Invalid orders may be accepted. |
| Empty cart checkout | Customers should not be able to place empty orders. |
| Incorrect quantity updates | Cart totals may become inconsistent. |

## Automated Test Cases

### TC-01: Successful Checkout
- Add a product to the cart.
- Enter a valid customer name.
- Click Place Order.
- Verify the confirmation message.
- Verify that an order reference is displayed.

**Expected Result:** Checkout succeeds and displays exactly one order confirmation with a reference.

### TC-02: Missing Customer Name
- Add a product to the cart.
- Leave the customer name blank.
- Click Place Order.

**Expected Result:** Checkout is blocked, a validation message is displayed, and the cart remains unchanged.

### TC-03: Quantity Update
- Add Wireless Mouse (₹799).
- Increase its quantity from 1 to 2.
- Verify the displayed quantity and order total.

**Expected Result:** Quantity displays 2 and the order total is exactly ₹1,598.

## Manual Test Cases

### TC-04: Empty Cart Checkout
- Open the checkout page.
- Do not add any products.
- Click Place Order.

**Expected Result:** Checkout is blocked with an empty cart validation message.

### TC-05: Rapid Double-Click
- Add a product to the cart.
- Enter a valid customer name.
- Rapidly click Place Order twice.

**Expected Result:** Only one order confirmation and one order reference are generated.

## Test Environment
- Application: React + Vite
- Browser automation: Playwright
- Browser: Chromium
- Application URL: http://localhost:5173