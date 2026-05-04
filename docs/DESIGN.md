# Design

## Current Source Of Truth
- This file reflects the accepted implementation direction.
- If older notes, screenshots, or exploratory concepts conflict with this file, this file wins.
- The app is editorial, calm, and structured. It should not read like a generic travel marketplace or a dashboard template.

## Typography
- Global font is `Lora`.
- Both `--font-sans` and `--font-serif` currently resolve to `Lora`.
- Do not introduce `Inter`, `Newsreader`, `Manrope`, or mixed replacement stacks unless the user explicitly requests a typography redesign.
- Use serif weight and scale, not decorative effects, to create hierarchy.

## Color System
- Primary accent is eco green.
- Secondary accent is orange and should be used deliberately for contrast moments, badges, and selected supporting emphasis.
- Clay / deep blue-grey is reserved for stronger grounded panels such as practical-details or heavier request-prep surfaces.
- Core surfaces remain white or soft off-white. Avoid turning the app into a dark UI by default.

## Borders, Shadows, And Surfaces
- Prefer soft shells with:
  - `rounded-[28px]` to `rounded-[32px]`
  - subtle `border-border/60` to `border-border/70`
  - low ambient shadow only
- Use one parent shell where the content needs grouping.
- Avoid stacking nested cards inside already boxed containers.
- When a section feels cluttered, remove inner boxes first and rely on spacing, dividers, and alignment.

## Layout Rules
- Shared horizontal gutter pattern:
  - `px-4 md:px-5 xl:px-6`
- The public package detail uses a centered sticky secondary nav below the main nav.
- Main package-detail reading flow should stay calm beside the request sidebar. Avoid turning the page into three competing columns of dense information.

## Navigation Hierarchy
- Main nav must remain visually stronger than the package subnav.
- The package subnav should echo the main nav language, but stay smaller and clearly secondary.

## Catalog And Discovery
- Catalog remains map-first.
- Photo-view cards are information-forward.
- Whole-card navigation stays disabled.
- Only explicit controls should navigate.
- Discovery should continue to feel operational and useful, not decorative-only.

## Accepted Package Detail Patterns

### Hero
- The package hero belongs to the overview tab only.
- The simplified hero keeps the main package title and province/location line.
- Do not re-add the old top/bottom metadata pills or the old editorial eyebrow unless the user asks.

### Academic Travel Fit
- `Why this site works for academic travel` is now a strict editorial block:
  - left stacked title block
  - right side three equal bordered cards
  - each card uses icon, short headline, and compact explanatory copy
- The block should feel clean and structured, not like floating circles or a timeline.

### Practical Details + Operational Checklist
- These are now one merged split module.
- Left side:
  - darker grounded panel
  - practical facts only
  - icon + fact rows
- Right side:
  - white checklist panel
  - readiness items with icon, label, value, and short explanation
- Keep icon rows aligned to the first text line.

### Typical Schedule
- The old separate `ExperiencePreview` section is removed.
- The schedule is the merged experience/schedule surface.
- Accepted layout:
  - light outer shell
  - left rail with day selectors
  - active day uses a deeper green highlighted card treatment
  - right side is the active image
  - heading/detail text sits above the image
  - a black gradient overlay supports the text across the image height
- The left rail is structural. The right panel is the main storytelling surface.

### Trust Snapshot
- Trust rail is now a compact card, not a long vertical checklist.
- It includes:
  - large score
  - star row
  - small verification row
  - review count footer with `View detail`
- Current verification wording is:
  - `Ministry verified`
  - `NGO verified`

### Request Sidebar
- The sidebar remains a request-preparation panel.
- It should keep:
  - one outer shell
  - soft white / off-white surfaces
  - dividers instead of nested cards
  - non-sticky behavior unless explicitly requested
- Do not duplicate practical facts already shown in the main content.

## Image Preview Pattern
- Image preview should be opt-in only.
- Use [`shared/components/ImagePreviewLightbox.tsx`](../shared/components/ImagePreviewLightbox.tsx) as the generic adapter.
- Wrapping an image with `ImagePreviewLightbox` makes it previewable.
- Unwrapped images should remain normal static images.
- Current accepted use:
  - schedule imagery is previewable
  - other package-detail imagery is not previewable by default

## Interaction Rules
- If icon/text alignment looks wrong, fix the shared primitive or the repeated row structure instead of adding local visual hacks.
- Prefer meaningful selected states over decorative hover-only behavior.
- Avoid dead-end CTAs.

## Things To Avoid
- Do not reintroduce dense nested box stacks.
- Do not revert the schedule back to a separate preview section plus separate timeline.
- Do not add duplicated explanatory copy in both the selector rail and the image panel unless the user explicitly asks.
- Do not casually add new accent colors into package detail without tying them to the existing green / orange / clay system.
