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

## Standing work

Kept current by the routine **"Post Admin Tasks blocks on the coaches' calendars"** in the Routines
table, running **daily** inside the daily pass. Ailynn set it daily rather than weekly on 2026-09-09:
meetings get booked daily and sometimes same-day, so a weekly sweep would leave a new meeting with no
block after it. The routine is idempotent, so most days it finds nothing and that is the expected
result.

It creates internal blocks only and sends nothing, so it is not prepare-and-wait.

## Open

**Ann's 7:00am daily `Post TLVA` series keeps its name** until Ailynn says otherwise. That is the only
thing outstanding.

Rafael's calendar was read-only when this was first built and is no longer: he shared it on
2026-09-09, and his 18 blocks went in the same day. Worth knowing for next time - **his calendar does
not appear in `list_calendars` even now that it is shared.** It has to be reached by naming
`rafael.gvaco@gmail.com` directly, the same quirk that already applies to Ailynn's own calendar. A
missing calendar in that list is not evidence that it is unshared.
