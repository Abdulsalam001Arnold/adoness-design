# Adoness Design — Agent Behaviour Rules

## Purpose
This file governs how Claude Code behaves when running autonomously on the Adoness Design project. Read this alongside CLAUDE.md before executing any multi-step task.

---

## Allowed Actions
- Read any file in the project
- Write and edit files inside `src/`, `public/`, `design/` (read-only for design)
- Create new components, pages, hooks, types, and utility files
- Install npm packages when explicitly needed — always confirm the package name before installing
- Run `npm run dev`, `npm run build`, `npm run lint`, `npm run type-check`
- Rename files and refactor imports when part of a clearly scoped task

---

## Restricted Actions — Always Stop and Ask First
- **Never delete any file** without explicit confirmation
- **Never modify `.env`, `.env.local`, or any environment file**
- **Never push to git** — no `git commit`, `git push`, or branch operations
- **Never restructure the top-level folder layout** unless specifically asked
- **Never install a package that replaces an already-chosen tool** (e.g. do not add Framer Motion — GSAP is the animation library)
- **Never overwrite files in `/design`** — these are client references, treat as read-only
- **Never change the Tailwind config colour tokens** without being asked — brand colours are fixed

---

## Task Execution Approach

### Before Starting Any Task
1. Re-read the relevant section of `CLAUDE.md` for the area being worked on
2. Check if design reference files exist in `/design` for the page/section
3. Identify which files will be created or modified — list them before starting
4. If the task is ambiguous, ask one clarifying question before proceeding

### While Executing
- Work in small, logical steps — one component or section at a time
- After each file is written, mentally verify: correct imports, no TypeScript errors, Tailwind classes valid
- If a GSAP animation is being added, ensure `"use client"` is at the top of that component
- If the task spans more than 5 files, give a brief progress update between steps

### After Completing Any Task
Run these in order:
1. `npm run type-check` — zero TypeScript errors required before done
2. `npm run lint` — fix any lint errors before done
3. `npm run build` — confirm no build failures for significant changes
4. Summarise: what was created/changed, what was left out and why, any follow-up recommendations

---

## Debugging Behaviour
- When debugging, **read the full error message** before touching any code
- Identify the root cause — do not patch symptoms
- If a bug is in a file outside your current task scope, flag it rather than silently editing it
- For TypeScript errors: fix the type, not the error (never use `// @ts-ignore` or cast to `any`)
- For layout bugs: check mobile (375px) first, then scale up

---

## Improvisation Rules
Claude is allowed to improvise and make decisions within these boundaries:

**Allowed to decide independently:**
- Which Tailwind utility classes to use for spacing, sizing, and responsive behaviour
- How to structure a component internally (subcomponents, prop shapes)
- GSAP animation timing, easing, and stagger values — keep them elegant and subtle
- Where to add `loading` and `error` UI states
- How to split a large component into smaller reusable pieces

**Must match the mockup exactly:**
- Colours — always use CSS variable tokens from `globals.css`
- Font choices and weight hierarchy
- Overall layout composition and section order on each page
- Nav structure and link labels

**Must ask before doing:**
- Adding a new third-party library
- Creating a new top-level route not listed in CLAUDE.md
- Changing the chatbot request/response shape
- Any database, auth, or payment integration

---

## Component Creation Standards
When creating any new component autonomously:
```
1. Define TypeScript interface for props at the top of the file
2. Use named export (never default export for components)
3. Use server component by default — add "use client" only if required
4. Add a brief JSDoc comment above the component explaining what it does
5. Include responsive classes for mobile, tablet, and desktop
6. Reference design files in /design if this component appears in a mockup
```

---

## GSAP Specific Rules
```
1. Always import GSAP at the top: import gsap from 'gsap'
2. Register plugins at module level: gsap.registerPlugin(ScrollTrigger)
3. All animations inside useEffect
4. Always return cleanup: return () => { ctx.revert() } or tl.kill()
5. Use gsap.context() for scoped animations inside components
6. Never animate width, height, or display — only opacity, transform properties
```

---

## Testing Behaviour
- Write component logic in a way that is testable (pure functions, separated concerns)
- If asked to write tests, use the testing library already in the project
- Do not add a testing library autonomously — check what exists first
- For visual components, describe what should be tested rather than writing brittle snapshot tests

---

## Communication Style During Tasks
- Be concise — no lengthy preamble before starting work
- If blocked, say exactly what the blocker is in one sentence and what you need
- When a task is complete, give a 3–5 line summary: what was done, what files changed, what to check
- If you notice something broken that's outside the task scope, flag it in a "Side note:" at the end — don't fix it silently