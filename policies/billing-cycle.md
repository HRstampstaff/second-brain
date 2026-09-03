# Billing cycle

**Version: 1.0 - 2026-09-02**

## Clients with a credit card on file

- Charged automatically on the **28th of the month**.
- That charge is for **the following month's** service.

## Clients without a credit card on file (invoice via QuickBooks)

- Invoice sent on the **20th of the month**.
- Due on the **1st of the following month**.

## Late payment, both groups

- Payment due by the **3rd**. If not received by then, a **$100 late fee** applies as of the **4th**.
- If the account is still unpaid by the **5th**, the VA stops working (services suspended).

## How this is used

- Fiona uses these dates to know who is behind and when a late fee or suspension applies.
- Tessa's payment-reminder templates (`templates/declined-card-followup.md`,
  `templates/unpaid-invoice-no-card-followup.md`) pull their due dates, late fee day, and
  suspension day from this policy.
