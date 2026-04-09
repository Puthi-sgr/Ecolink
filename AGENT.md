# Project Context: EcoLink Portal

## 1. Runtime, Tooling, and Core Architecture
- **Build tool:** Vite 6 with `@vitejs/plugin-react`. This is not a browser-native importmap-only app in practice, even though `index.html` still contains an importmap block.
- **Framework:** React 18 with functional components and hooks.
- **Language:** TypeScript.
- **Routing:** Custom hash-based router in [`app/AppRouter.tsx`](./app/AppRouter.tsx). Do not introduce `react-router` unless explicitly refactoring the app architecture.
- **State management:** React Context (`AuthContext`, `TripContext`, `FavoritesContext`).
- **Styling:** Tailwind via CDN script in [`index.html`](./index.html). Tailwind tokens are driven from CSS variables defined in `:root` in that same file.
- **Map stack:** `leaflet` + `react-leaflet`.
- **Assets/images:** Cloudinary helpers in `shared/utils/cld` and `shared/atoms/CldImage.tsx`.

## 2. High-Level Structure
```text
/
├── index.html                  # Tailwind CDN config, CSS variables, global font tokens
├── index.tsx                   # React entry point
├── App.tsx                     # Provider composition
├── app/
│   ├── AppRouter.tsx           # Hash routing, route matching, layout selection
│   ├── AuthContext.tsx         # Mock auth/session state
│   ├── TripContext.tsx         # Mutable trip request state
│   ├── FavoritesContext.tsx    # LocalStorage-backed favorites
│   └── guards/RoleGuard.tsx    # Role protection
├── shared/
│   ├── atoms/                  # Button, Input, Badge, etc.
│   ├── molecules/              # Card
│   ├── hooks/                  # Shared reusable hooks
│   ├── data/                   # Shared mock package/about/trip data
│   ├── types/                  # App-wide TypeScript interfaces
│   └── utils/cld/              # Cloudinary utilities
└── features/
    ├── public/                 # Main marketing/catalog/package detail UX
    ├── faculty/                # Faculty portal
    ├── admin/                  # Admin portal
    └── travel-guide/           # Standalone travel guide experience
```

## 3. Current Typography Rules
- The app has been unified to use the same font family as the home hero.
- **Global font:** `Lora`.
- In [`index.html`](./index.html):
  - `--font-sans` = `Lora`
  - `--font-serif` = `Lora`
  - `body` uses `var(--font-serif)`
  - `.leaflet-container` also uses `var(--font-serif)`
- Do not reintroduce Inter unless there is an intentional full typography redesign.

## 4. Routing and Scroll Behavior
- All navigation is hash-based (`window.location.hash = '/path'`).
- Route matching is handled manually in [`app/AppRouter.tsx`](./app/AppRouter.tsx).
- Smooth scroll-to-top on route changes is centralized in [`shared/hooks/useSmoothScrollToTop.ts`](./shared/hooks/useSmoothScrollToTop.ts).
- Do not add new one-off `window.scrollTo(0, 0)` page effects if the router-level hook already covers the case.
- If a feature needs local top-scroll behavior beyond route changes, reuse the hook instead of inventing a new one.

## 5. Authentication and Protection
- Auth is mock-only. `login()` creates a mock user object in memory.
- `RoleGuard` currently still supports demo auto-login behavior for protected routes.
- Public/faculty/admin experiences are all frontend-only prototypes unless explicitly rewired.

## 6. Public Shell and Layout Conventions
- [`features/public/layouts/PublicLayout.tsx`](./features/public/layouts/PublicLayout.tsx) is the main public shell.
- Public horizontal gutters have been normalized to:
  - `px-4 md:px-5 xl:px-6`
- This responsive gutter pattern was applied broadly across public/admin/faculty/travel-guide wrappers to restore a modern inset layout after earlier edge-to-edge experiments.
- If adjusting shell spacing, keep this pattern coherent instead of reintroducing isolated wrapper values.

## 7. Catalog Page: Current Behavior
**Primary file:** [`features/public/pages/CBETCatalog.tsx`](./features/public/pages/CBETCatalog.tsx)

- The main public catalog supports two modes:
  - `MAP VIEW` (default)
  - `PHOTO VIEW`
- The view switch is centered and styled as a pill toggle.
- The active mode uses the app’s eco green.
- Map mode renders the full `CBETMap`.
- Photo mode renders [`CatalogGrid.tsx`](./features/public/components/CatalogGrid.tsx).

## 8. Catalog Cards: Current Data Rules
**Primary file:** [`features/public/components/CatalogGrid.tsx`](./features/public/components/CatalogGrid.tsx)

The card design was heavily refactored. The next agent must preserve these rules unless intentionally changing the product logic:

- Top label:
  - Uses the package `location` in uppercase.
  - This is currently treated as the province/location label.
- Route row:
  - Left side is always `Phnom Penh`
  - Right side is the package’s real `cbetSite`
  - Dates are **not fixed** and currently show `On request`
- Pill/tag:
  - Uses the package’s first activity (`pkg.activities[0]`)
  - Clicking this pill navigates to the package detail page
  - It has a small hover animation and an `Activity` icon
- Pricing:
  - Shown as **per student**
  - No fake strike-through price
  - No fake per-night math
  - Helper text says pricing is based on the current capacity band
