# Your base

**Version: 4.1 - 2026-08-10**

**Vera writes this file into your own repo and keeps it current. You never fill it in by hand,
though you can correct anything she gets wrong.**

It is a plain snapshot of your Airtable base: what tables you have, what fields are in them, and a
note on anything unusual. The agents read it so they know where your data lives without guessing.

**If you rename a table or add a field, just tell Vera "my base changed" and she rewrites this.**

---

## Base

| | |
|---|---|
| Base name | |
| Base id | |
| Last read | |

## Tables

Vera fills this in from your live base. One row per table, with its fields listed as they are
actually named.

| Table | Fields |
|---|---|
| | |

## Notes

Anything an agent should know that the field names do not say on their own. For example which table
holds the truth when two look similar, what a status value means, or a convention you follow.

| Note | |
|---|---|
| Which table holds your routines | |
| Which table holds your tasks | |
| Your timezone | |
| Your currency | |
| How you prorate a partial month | |
| What a complete application looks like to you | |
| How you name documents | |

---

## For your assistant

- **Read this file before touching data.** It is faster and safer than exploring the base every time.
- **If something you need is not here, re-read the base rather than guessing**, then update this file.
- **If a table or field you need genuinely does not exist, say so and stop.** Never write into the
  closest-looking alternative. Getting it wrong in a base full of real tenant data is worse than
  stopping and asking.
- **Keep this file in the owner's own repo.** The copy in the shared library is an empty template.
