# Test Results – Mini Checkout

## Automated Test Results

| Test ID | Test Scenario | Actual Result | Status |
|---|---|---|---|
| TC-01 | Successful Checkout | Confirmation and unique order reference displayed. | Passed |
| TC-02 | Missing Customer Name | Validation message displayed and cart preserved. | Passed |
| TC-03 | Quantity Update | Quantity updated to 2 and total displayed ₹1,598. | Passed |

## Manual Test Results

| Test ID | Test Scenario | Actual Result | Status |
|---|---|---|---|
| TC-04 | Empty Cart Checkout | Empty cart validation message displayed. | Passed |
| TC-05 | Rapid Double-Click | Only one confirmation and order reference generated. | Passed |

## Defects Identified

No defects were observed during the executed tests.

## Evidence

- Playwright HTML test report.
- Screenshots or execution traces, where relevant.

## Overall Result

All five test scenarios passed during testing. No defects were observed in the tested scenarios.