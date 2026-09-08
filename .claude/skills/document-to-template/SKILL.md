---
name: document-to-template
description: >
  Turns an ordinary document into a signature-ready template: inserts {{TAGS}} where data goes,
  numbered e-signature anchor tags where signing fields go, and hands back the tag-to-field map an
  automation needs. Use this whenever someone has a document they send repeatedly — a lease, an
  addendum, a notice, a contract, a waiver, an invoice — and wants it prepared so an automation can
  fill and send it. Trigger on "turn this into a template", "template this doc", "add the merge
  fields", "prep this for DocuSign", "add anchor tags", "make this auto-fill", "get this ready for
  the automation", or any request to standardize a document's variable fields. Also trigger when
  someone asks how to mark up a document for e-signature even if they never say the word template.
  Do NOT use this to send an envelope, or to write the document's wording.
---

# Document → Template

Version: 1.0

This skill does one job: take a document someone already has, and give it back marked up so an
automation can fill it and an e-signature service can sign it. It is the on-ramp. Everything
downstream — the automation, the envelope, the routing — assumes a document that has been
through this.

## The one idea

A prepared document holds **two kinds of markers**, and they behave in opposite ways.

| | Content variable | Anchor tag |
|---|---|---|
| Looks like | `{{Tenant Name}}` | `\sig_signer1\` |
| Who fills it | the automation, from your data source | nobody |
| What happens to it | replaced with visible text | left in place, read by the signing service |

Say it plainly when explaining: **content variables get replaced; anchors get preserved** — they
are not for the reader, they are instructions about where to put a signing field.

## Anchor naming — the convention that makes automation possible

```
\<type>_<party><N>\        e.g.  \sig_signer1\   \date_signer2\   \init_signer1\
```

- **type** is `sig`, `init`, `date`, or `name`
- **party** is a role plus a number: `signer1`, `signer2`, `landlord`, `vendor`, `client`

The number is the important part. `signer1` must always mean "the first person in the signer
list", in every template, forever. That is what lets one loop in the automation pair person N
with everything ending `signerN`. Without it, someone hand-writes a mapping per document and it
rots the first time a party is added.

Wrap anchors in backslashes (`\...\`). The wrapper only has to be a string that never occurs in
normal prose; backslashes are the DocuSign convention and there is no reason to invent another.

**The signing service reads no meaning from the name.** It is only a search string. The field
type comes from which array the automation puts it in (signature / date / initial) and the party
comes from which recipient it is nested under. The naming convention exists so humans and the
automation agree — which is exactly why it must be rigid rather than descriptive.

## Tag naming — match the automation, not your taste

If the document will run through an **existing** automation, use that automation's tag vocabulary
and conform to it exactly. Most fill steps do a literal find-and-replace, so a tag the automation
does not emit is left sitting in the finished document looking like a mistake. Read the
automation's tag list before naming anything.

For a brand-new automation, `{{Title Case}}` is fine. Pick one convention per document and hold it.

## Never ask which field. Propose it.

The person you are helping usually cannot name their own fields correctly, and asking them to is
how templates get built on fields that do not exist. People reach for the name they *wish* the
field had.

So invert it. Read their data source, pick the closest field for each tag, and show a **real value
from a real record**:

> `{{Monthly Rent}}` → Units · **Base Rent** — the first unit reads **$1,200**. Is that the number
> you mean?

Recognizing a value is easy; recalling a field name is not. This one habit catches almost every
mapping error before it reaches a document.

When the value is money, a date, or a name that appears on the signed page, always show it. When
nothing in their data is a good match, say so rather than forcing a field — some values are
supplied by a person each time, and the honest mapping is "entered at run time".

## How to run it

1. **Read the document.** Understand what it is and who signs it before marking anything.
2. **Find the variable data** — anything that changes between sends. Propose a tag per item.
3. **Find the signature blocks.** One `sig` and one `date` per party, plus `init` where the
   document calls for initials. Number the parties in signing order.
4. **Propose the field mapping** using the rule above. Get confirmation on anything that carries
   money or a date.
5. **Apply it to a COPY**, never the original. The original stays as the human-readable version.
6. **Hide the anchors**: white, 6pt. They stay real selectable text that the signing service reads
   at upload, and they are invisible on the finished page. A visible `\sig_signer1\` on an executed
   contract is the most embarrassing failure this skill can produce, so verify after styling.
7. **Hand back the mapping table** — tag, source table, source field. The automation build needs
   it, and it is the document's only real documentation.

## Style the tags like the text around them

This one is easy to miss and it ruins finished documents. A find-and-replace gives the replacement
text **the formatting of the text it replaced**. If a tag is styled to stand out — a different
color or a monospace font, which is tempting while you are working — then every filled value
inherits that styling, and the finished contract shows the tenant's name in green monospace.

So in the copy the automation actually uses, each tag must carry the formatting of the sentence it
sits in. Keep the color-coded version as a separate human-readable copy if it helps you explain
the idea; never point the automation at it.

## Verify before declaring done

Extract the text of the finished template and confirm each anchor is present exactly once (unless
a repeat is intended — an anchor placed twice produces two fields). Do not trust the filename or
the fact that a request returned 200.

## Gotchas that have actually cost time

- **You cannot delete a paragraph that sits between two tables.** The document API refuses,
  because two tables cannot be adjacent. If a conditional block's markers sit between signature
  tables, delete the marker *text* and leave the empty paragraph behind.
- **Deletions before replacements.** Deletes are index-based and shift everything after them;
  find-and-replace is text-based and immune. Run deletes first, highest index first.
- **Anchors in JavaScript**: build the backslash with `String.fromCharCode(92)`. Literal
  backslashes in a JS string inside a JSON payload inside an automation node will not survive.
- **An anchor whose party has no recipient produces nothing — silently.** No field, no error.
  Anchor names and the automation's recipient list must be changed together.

## Conditional blocks

A document that sometimes has a second signer should carry the block always, wrapped in markers:

```
{{#if Signer 2}}
   ... the signature block ...
{{/if Signer 2}}
```

The automation **deletes what does not apply** rather than inserting what does. Deleting is
reliable; inserting a table through a document API is fiddly and shifts every index after it.
Same rule for optional clauses, addenda and extra terms.

## Skill or automation?

Either method can be run as a skill — you ask, it fills the document and prepares the envelope,
with no automation existing anywhere. That is the right call while the document is still changing
or you send it rarely. Automate once the steps stop changing: an automation made its decisions
once, at build time, and afterwards only executes them, which is why it is faster and cheaper than
asking every time. Automating too early means rebuilding the flow every time you change your mind.
