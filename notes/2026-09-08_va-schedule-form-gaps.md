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

**The 35 unmatched are four different problems, not one.** Only 19 are a real gap. Chasing all 35
would waste time on 16 of them.

| Bucket | Count | Action |
|---|---|---|
| Genuinely no form row | 19 | Chase |
| Filled it under a different email | 6 | Fix the address, do not chase |
| In-house staff | 8 | Nothing. They never need one |
| Backpay-only rows | 2 | Nothing. No hours this cutoff |

## 1. Genuinely no form submission - 19 people, and this is the chase list

**Revised 2026-09-08 after Ailynn's rulings on in-house staff.** Three came off: **Benjomin Kristian
Reyes** (in-house, fixed 9-6), **Key Bantola** (in-house, fixed 5-9pm ET) and **Marfil Ganelo**
(in-house, flexible). All three carry `Contract Type = New VA Contract` on the payroll sheet despite
being in-house, which is exactly why they landed here. See
[the in-house policy](../policies/in-house-team-hours.md).

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
| ~~Key Bantola~~ | ~~K. Stampini~~ | **REMOVED 2026-09-08: in-house, fixed 5-9pm ET** |
| Kyrie Tayactac | M. Crigler | kyrie.stampstaff@gmail.com |
| MARENZO V OLORGA | C. Royse | renzo.stampstaff@gmail.com |
| ~~Marfil Ganelo~~ | ~~project~~ | **REMOVED 2026-09-08: in-house, flexible hours** |
| Mary Rose Palacios | A. Prado | maryrose.stampstaff@gmail.com |
| Nebjie Concepcion - 10 hrs | T. Ryan - 10hrs | ben.stampinigroup@gmail.com |
| Ronelyn Joyce Ponce | V. Markarian | joyce@markarianrealty.com |
| Sheila Bucao Cerio | R. Rosen | sheilac.stamp@gmail.com |
| Viktor Jose Esperacion | S. Miller | viktor.stampstaff@gmail.com |
| Wenielyn Tingchuy | C. Lecroix | wenielyn.stampstaff@gmail.com |

**All 19 of these are genuinely placed with a client**, so every one of them needs a schedule row.
The people whose client column read `K. Stampini` or `project` have all been resolved as in-house
and moved to section 3.

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

## 3. In-house staff - 8 people. Correctly absent, do not chase

Stamp Staff's own people. Their hours are never split across clients, so the schedule form does not
apply to them at all. **Settled by Ailynn on 2026-09-08**; full detail and the three schedules are in
[policies/in-house-team-hours.md](../policies/in-house-team-hours.md).

| Person | Schedule | Contract Type on payroll | Email |
|---|---|---|---|
| Eydie Ann Embuscado Lugay | Flexi 9am-8pm ET | `In house` | annfpg@gmail.com |
| Katherine Barin | Flexi 9am-8pm ET | `In house` | katherineba.gvaco@gmail.com |
| Janet Mangrobang | Flexi 9am-8pm ET | `In house` | janet2.gvaco@gmail.com |
| Marfil Ganelo | Flexi | ⚠️ `New VA Contract` | marf.ganelo@gmail.com |
| Rafael Reyes | Fixed 9-6 | `In house` | rafael.gvaco@gmail.com |
| Marmil Olorga | Fixed 9-6 | `In house` | shainaolarga.stampstaff@gmail.com |
| Benjomin Kristian Reyes | Fixed 9-6 | ⚠️ `New VA Contract` | benjkris.stampstaff@gmail.com |
| Key Bantola | Fixed 5-9pm ET | ⚠️ `New VA Contract` | keyverlybantola@gmail.com |

**⚠️ Three of the eight are mislabelled on the payroll sheet** as `New VA Contract`. Correct those
cells, or nothing downstream can tell they are in-house.

**⚠️ Marfil Ganelo is NOT Marmil Olorga.** Different people, different schedules, adjacent on any
alphabetical list.

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