- Footer amenities:
  - Derived from real package data (`includes`, `safetyInfo`)
  - Not fully hardcoded anymore
- Navigation:
  - Whole-card click navigation was intentionally removed
  - Only the `Details` button and the activity pill navigate to the package detail page
- Image/map toggle:
  - Each card can toggle between photo and a mini-map
  - The mini-map centers on that package only and shows only that package’s marker
  - It reuses the shared Leaflet stack and `createCustomIcon()`

## 9. Catalog Grid Pagination Rules
**Primary file:** [`features/public/components/CatalogGrid.tsx`](./features/public/components/CatalogGrid.tsx)

- Pagination is row-based, not a hardcoded item count.
- Default is `rowsPerPage = 3`.
- Effective page size = `rowsPerPage * responsiveColumns`
  - Mobile: 1 column -> 3 cards/page
  - Tablet: 2 columns -> 6 cards/page
  - Desktop: 3 columns -> 9 cards/page
- The navigator is centered below the grid.
- If filtering changes the package list, pagination resets to page 1.
- This was intentionally made scalable for future additions; do not regress to fixed literal page counts.

## 10. Detail Page: Current Ownership Model
**Primary files:**
- [`features/public/pages/PublicPackageDetail/PublicPackageDetails.tsx`](./features/public/pages/PublicPackageDetail/PublicPackageDetails.tsx)
- [`features/public/pages/PublicPackageDetail/layout/PublicPackageDetailLayout.tsx`](./features/public/pages/PublicPackageDetail/layout/PublicPackageDetailLayout.tsx)
- [`features/public/pages/PublicPackageDetail/pages/PublicPackageDetailOverviewAndItinery.tsx`](./features/public/pages/PublicPackageDetail/pages/PublicPackageDetailOverviewAndItinery.tsx)

- The package hero is **not** owned by the shared detail layout anymore.
- The hero was intentionally moved so it only appears in the `Overview & Itinerary` tab.
- [`PackageHero.tsx`](./features/public/pages/PublicPackageDetail/components/PackageHero.tsx) is injected into the overview page from `PublicPackageDetails.tsx`.
- Do not move the hero back into the shared layout unless intentionally restoring cross-tab hero behavior.
- The hero width was also constrained to the left content column so it matches the width of the content below, rather than spanning toward the sidebar.

## 11. Detail Page Subnav Rules
**Primary file:** [`features/public/pages/PublicPackageDetail/components/PackageDetailNav.tsx`](./features/public/pages/PublicPackageDetail/components/PackageDetailNav.tsx)

- The trip/package subnav is now a sticky secondary bar under the main nav.
- It is intentionally centered.
- The left-side “Trip Navigation / Package sections” descriptor block was removed.
- It should visually echo the main nav’s active-state language, but remain clearly smaller in scale.
- Hierarchy rules:
  - Main nav font is slightly larger / more prominent
  - Detail subnav font is smaller
- Do not reintroduce a left rail subnav unless intentionally redesigning the page.

## 12. Booking Sidebar Rules
**Primary file:** [`features/public/pages/PublicPackageDetail/components/BookingWidget.tsx`](./features/public/pages/PublicPackageDetail/components/BookingWidget.tsx)

- The request sidebar was refactored toward a tighter decision-panel structure.
- It now includes:
  - trip snapshot block
  - pricing block
  - clearer faculty vs non-faculty action flows
- Faculty action footer:
  - navy/blue-grey shell
  - `Review Request` is eco green primary CTA
  - `Save for Review` is quieter secondary
- This structure should stay focused and information-forward rather than becoming a generic long form again.

## 13. Shared Button Behavior
**Primary file:** [`shared/atoms/Button.tsx`](./shared/atoms/Button.tsx)

- `Button` was updated to use:
  - `inline-flex`
  - `items-center`
  - `justify-center`
  - `gap-2`
  - `leading-none`
- This fixed icon/text alignment issues with the unified Lora typography.
- If button text alignment looks wrong somewhere, check this shared primitive first before adding local hacks.

## 14. Known Data Realities and Caveats
- Package data is still mock/static TypeScript data.
- Some older parts of the app still use approximation or demo assumptions.
- There is known duplication risk between:
  - [`shared/data/cbetData.ts`](./shared/data/cbetData.ts)
  - [`features/faculty/data/cbetData.ts`](./features/faculty/data/cbetData.ts)
- If editing package semantics, prefer the shared source of truth unless a feature-specific override is truly intended.

## 15. Known Technical Oddities
- [`index.html`](./index.html) still references `/index.css`, but that file does not exist. Builds pass with a warning.
- `index.html` still includes an importmap block even though the app is built with Vite.
- The repo has no formal lint/test setup in the workflow shown here.

## 16. Change Discipline for the Next Agent
- Prefer updating shared primitives/hooks/layout contracts over scattering local one-off fixes.
- If a visual pattern repeats in multiple places, solve it at the shared layer.
- Preserve the current UX decisions unless the user explicitly changes direction:
  - centered catalog mode switch
  - map-first catalog experience
  - row-based photo-view pagination
  - overview-only package hero
  - centered sticky detail subnav
  - no whole-card navigation in the photo grid
