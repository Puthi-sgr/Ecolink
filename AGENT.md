# Project Context: EcoLink Portal

## 0. Docs Map
- Use [`docs/README.md`](./docs/README.md) as the doc index.
- Additional focused docs now exist for architecture, design, routing, workflow, data/services, and AI handoff.
- `AGENT.md` is the high-signal overview; the `docs/` folder is the deeper reference set.

## 1. Runtime, Tooling, and Core Architecture
- Build tool: Vite 6 with `@vitejs/plugin-react`.
- Framework: React 18 with functional components and hooks.
- Language: TypeScript.
- Routing: Custom hash-based router in [`app/AppRouter.tsx`](./app/AppRouter.tsx). Do not introduce `react-router` unless the app architecture is intentionally being replaced.
- State management: React Context with `AuthContext`, `TripContext`, `FavoritesContext`, and `PlannerContext`.
- Shared architecture layers:
  - `shared/ui/` for reusable visual primitives and dialog shells
  - `shared/directives/` for behavioral reuse (`useDisclosure`, `ActionGate`, `ConfirmAction`, etc.)
  - `shared/services/` for workflow/trip/navigation orchestration
  - `shared/repositories/` for shared mock-backed accessors
  - `shared/domain/` for pure domain presentation helpers
- Shared workflow domain: Derived operations selectors live in [`shared/utils/operationsModel.ts`](./shared/utils/operationsModel.ts) and are surfaced through [`shared/hooks/useOperationsRecords.ts`](./shared/hooks/useOperationsRecords.ts).
- Styling: Tailwind via CDN script in [`index.html`](./index.html), driven by CSS variables declared in `:root`.
- Map stack: `leaflet` + `react-leaflet`.
- Assets/images: Cloudinary helpers in `shared/utils/cld` and [`shared/atoms/CldImage.tsx`](./shared/atoms/CldImage.tsx).
- Opt-in image preview: [`shared/components/ImagePreviewLightbox.tsx`](./shared/components/ImagePreviewLightbox.tsx) is the generic adapter for previewable images. Wrapping makes an image previewable; unwrapped images should remain normal.

## 2. High-Level Structure
```text
/
|-- index.html                  # Tailwind config, CSS variables, global print styles
|-- index.tsx                   # React entry point
|-- App.tsx                     # Provider composition
|-- app/
|   |-- AppRouter.tsx           # Hash routing, route matching, lazy route loading
|   |-- AuthContext.tsx         # Mock auth/session state
|   |-- TripContext.tsx         # Mutable trip records
|   |-- FavoritesContext.tsx    # LocalStorage-backed favorites
|   |-- PlannerContext.tsx      # LocalStorage-backed plans, requests, compare state
|   `-- guards/RoleGuard.tsx    # Role protection with demo auto-login
|-- shared/
|   |-- atoms/                  # Button, Input, Badge, FavoriteButton, etc.
|   |-- molecules/              # Card
|   |-- ui/                     # Dialogs, metric cards, surface sections, small shared shells
|   |-- directives/             # Behavioral hooks/components for action gating and dialog state
|   |-- components/             # Workflow/document/explorer shared UI
|   |-- hooks/                  # Shared reusable hooks
|   |-- domain/                 # Pure domain/presentation helpers
|   |-- repositories/           # Shared mock data accessors
|   |-- services/               # Workflow, trip, route orchestration
|   |-- data/                   # Shared mock package/about/planner data
|   |-- types/                  # App-wide TypeScript interfaces
|   `-- utils/                  # Routing, workflow, explorer, Cloudinary, selectors
`-- features/
    |-- public/                 # Catalog, planner, destinations, package detail UX
    |-- faculty/                # Faculty portal
    |-- admin/                  # Admin portal
    `-- travel-guide/           # Standalone travel guide experience
```

## 3. Current Verification Workflow
- Lint: `npm run lint`
- Tests: `npm run test`
- Watch tests: `npm run test:watch`
- Production build: `npm run build`
- Current user preference:
  - do not run `npm run lint` by default for every small change
  - do not run `npm run build` after every small UI tweak
