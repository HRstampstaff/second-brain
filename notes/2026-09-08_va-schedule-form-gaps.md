# Who is missing a VA schedule form row

**Built 2026-09-08** against the **Payroll Main** tab (cutoff **August 11 - August 25, 2026**, paid
September 5) and the **Form Responses 1** tab of the StampStaff Payroll sheet.

This is what blocks the BambooHR timesheet-to-payroll pull. The join step can only charge a VA's
hours to a client if that VA has a row in Form Responses, matched on email. See
`.claude/skills/bamboohr/SKILL.md`.

## The numbers

| | |
|---|---|
| Rows on Payroll Main | 111 |
| Matched to a form submission | 76 |
| Unmatched | 35 |

**The 35 unmatched are four different problems, not one.** Chasing all 35 would waste time on 13 of
them.

## 1. Genuinely no form submission - 21 people, and this is the chase list

**Revised 2026-09-08 after Ailynn's ruling on in-house staff.** Benjomin Kristian Reyes came off this
list: he is in-house on a fixed 9-6, so he never needs a schedule row. Note his payroll row says
`Contract Type = New VA Contract`, which is wrong and is why he landed here.

| VA | Client | Email |
|---|---|---|
| ~~BENJOMIN KRISTIAN REYES~~ | ~~K. Stampini~~ | **REMOVED 2026-09-08: in-house, see [policy](../policies/in-house-team-hours.md)** |
| Brey Aldrich (Adi) Saratan | G. Taylor | aldrich.stampstaff@gmail.com |
| Chavie Karleen Tan | Jose Ochoa | chaviet.stampstaff@gmail.com |
| Diego Aguila | N. Field | diegoa.stampstaff@gmail.com |
| Elaine Dela Cruz | L. Soloway | elaine.stampstaff@gmail.com |
| Gabrielle Benette Manalansan | K. Hall | benn.stampstaff@gmail.com |
| Jefferson Olbes | C. Clifford | jeff.stampstaff@gmail.com |
| John Kevin Cobarde | D. McCurdy | john.stampinigroup@gmail.com |
| Jonas Ermitano | V. Markarian | jonas.gvaco@gmail.com |
| Jonelyn Infante | E. Essien | jonelyninfante.stampstaff@gmail.com |
| Kathreen Grace Briones | V. Markarian | kathreenbr.gvaco@gmail.com |
| Kenneth (Ken) Pongco | S. Mcnamer | kenneth.stampstaff@gmail.com |
| Key Bantola | K. Stampini | keyverlybantola@gmail.com |
| Kyrie Tayactac | M. Crigler | kyrie.stampstaff@gmail.com |
| MARENZO V OLORGA | C. Royse | renzo.stampstaff@gmail.com |
| Marfil Ganelo | project | marf.ganelo@gmail.com |
| Mary Rose Palacios | A. Prado | maryrose.stampstaff@gmail.com |
| Nebjie Concepcion - 10 hrs | T. Ryan - 10hrs | ben.stampinigroup@gmail.com |
| Ronelyn Joyce Ponce | V. Markarian | joyce@markarianrealty.com |
| Sheila Bucao Cerio | R. Rosen | sheilac.stamp@gmail.com |
| Viktor Jose Esperacion | S. Miller | viktor.stampstaff@gmail.com |
| Wenielyn Tingchuy | C. Lecroix | wenielyn.stampstaff@gmail.com |

**Two of these still have `K. Stampini` or `project` as their client** (Key Bantola, Marfil Ganelo).
The same question was asked of Benjomin and the answer was that he is in-house, so these two may well
be too. **Ask before chasing them.**

## 2. Filled the form, but under a different email - 6 people. Do NOT chase these

**Nothing is missing here. The two systems just hold different addresses for the same person**, so
the join cannot see the submission. The fix is to make one of the two match, not to ask again.

| VA | Email on payroll | Email they used on the form |
|---|---|---|
| Emmanuel Abapo | emmanuel.stampstaff@gmail.com | emmanuel.abpo@gmail.com |
| June Airen Bacuado Riego de Dios | june.stampstaff@gmail.com | annehilgaga15@gmail.com |
| Nhorbert John Balcera | nhorbert.stampstaff@gmail.com | enjeybalcera2025@gmail.com |
| Osaimi Hassan | osaimi.gvaco@gmail.com | mike@markarianrealty.com |
| Prince Haidee Ramos | princehaidee.stampstaff@gmail.com | phaideeramos@gmail.com |
| Rejohn Roman III Avila Gonzalo | rejohn.gonzalo@gmail.com | johngonzalo.stampstaff@gmail.com |

**Osaimi Hassan's is worth a look on its own**: the form was submitted under
`mike@markarianrealty.com`, which is a client-side address, not the VA's.

## 3. In-house staff - 5 people. Probably should NOT be on this list at all

Coaches and the COO, whose client column reads `K. Stampini` because they work for Stamp Staff
itself. Their hours do not need splitting across clients, so a schedule form arguably does not apply.

| Person | Position | Email |
|---|---|---|
| Eydie Ann Embuscado Lugay | Coach | annfpg@gmail.com |
| Janet Mangrobang | Coach | janet2.gvaco@gmail.com |
| Katherine Barin | COO | katherineba.gvaco@gmail.com |
| Rafael Reyes | Coach | rafael.gvaco@gmail.com |
| Marmil Olorga | **VA** | shainaolarga.stampstaff@gmail.com |

**Marmil Olorga is the odd one**: contract type `In house` but position `VA`. Worth deciding which
she is, because it changes whether she needs a form row.

## 4. Backpay-only rows - 2 people. Nothing to schedule

No hours on this cutoff, just a back payment. Correctly absent from Form Responses.

- Windsor Martinez, windsorjohn.martinez99@gmail.com
- Marvin Dave Gavin, marvindave.gvaco@gmail.com

## One separate bug, and it is a two-second fix

**Myka Camille Javier's form row has a space inside her email address:**
`myka. stampstaff@gmail.com`. She matched here only because this analysis strips whitespace before
comparing. **The Zapier join step does not**, so she will silently fail to match every single run
until the sheet is corrected to `Myka.Stampstaff@gmail.com`.

## How this was built, and what would make it wrong

- Payroll side: the **Payroll Main** tab exported as CSV by hand. Reading the spreadsheet through
  the Drive connector was NOT usable - `read_file_content` truncated the tab at `Louise Anne
  Pacifico` and the column positions shifted between rows, putting dollar amounts in the email
  column. **For this sheet, always use a per-tab CSV export.**
- Matching is on **email**, lowercased with whitespace stripped, which is the same key the join step
  uses. Names were used only afterwards, to separate a genuine gap from an address mismatch.
- **A VA who changes client mid-period still shows one form row**, so a stale row counts as present
  here. This list finds people with NO row; it does not check whether a row is current.
