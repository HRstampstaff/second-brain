# Approved PTO hours are split by the VA's scheduled hours per client

**Decided 2026-09-07 by Ailynn.**

## The problem

BambooHR's `time_off/requests` endpoint gives whole days only (`amount: {unit: "days", amount: "1"}`)
and never says which client the day belongs to. The payroll sheet needs hours per VA **per client**.
When a VA is scheduled with more than one client on the same day-of-week, something has to decide
where the PTO hours land.

## The decision

**Each client gets the hours that client actually lost, from the VA's declared schedule in the
Form Responses tab.**

A VA scheduled 4 hours with Client A and 4 hours with Client B on a Tuesday, who takes an approved
PTO day on a Tuesday, posts **4 PTO hours to Client A and 4 to Client B**. A half day
(`amount: "0.5"`) posts half of each.

This is not a division of one fixed day's worth between clients. It is each client being charged
the block it was scheduled to receive.

## Why

It matches what the clients are actually billed for and what the VA was actually rostered to do.
The alternative considered and rejected was assigning the whole day to whichever client happens to
sit in the Client 1 column of the Form Responses row, which is wrong every time the VA's Client 2
is the one who lost the day.

## What comes with it

**Every multi-client PTO day is still flagged in the join step's output**, even though it is now
computed automatically. Ailynn eyeballs the flagged rows rather than trusting the split silently.

## Still undecided

**What happens when PTO has not been approved by the time a cutoff check runs.** Flag and wait, or
pull without it and correct later. Not decided as of 2026-09-07.