- For small visual-only edits, default to no verification unless the user asks or the change is structurally risky.
- Reserve `npm run build` for routing/tooling/dependency changes, larger structural work, or explicit user request.
- Test stack: Vitest + React Testing Library + jsdom via [`vitest.config.ts`](./vitest.config.ts)
- Lint rules: ESLint 9 + TypeScript + `react-hooks` + `unused-imports` via [`eslint.config.js`](./eslint.config.js)
- There is a known non-fatal Node experimental warning during Vitest from the `css-color` dependency chain.

## 4. Typography and Global Styling Rules
- Global font: `Lora`
- In [`index.html`](./index.html):
  - `--font-sans` = `Lora`
  - `--font-serif` = `Lora`
  - `body` uses `var(--font-serif)`
  - `.leaflet-container` also uses `var(--font-serif)`
- Do not reintroduce Inter unless doing an intentional full typography redesign.
- Print styles are also defined in [`index.html`](./index.html). If document-mode output changes, update the shared print rules there rather than inventing page-local print hacks.

## 5. Routing Rules and Hash Sync Discipline
- All navigation is hash-based.
- Route matching is handled manually in [`app/AppRouter.tsx`](./app/AppRouter.tsx).
- Non-home routes are lazy-loaded in the router.
- The shared routing helpers live in [`shared/utils/hashRoute.ts`](./shared/utils/hashRoute.ts).
- Important: query-only hash updates may use `history.replaceState`, so app code must subscribe through `subscribeToHashRouteChanges()` instead of listening to native `hashchange` directly.
- If you add any screen or hook that reacts to route/query changes, use `subscribeToHashRouteChanges()` from [`shared/utils/hashRoute.ts`](./shared/utils/hashRoute.ts).
- Do not hand-roll hash parsing inside pages when shared helpers already exist.

## 6. Public, Faculty, and Admin Route Model
- Public routes:
  - `/`
  - `/about`
  - `/favorites`
  - `/planner`
  - `/destinations`
  - `/travel-guide`
  - `/package/:packageId/:tab?`
- Faculty routes:
  - `/faculty`
  - `/faculty/dashboard`
  - `/faculty/trips/:tripId`
- Admin routes:
  - `/admin`
  - `/admin/dashboard`
  - `/admin/trips/:tripId`

## 7. Authentication and Protection
- Auth is mock-only. `login()` creates an in-memory mock user.
- `RoleGuard` still supports demo auto-login behavior for protected routes.
- Public, faculty, and admin experiences are all frontend-only prototypes.
- Do not add backend assumptions, auth persistence, or server-derived permissions unless explicitly requested.

## 8. Public Shell and Layout Conventions
- [`features/public/layouts/PublicLayout.tsx`](./features/public/layouts/PublicLayout.tsx) is the public shell.
- Public horizontal gutters are normalized to:
  - `px-4 md:px-5 xl:px-6`
- This gutter pattern is also used broadly across faculty/admin/travel-guide wrappers.
- Public layout responsibilities:
  - top navigation
  - mobile menu
  - skip link
  - prototype notice
  - print-mode shell removal
- Do not add page-local fake shells when the shared shell already covers the pattern.

## 9. Canonical Workflow Architecture
- `#/planner` is now the canonical full-detail workflow surface.
- Full workflow detail should live in the planner, not be duplicated across package, faculty, and admin screens.
- Current planner query model:
  - `#/planner?plan=<id>&view=brief|timeline`
  - `#/planner?request=<id>&view=timeline|documents|notes|history`
  - optional `document=brief|itinerary|approval-pack`
  - optional `audience=requester|faculty|admin`
  - optional `print=1`
- Package detail, faculty dashboard, and admin dashboard should show summary UI and deep-link into planner for full workflow work.

## 10. Shared Workflow UI Layers
- Compact summary layer:
  - [`shared/components/WorkflowSummaryCard.tsx`](./shared/components/WorkflowSummaryCard.tsx)
  - Used on package detail, faculty dashboard, and admin dashboard
- Full-detail planner layer:
  - [`shared/components/WorkflowWorkspace.tsx`](./shared/components/WorkflowWorkspace.tsx)
  - Used only in planner
- Do not keep expanding package/faculty/admin pages into parallel full-detail workflow screens. Use the planner.

