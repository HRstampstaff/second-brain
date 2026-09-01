# Build the Airtable hub for Stamp Staff instead of duplicating the TLL Central Hub

Decided 2026-09-01.

The course's starter base (TLL Central Hub) is built for a self-managing landlord: properties, units,
leases, tenants. Ailynn confirmed it doesn't fit Stamp Staff, a VA staffing agency — no point
duplicating it in and reworking it.

Instead Vera built four tables from scratch in the existing base (apptst9VRUlVdybNZ), alongside the
Skills/Routines/Tasks tables already there:

- **Clients** — client businesses, from Lead through Active/Ended, with fee, contract dates and
  payment status.
- **VAs** — Stamp Staff's virtual assistants, from In Training through Active/Pooled/Inactive.
- **Placements** — links a Client to a VA, kept as a history (not just a link field) so a replacement
  doesn't erase who was there before.
- **Candidates** — the recruitment pipeline, matching the stages in `procedures/recruitment.md`.

Field names and choices came from `business/profile.md` and `procedures/recruitment.md` /
`onboarding.md` — no numbers or values were invented. Fields left blank where the business doesn't
have a confirmed answer yet (e.g. Client Success Manager).

Apply this mapping to any future base work rather than reaching for TLL Central Hub's tables.
