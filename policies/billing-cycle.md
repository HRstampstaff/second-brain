# Billing cycle

**Version: 1.1 - 2026-09-03 (late-payment dates corrected to match the signed Service Agreement).
The previous version had payment due the 3rd, late fee the 4th, suspension the 5th. Ailynn confirmed
2026-09-03 that the Remote Staff Service Agreement (FT, 6-month) is the current, authoritative
contract, and its dates are due 1st, late fee by the 2nd, suspended by the 3rd, canceled by the 7th.
Layered on 1.0 - 2026-09-02**

## Clients with a credit card on file

- Charged automatically on the **28th of the month**.
- That charge is for **the following month's** service.

## Clients without a credit card on file (invoice via QuickBooks)

- Invoice sent on the **20th of the month**.
- Due on the **1st of the following month**.

## Late payment, both groups

- Payment due by the **1st**. If not received by then, a **$100 late fee** applies as of the **2nd**.
- If the account is still unpaid by the **3rd**, the VA stops working (services suspended).
- If still unpaid by the **7th**, the contract is canceled.

## How this is used

- Fiona uses these dates to know who is behind and when a late fee or suspension applies.
- Tessa's payment-reminder templates (`templates/declined-card-followup.md`,
  `templates/unpaid-invoice-no-card-followup.md`) pull their due dates, late fee day, and
  suspension day from this policy.