## 11. Workflow Data Model Rules
- Shared workflow types live in [`shared/types/index.ts`](./shared/types/index.ts)
- Important workflow additions:
  - `WorkflowWorkspaceView`
  - `WorkflowNoteScope`
  - `DocumentAudience`
  - `WorkflowHistoryEvent`
- Quote requests are normalized through [`shared/utils/requestWorkflow.ts`](./shared/utils/requestWorkflow.ts)
- Request notes are explicitly split into:
  - `requester`
  - `internal`
- Public/package surfaces should expose requester-visible notes only.
- Faculty/admin may expose both scopes when appropriate.
- History is a distinct stream from timeline and notes.

## 12. Operations-Domain Rules
- Plans, requests, and trips are bridged through derived records in [`shared/utils/operationsModel.ts`](./shared/utils/operationsModel.ts)
- Screens should prefer `useOperationsRecords()` over directly filtering `plans`, `quoteRequests`, or `trips`
- ESLint is configured to discourage direct inline filtering of these arrays inside page files
- Request-to-trip linkage is derived through shared selector logic, not page-local matching

## 13. Planner Context Responsibilities
- [`app/PlannerContext.tsx`](./app/PlannerContext.tsx) owns:
  - saved plans
  - quote requests
  - compare tray IDs
  - plan duplication
  - request creation/submission/reopen
  - scoped note creation
- It is LocalStorage-backed and prototype-only.
- It now delegates creation/update lifecycle logic to [`shared/services/workflowService.ts`](./shared/services/workflowService.ts) and bootstraps from [`shared/repositories/plannerRepository.ts`](./shared/repositories/plannerRepository.ts).
- Do not add a second planner-like state container elsewhere.

## 13b. Trip Context Responsibilities
- [`app/TripContext.tsx`](./app/TripContext.tsx) is now LocalStorage-backed.
- Initial trip hydration comes from [`shared/repositories/packageRepository.ts`](./shared/repositories/packageRepository.ts).
- Admin/public flows should prefer [`shared/services/tripService.ts`](./shared/services/tripService.ts) for trip lifecycle transitions instead of hand-rolling status mutations in page files.

## 14. Catalog and Discovery Rules
Primary files:
- [`features/public/pages/CBETCatalog.tsx`](./features/public/pages/CBETCatalog.tsx)
- [`features/public/pages/DestinationsPage.tsx`](./features/public/pages/DestinationsPage.tsx)
- [`shared/hooks/usePackageDiscovery.ts`](./shared/hooks/usePackageDiscovery.ts)

Rules:
- The catalog remains map-first.
- Main public discovery modes:
  - map view
  - photo view
- Discovery state is URL-synced through `usePackageDiscovery()`.
- App pages should source package data from [`shared/repositories/packageRepository.ts`](./shared/repositories/packageRepository.ts), not direct feature-local `useCBETPackages()` hooks.
- Do not manually reimplement filter/query syncing inside pages.
- Discovery uses the same shared package metadata across:
  - catalog
  - destinations
  - compare tray
  - package detail

## 15. Catalog Grid Rules
Primary file:
- [`features/public/components/CatalogGrid.tsx`](./features/public/components/CatalogGrid.tsx)

Rules that should be preserved unless intentionally changing product behavior:
- Whole-card navigation is intentionally removed.
- Only explicit controls navigate:
  - activity pill
  - details/request button
- Each card can toggle between photo and mini-map.
- Pagination is row-based, not a fixed item count.
- The card now includes visual explorer information:
  - route label
  - logistics friction tone
  - availability strip
- Keep the card information-forward. Do not regress to decorative-only marketing cards.

## 16. Compare Tray Rules
Primary file:
- [`features/public/components/PackageCompareTray.tsx`](./features/public/components/PackageCompareTray.tsx)

Rules:
- Compare up to three packages.
- The tray is sticky near the bottom on larger screens.
- The compare workspace should remain keyboard-usable and horizontally scrollable on smaller widths.
- It now includes visual explorer content per package column.
- Preserve direct `Add to plan` actions.

## 17. Shared Visual Explorer Layer
Primary files:
- [`shared/utils/packageExplorer.ts`](./shared/utils/packageExplorer.ts)
- [`shared/components/PackageExplorerInsights.tsx`](./shared/components/PackageExplorerInsights.tsx)

