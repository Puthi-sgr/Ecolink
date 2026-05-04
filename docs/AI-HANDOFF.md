# AI Handoff

## What Another AI Must Know First
- This app is already mid-refactor into shared layers. Do not ignore `shared/ui`, `shared/directives`, `shared/services`, and `shared/repositories`.
- `AGENT.md` is the fast summary. This `docs/` folder is the deeper reference.
- Planner is the canonical workflow workspace.
- The router is custom and hash-based.
- The app is frontend-only and mock-backed.

## Safe Defaults
- Prefer existing shared helpers over new page-local abstractions
- Prefer repository/service usage over direct data imports
- Prefer dialog primitives over ad hoc overlay JSX
- Prefer planner deep links over duplicating workflow detail screens
- Current collaboration preference is lighter-touch verification:
  - do not run `npm run lint` by default for every small visual change
  - do not run `npm run build` for every small tweak
  - verify only when the user asks or the change is structurally risky

## Things To Avoid
- Do not add `react-router`
- Do not add browser `alert()` / `confirm()` back into active flows
- Do not reintroduce feature-local forks for packages or workflow data
- Do not bypass `subscribeToHashRouteChanges()` for query-driven route logic
- Do not invent a second workflow workspace outside planner
- Do not re-add duplicated package facts to the request sidebar. Duration, meeting point, capacity, and activity belong in the main practical trip details area.
- Do not re-add the old Learning Outcomes section to package overview unless explicitly requested.
- Do not make the request sidebar sticky by default; current direction is grouped and non-sticky.
- Do not restore the old separate `ExperiencePreview` section. The schedule is now the merged preview/storytelling module.
- Do not make every package-detail image previewable. Preview is opt-in via `ImagePreviewLightbox`, and current accepted use is schedule imagery only.

## High-Risk Areas
- Hash query syncing
- Planner/request/trip linkage
- Package detail request flow
- Admin payment and approval-pack interactions
- Shared dialog accessibility
- Schedule parsing and schedule presentation, because data mixes `Day N - ...` lines and time-based lines

## Current Package Detail UI Direction
- Package overview uses a readable one-column main flow because the request sidebar already creates a second major column.
- `Why this site works for academic travel` is now an editorial block with a left heading and three bordered insight cards on the right.
- Practical trip details and operational checklist are now one merged split module, not two disconnected sections.
- Typical schedule is the merged schedule/experience module:
  - left day-selector rail
  - right image stage
  - active text above the image
  - full-height black gradient overlay behind the text
- Trust snapshot is compact: score, stars, verification row, review count, and `View detail`.
- The request sidebar should feel like a soft editorial request-prep panel:
  - one rounded outer shell
  - white/off-white surfaces
  - light dividers instead of nested cards
  - minimal ambient shadow
  - green action/icon emphasis
  - clay only for the final faculty action band

## If You Need To Change UX
- First check whether the behavior already belongs in:
  - `shared/services`
  - `shared/repositories`
  - `shared/ui`
  - `shared/components`
- If yes, change the shared layer first

## Verification Before Hand-Off
- Run:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
- If any of those fail, do not assume the next AI will infer what broke
- Exception: during active collaboration, the current user preference is to skip routine lint/build for small visual edits unless explicitly requested.
