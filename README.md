# Mini Checkout and Browser Test Suite

A simple React-based checkout application with cart management, quantity updates, order calculations, input validation, and order confirmation. Playwright is used to automate browser tests and verify the customer checkout journey.

## Features

- Two synthetic products with fixed prices.
- Add and remove products from the cart.
- Increase and decrease product quantities.
- Automatically calculate line totals and order total.
- Required customer name validation.
- Prevent checkout when the cart is empty.
- Display an order confirmation with a unique reference.
- Prevent duplicate order submissions.
- Automated browser tests using Playwright.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Playwright

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Open the URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Browser Testing

The application uses Playwright for automated browser testing.

### Run all tests

```bash
npx playwright test
```

### Run an individual test

Successful checkout:

```bash
npx playwright test tests/checkout.spec.js
```

Missing customer name validation:

```bash
npx playwright test tests/missing-name.spec.js
```

Quantity update:

```bash
npx playwright test tests/qty-update.spec.js
```

### Run tests in headed mode

To watch the browser execute the tests:

```bash
npx playwright test --headed
```

### View the HTML test report

After executing the tests:

```bash
npx playwright show-report
```

## Automated Test Cases

| Test Case | Expected Result |
|---|---|
| Successful checkout | Order confirmation and unique reference are displayed. |
| Missing customer name | Checkout is blocked and a validation message is displayed. |
| Quantity update | Quantity and exact order total are updated correctly. |

Each automated test starts with a fresh browser page and an independent checkout state.

## Manual Test Cases

The following scenarios are tested manually:

| Test Case | Expected Result |
|---|---|
| Empty cart checkout | Checkout is blocked with a clear validation message. |
| Rapid double-click | Only one order confirmation is generated. |

Actual observations and results are documented separately in the test results.

## Test Plan and Results

The test plan prioritises the following checkout risks:

1. Incorrect order total calculations.
2. Invalid checkout due to missing customer information.
3. Duplicate order confirmations caused by repeated submissions.
4. Checkout attempts with an empty cart.

Automated and manual test results, including any defects discovered and supporting evidence, are documented in the TEST_RESULTS.md file.

## Project Limitations

- No backend or database integration.
- No real payment processing.
- Order references are generated on the client side.
- Orders are not persisted on a server.

This project is intended to demonstrate frontend checkout functionality and browser-based testing.