This layer is the source of visual package decision aids:
- month-by-month availability strip
- Phnom Penh routing/travel profile
- logistics-friction summary
- comfort/accessibility indicators
- alternative-package reason callouts

If package-selection UX is being adjusted, prefer extending this shared layer rather than inventing page-local heuristics.

## 18. Package Detail Ownership Model
Primary files:
- [`features/public/pages/PublicPackageDetail/PublicPackageDetails.tsx`](./features/public/pages/PublicPackageDetail/PublicPackageDetails.tsx)
- [`features/public/pages/PublicPackageDetail/layout/PublicPackageDetailLayout.tsx`](./features/public/pages/PublicPackageDetail/layout/PublicPackageDetailLayout.tsx)
- [`features/public/pages/PublicPackageDetail/pages/PublicPackageDetailOverviewAndItinery.tsx`](./features/public/pages/PublicPackageDetail/pages/PublicPackageDetailOverviewAndItinery.tsx)

Rules:
- The hero is intentionally owned by the overview tab only.
- Do not move the hero back into the shared layout unless intentionally restoring cross-tab hero behavior.
- Package detail should remain a lightweight request-prep and request-summary surface.
- Once a plan/request exists, deep workflow actions should route into planner instead of endlessly expanding the package page.
- Overview content should avoid dense two-column information blocks when the request sidebar is present. Prefer a readable one-column main flow with compact, line-based support modules.
- The current overview intentionally removes the old Learning Outcomes section. Do not re-add it unless the user asks for it.
- The academic travel fit module is now a strict editorial block:
  - left stacked heading
  - right three bordered insight cards
  - no circular timeline treatment
- The practical trip details module should show only core facts. Do not reintroduce `Best for`, repeated helper copy, or duplicated sidebar facts there.
- Practical details and operational checklist are now one merged split module:
  - left grounded details panel
  - right white readiness panel
  - both sides use aligned icon/text rows
- Operational checklist should remain visual and explanatory, using readiness tiles/rows with icons and short "why it matters" copy rather than a plain checklist card.
- The old separate `ExperiencePreview` section is intentionally removed.
- `TypicalSchedule.tsx` is now the merged experience/schedule surface:
  - left day selector rail
  - right active image
  - story text lives above the image
  - image uses a full-height black gradient overlay for readability
  - only schedule imagery is previewable through `ImagePreviewLightbox`
- Trust UI is now a compact snapshot card only. Do not reintroduce the removed lower response-speed / lead-time / confidence list unless the user explicitly asks.

## 19. Detail Subnav Rules
Primary file:
- [`features/public/pages/PublicPackageDetail/components/PackageDetailNav.tsx`](./features/public/pages/PublicPackageDetail/components/PackageDetailNav.tsx)

Rules:
- The package subnav is a centered sticky secondary bar.
- It should visually echo the main nav while staying smaller in scale.
- Do not reintroduce a left-rail detail nav unless intentionally redesigning the page.

## 20. Booking Sidebar Rules
Primary file:
- [`features/public/pages/PublicPackageDetail/components/BookingWidget.tsx`](./features/public/pages/PublicPackageDetail/components/BookingWidget.tsx)

Rules:
- The sidebar is a request-preparation panel, not a generic long form.
- It includes:
  - pricing block
  - readiness checklist
  - faculty vs non-faculty action paths
- It should not duplicate package facts already shown in the main practical trip details section. Keep duration, meeting point, capacity, and activity out of the sidebar unless the user explicitly asks to restore them.
- Public users should get meaningful prototype actions:
  - save to planner
  - download/open brief
  - sign in for protected flow
- Faculty users prepare the request, then move into workflow review.
- Package detail request creation now routes through [`shared/services/workflowService.ts`](./shared/services/workflowService.ts) and trip creation through [`shared/services/tripService.ts`](./shared/services/tripService.ts).
- Current sidebar aesthetic:
  - one soft outer shell, not nested card stacks
  - large radius around the shell, currently in the `rounded-[32px]` family
  - white/off-white surfaces with subtle `bg-white/96` and `bg-surface-2/75`
  - light separators via `divide-border/65` and `border-border/65`
  - minimal ambient shadow from the shared `Card`, never a heavy floating box
  - serif headings, uppercase micro-labels, muted body copy
  - green for action/icon emphasis and clay only for the final faculty action band
