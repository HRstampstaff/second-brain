# Repurpose Tessa, Fiona and Owen for a staffing business

Decided 2026-08-31.

Stamp Staff is a virtual assistant staffing agency, not a self-managing landlord. The Vera library's
specialists are written for landlords by default. Ailynn confirmed repurposing rather than retiring
or keeping them as-is:

- **Tessa** → client communication: discovery call enquiries, presenting candidate VAs, Service
  Agreements and onboarding, everyday client messages, contract renewals, ending a placement.
- **Fiona** → money, unchanged in role: the monthly service fee, late fees, part-month proration,
  VA payroll, expenses, modelling a fee change.
- **Owen** → operations: sourcing and vetting candidate VAs, client platform access (CRM, social
  accounts), coach check-ins, replacing a VA on a placement, filing.

Their copies in `.claude/skills/` were rewritten to match. Apply this mapping to any future skill
work rather than reverting to the landlord wording.

**Note for future syncs (added 2026-09-06):** these three copies carry version `1.0 (repurposed for
Stamp Staff)`, while the library's copies are on `4.2` and still landlord-only. That is not a missed
update and the library copy must never be pulled over the top of them. If the library ships a
genuinely general improvement to a specialist, port that one part by hand into the Stamp Staff copy.
