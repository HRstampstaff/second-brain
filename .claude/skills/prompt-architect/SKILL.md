---
name: prompt-architect
description: Turn vague requests into engineered, role-based prompts ready to copy into any LLM. Use when the user wants a prompt generated for them to use elsewhere, not when they want Claude to do a task directly. Triggers on the slash command "/prompt" and on phrases like "write me a prompt for...", "engineer a prompt that...", "help me prompt Claude to...", "I need a prompt for...", "generate/build/draft/craft a prompt...". Do NOT trigger when the user is asking Claude to do the task itself, when "prompt" appears in a non-LLM context (login prompt, command prompt, modal prompt), when the user wants existing non-prompt copy rewritten, or when asking a conceptual question about prompt engineering.
---
# Prompt Architect

**Version: 1.0 - 2026-08-10**

## Overview

This skill converts vague user requests into production-ready, role-based prompts that pull the best possible output from Claude or any capable LLM. Every generated prompt opens with a precise role assignment, includes the context and constraints the model needs, and returns as a single copy-ready code block. Built for operators who use LLMs daily across marketing, technical work, strategy, hiring, and operations and need the prompt to do the heavy lifting the first time.

## When to Use

Fire this skill when the user wants a prompt they can copy and paste into Claude, ChatGPT, Gemini, or another LLM later.

Trigger examples:
- `/prompt`
- "Write me a prompt for generating weekly content ideas"
- "Engineer a prompt that audits my Airtable base structure"
- "Help me prompt Claude to draft listing descriptions"
- "I need a prompt for screening VA candidates"
- "Generate a prompt to turn my transcripts into captions"
- "Build a prompt that outputs a sales call scorecard"
- "Craft a prompt for weekly financial reviews"

## When NOT to Use

Do not fire when:
- The user is asking Claude to do the task directly. "Write me a blog post about X" means write the post, not build a prompt about writing the post.
- "Prompt" appears in passing in a non-LLM context. "The login prompt isn't firing" or "at the command prompt, type..." is not a prompt request.
- The user wants existing copy, an SOP, or a document rewritten or improved (and it is not itself a prompt).
- The user is asking a conceptual question about prompt engineering. "What makes a good prompt structure?" deserves a direct answer, not a generated prompt.

When in doubt, confirm once: "Do you want a prompt to use somewhere else, or should I just do the task for you now?"

## Workflow

1. **Confirm intent** if it is ambiguous whether the user wants a prompt generated or the task done directly. Ask once, then proceed.

2. **Ask 2 to 4 clarifying questions** using the question bank below. Use `ask_user_input_v0` with tappable button options when the environment supports it. Free-text only as a fallback. Target the highest-leverage unknowns first: audience, tone, output format, constraints, success criteria, scope.

3. **Engineer the prompt** using the six framework rules. Build on what the user said. Do not just repeat it back in fancier language.

4. **Self-audit** against the seven quality criteria before returning.

5. **Return the prompt** inside a single code block with one or two sentences of framing. No long explanations. No postamble beyond a single line on how to use it if needed.

## Framework Rules (Non-Negotiable)

### 1. Assign a specific role
Every prompt opens with "Act as [role]" where the role is chosen with precision.

Not: "Act as a writer."
Yes: "Act as a senior direct-response copywriter specializing in high-ticket B2B SaaS launches with 10-plus years writing for bootstrapped founders."

Not: "Act as a consultant."
Yes: "Act as a revenue operations consultant with direct experience scaling bootstrapped SaaS from zero to one million in ARR without a sales team."

### 2. Always ask 2 to 4 clarifying questions before drafting
Never skip this step, even when the request seems clear. Use the question bank below. When possible, ask via tappable buttons via `ask_user_input_v0` instead of free-text.

### 3. Build on the request, never just repeat it
The engineered prompt must add context, constraints, role precision, and specificity the user did not mention but a strong output requires. If the generated prompt only restates the request, it has failed.

### 4. Use square brackets for every swappable variable
Role specifics, audience, tone, length, format, industry, deliverable type, constraints, examples. Anything the user might want to change later goes in [BRACKETS]. Future reuse should be simple find-and-replace.

### 5. Engineer for output quality
Every generated prompt must explicitly include:
- Role
- Context the model needs to do the job
- Constraints and boundaries
- Desired output format
- Quality criteria or success definition
- Examples or references when they would help

### 6. Return inside a single code block, ready to copy
One or two sentences of framing before or after the block. No long explanations. No breakdown of your reasoning.

## Clarifying Question Bank

Pull the 2 to 4 highest-leverage questions from the relevant category. Present as tappable options via `ask_user_input_v0` whenever possible.

### Content and Copywriting
- Who is the reader and what do they already believe or know about this topic?
- What is the single action you want them to take after reading?
- Platform and length: Instagram caption, email, LinkedIn post, blog, landing page, ad?
- What tone: punchy and direct, warm and story-driven, authoritative and technical, playful?
- Any existing copy or voice reference the output should match?

### Code and Technical
- Language, framework, and runtime environment?
- What does the input look like and what should the output look like?
- Constraints: performance, dependencies, style guide, compatibility?
- New build, bug fix, or refactor of existing code?
- Output scope: code only, code plus tests, code plus inline explanation, code plus docs?

### Strategy and Business
- What decision is this prompt supposed to help you make?
- Time horizon: this week, this quarter, this year?
- Constraints: budget, team size, runway, existing stack, capacity?
- What data or context will you paste in when you run it?
- Do you want options and tradeoffs, or a single recommendation?

### SOPs and Operations
- Who is executing this process: owner, VA, contractor, automation?
- How often does it run: one-off, weekly, every ticket?
- What tools are involved and in what order?
- What triggers the start and what defines done?
- What edge cases or exceptions need to be handled?

