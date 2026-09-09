# "Post Admin Tasks" is the standard name for the post-meeting block

**Decided 2026-09-09 by Ailynn.**

## The decision

Every 15-minute post-meeting admin block on a coach's calendar is titled exactly
**`Post Admin Tasks`**. One name across all coaches. Existing blocks under the old names were
renamed rather than left alongside the new ones.

The block goes after **every TLVA (monthly or weekly), Discovery Call and Onboarding**, starting the
moment the meeting ends, 15 minutes, colour 5, no attendees.

Its description is the checklist Kate wrote on 2026-09-07:

1. get transcript of the call from your note taker
2. save notes in BambooHR
3. save notes in GHL
4. send recap email to clients - VAs copied

## Why it needed deciding

All three coaches had already invented this block independently, under three different names:
Kate `Post TLVA Admin`, Ann `Post TLVA`, Rafael `POST TLVA`. Left alone, that is three conventions
for one job, and no way to count coverage or spot a gap.

Ailynn was given the choice between matching each coach's existing name, standardizing without
touching the old ones, and standardizing plus renaming. She chose **standardize and rename**.

## What this does NOT cover

**Ann's daily 7:00am `Post TLVA` recurring series is a different thing and keeps its name.** It is a
general daily admin block, not tied to any meeting. Ann drags individual instances of that series out
to sit after meetings; those moved instances ARE post-meeting blocks and were renamed one instance at
a time. The parent series was never touched.

Renaming a single occurrence by its instance id only affects that occurrence. Never rename the parent
series to fix an instance.

## An Onboarding gets THREE blocks, not one

Ailynn's design, 2026-09-09. The three process docs map to three moments, so each one sits on its own
block at the moment it is used, rather than all three piling onto one.

| Block | When | Doc |
|---|---|---|
| `Pre Onboarding Prep` | 15 min ending as the call starts | New Client Pre-Onboarding Procedure (plus: make your copy of the checklist now) |
| `Onboarding Checklist` | exactly the same slot as the call | Onboarding_Checklist — make a copy |
| `Post Admin Tasks — Onboarding` | 15 min after the call ends | Post Onboarding Call Internal Process, then the usual admin |

The middle one deliberately sits on top of the real meeting and is set to **free** rather than busy,
so the coach does not read as double-booked to anyone checking their calendar.

## ⛔ The docs never go on the onboarding event itself

**Onboarding calls have the client as an attendee.** Rafael's 10 Sep call has
`cthompson@nationpointfs.com` on it. All three docs are internal, one is titled "Post Onboarding Call
**Internal** Process", and editing an event description also fires an update email to every attendee.
Putting them there would expose internal process to a client and announce it in the same move.

The general rule this is an instance of: **read the attendee list before editing any event.** A
coach's calendar is not an internal space. Client-facing events sit on it beside internal blocks, and
the description is the part the client reads.

## Standing work

Kept current by the routine **"Post Admin Tasks and onboarding blocks on the coaches' calendars"** in
the Routines table, running **daily** inside the daily pass. Ailynn set it daily rather than weekly on
2026-09-09: meetings get booked daily and sometimes same-day, so a weekly sweep would leave a new
meeting with no block. The routine is idempotent, so most days it finds nothing and that is the
expected result.

It creates internal blocks only and sends nothing, so it is not prepare-and-wait.

## Notes for next time

**Rafael's calendar does not appear in `list_calendars` even now that it is shared.** It has to be
reached by naming `rafael.gvaco@gmail.com` directly, the same quirk that applies to Ailynn's own
calendar. A calendar missing from that list is not evidence it is unshared; the `accessRole` on a
direct read is the only reliable test of whether a write will land.

**Renaming a recurring block:** pass the parent series id to rename every instance including future
ones, or an instance id (`series_id` + `_` + UTC start) to rename just one occurrence. Ann's needed
both, because she drags single instances of a daily series out to sit after meetings.