- Do not make the sidebar sticky unless the user explicitly asks. Recent direction is grouped, non-sticky, and lower visual noise.
- If the sidebar starts feeling cluttered, remove nested boxes first and use dividers, spacing, and section rhythm before adding new cards.

## 21. Role-Specific Document Rules
Primary files:
- [`shared/components/WorkflowDocumentView.tsx`](./shared/components/WorkflowDocumentView.tsx)
- [`shared/components/TripBriefPreview.tsx`](./shared/components/TripBriefPreview.tsx)

Rules:
- One shared document engine renders different audiences:
  - requester
  - faculty
  - admin
- Supported artifacts:
  - brief
  - itinerary
  - approval-pack
- Planner is the main document workspace for active workflow records.
- Print/export still uses the browser print path, but must render through shared document mode.

## 22. Faculty and Admin Dashboard Rules
Primary files:
- [`features/faculty/pages/FacultyDashboard.tsx`](./features/faculty/pages/FacultyDashboard.tsx)
- [`features/admin/pages/AdminDashboard.tsx`](./features/admin/pages/AdminDashboard.tsx)

Rules:
- These dashboards are now summary-oriented, not canonical workflow detail destinations.
- Their primary workflow action should be `Open in planner`.
- Keep operational overviews, counts, and lane summaries here.
- Dashboard package/project sources should come from shared repositories, not feature-local mock files.
- Do not duplicate the planner's full notes/documents/history workspace inside these dashboards.

## 22b. Shared Route Service Rules
- [`shared/services/plannerRouteService.ts`](./shared/services/plannerRouteService.ts) is the preferred app-level route helper for planner deep links.
- Use it when a feature needs to build/open/replace planner workspace state.
- Low-level query parsing and subscription still live in [`shared/utils/hashRoute.ts`](./shared/utils/hashRoute.ts); do not duplicate that logic in page files.

## 23b. Shared Dialog Rules
- Shared modal primitives now live in [`shared/ui/Dialog.tsx`](./shared/ui/Dialog.tsx) and [`shared/ui/ConfirmDialog.tsx`](./shared/ui/ConfirmDialog.tsx).
- The admin approval-pack generator, payment verification, and request confirmation flows use these shared dialog shells.
- Do not add new `fixed inset-0` one-off overlays when the shared dialog layer can express the interaction.
- Browser `alert()` / `confirm()` usage has been removed from active app flows; keep it that way.

## 23. Button and Primitive Rules
Primary file:
- [`shared/atoms/Button.tsx`](./shared/atoms/Button.tsx)

`Button` is normalized with:
- `inline-flex`
- `items-center`
- `justify-center`
- `gap-2`
- `leading-none`

If icon/text alignment looks wrong, fix the primitive first before adding one-off local hacks.

## 24. Current Technical Realities and Caveats
- The app remains frontend-only and prototype-backed.
- Mock data lives in shared TypeScript data files and LocalStorage-backed contexts.
- `index.html` still contains an importmap block even though the app is built with Vite.
- The route-sync bug was fixed by introducing `subscribeToHashRouteChanges()`; do not bypass the shared helpers with raw `history.replaceState` usage in feature code.
- Role guards still use demo auto-login behavior.
- `features/public/components/BookingModal.tsx` was removed as dead legacy UI; the booking/request interaction path is now the package-detail booking widget plus shared confirmation dialog.

## 25. Change Discipline for the Next Agent
- Prefer shared primitives, shared hooks, shared selectors, and shared query helpers over page-local one-offs.
- Preserve these current UX decisions unless the user explicitly changes direction:
  - custom hash router
  - route-sync through shared hash helpers
  - map-first catalog
  - row-based photo-view pagination
  - no whole-card navigation in the photo grid
  - overview-only package hero
  - centered sticky detail subnav
  - canonical planner workspace for full workflow detail
  - role-specific documents on one shared rendering engine
  - visual package explorer driven from shared metadata