### Hiring and Recruiting
- Role and seniority level?
- Stage: resume screen, first call, deep interview, paid test, reference check?
- Non-negotiable skills versus nice-to-haves?
- What does success look like in the first 30, 60, and 90 days?
- What work-style or personality fit matters for this role?

### Sales and Marketing
- Offer, price point, and stage of funnel?
- Avatar: job title, pain point, current alternative, level of awareness?
- Primary objection you need to handle?
- Call to action and landing destination?
- Persuasive, educational, or a hybrid?

## Output Format Spec

Return the finished prompt exactly like this:

One to two sentence framing explaining how to use it.

```
Act as [specific role with specialty and experience marker].

Context:
[What the model needs to know to do this job well. Include audience, situation, stakes, anything that would change the answer.]

Your task:
[Clear statement of the deliverable in one or two sentences.]

Inputs you will work with:
- [Input 1, e.g., pasted transcript]
- [Input 2, e.g., attached file]

Constraints:
- [Constraint 1]
- [Constraint 2]
- [Constraint 3]

Output format:
[Exact structure the model should return. Headers, sections, bullet rules, length, etc.]

Quality criteria:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

Before you start, ask me [N] clarifying questions if any key detail is missing.

Here is the material to work with:
[PASTE INPUT]
```

One line after the block if needed (e.g., "Paste your transcript where indicated.") Nothing more.

## Full Worked Example

**User request:** "Write me a prompt for screening sales hires."

**Claude asks (via tappable buttons):**

1. What sales role are you screening for?
   - SDR (outbound prospecting)
   - Account Executive (full cycle close)
   - Founder-led or hybrid seller
   - Sales ops or RevOps

2. Where in the funnel is this prompt running?
   - First screen (resume plus 15-minute call notes)
   - Deep interview (60-minute conversation)
   - Paid test project scoring

3. What is the candidate actually selling?
   - High-ticket SaaS (over $10k ACV)
   - Low-ticket SaaS or digital product
   - Services or consulting
   - Physical product

4. What output do you want?
   - Scorecard with numeric ratings
   - Written assessment paragraph
   - Red flag and green flag bullets
   - All three

**User answers:** AE full cycle, deep interview, high-ticket SaaS, all three.

**Final prompt returned:**

Copy this into Claude, paste your interview transcript where indicated, and run it.

```
Act as a senior sales hiring manager with 10-plus years building full-cycle Account Executive teams at bootstrapped B2B SaaS companies with ACVs above $10,000.

Context:
You are screening a candidate for an Account Executive role that owns the full cycle from qualified opportunity to closed won. The candidate will sell a high-ticket SaaS product ($[ACV]) to [ICP: job title and company size]. The founder is still closing deals today and needs this hire to take over founder-led selling within [TIMEFRAME]. Pedigree matters less than evidence of self-sourced pipeline and closed revenue in a comparable motion.

Your task:
Review the 60-minute interview transcript or structured notes I paste below and produce a hiring assessment.

Inputs you will work with:
- Full interview transcript or structured notes
- Candidate resume or LinkedIn summary if provided
- Any written responses to take-home questions

Constraints:
- Score only what you see evidence for. If a dimension was not tested, mark it "not assessed" and suggest one follow-up question.
- Do not invent qualifications. Quote the candidate directly when citing strengths or concerns.
- Weight self-sourced closed revenue higher than company logos on the resume.
- No hedging. If the candidate is a pass, say pass.

Output format:

SCORECARD (1 to 5, one-sentence justification each):
- Discovery skill
- Objection handling
- Commercial instinct and pricing confidence
- Pipeline generation and self-sourcing
- Coachability and self-awareness
- Written and verbal clarity
- Fit with early-stage ambiguity

GREEN FLAGS:
[Bulleted, specific, quote the candidate where possible]

RED FLAGS:
[Bulleted, specific, quote the candidate where possible]

WRITTEN ASSESSMENT:
[One paragraph, 4 to 6 sentences, plain-English summary of the candidate.]

RECOMMENDED NEXT STEP:
One of: advance to paid test, advance to founder final, pass, request more info. Include a one-sentence rationale.

FOLLOW-UP QUESTIONS (3 to 5):
Specific questions to close gaps before a final decision.

Quality criteria:
- Every rating is backed by specific evidence, not vibes.
- Red flags are stated plainly, not softened.
- The recommended next step is unambiguous.
- The full output is readable in under 3 minutes.

Before you start, ask me 2 clarifying questions if any key detail about the role, ICP, or ACV is missing.

Here is the interview material:
[PASTE TRANSCRIPT OR NOTES]
```

Paste your transcript where indicated and Claude will return the assessment.

## Self-Check Quality Criteria

Before returning the prompt, audit it against these seven criteria. If any fail, rewrite before sending.

1. **Role is specific.** Not "act as a writer" but "act as a [specialty] [role] with [experience marker]." The role tells the model who to be and at what level.

2. **Every swappable variable is in [brackets].** Future reuse should be a simple find-and-replace. Audience, tone, industry, price point, timeframe, format, length.

3. **Context was added beyond the original request.** The prompt includes constraints, success criteria, or edge-case handling the user did not mention but a strong output requires.

4. **Output format is explicit.** The model knows the exact structure to return: sections, bullet rules, length, order.

5. **Zero em dashes.** Use commas, periods, colons, or parentheses instead.

6. **No AI-generic phrasing.** Cut "delve," "leverage," "robust," "seamless," "unlock," "journey," "comprehensive solution," "navigate the landscape," "in today's fast-paced world," and similar. Write how a real operator talks.

7. **Self-contained.** A stranger could paste this prompt into a fresh chat and get a strong result without needing any follow-up explanation from you.
