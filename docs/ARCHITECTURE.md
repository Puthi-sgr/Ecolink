# Architecture

## Runtime
- Vite 6
- React 18
- TypeScript
- Tailwind via CDN config in [`index.html`](../index.html)
- Hash-based routing via [`app/AppRouter.tsx`](../app/AppRouter.tsx)

## Core Boundaries
- `app/`
  - app shell, router, auth, and top-level contexts
- `features/`
  - role or product-specific screens
- `shared/`
  - reusable primitives, shared workflow UI, data access, services, and domain rules

## Shared Layer Responsibilities
- `shared/atoms/`
  - low-level UI primitives like `Button`, `Input`, `Badge`
- `shared/molecules/`
  - lightweight composed UI like `Card`
- `shared/ui/`
  - reusable shells and interaction primitives
  - examples: dialogs, metric cards, surface sections, empty states
- `shared/directives/`
  - behavioral reuse for React surfaces
  - examples: disclosure state, action gating, confirm wrappers
- `shared/components/`
  - larger shared app components, especially workflow and package-explorer UI
  - includes opt-in media helpers such as `ImagePreviewLightbox.tsx`
- `shared/hooks/`
  - reusable hooks used across features
- `shared/domain/`
  - pure domain presentation logic
- `shared/repositories/`
  - mock-backed read access and bootstrapping
- `shared/services/`
  - app-level orchestration for workflows, trips, and routing
- `shared/utils/`
  - lower-level helpers, selectors, and routing utilities
- `shared/types/`
  - app-wide type contracts

## Context Model
- [`AuthContext.tsx`](../app/AuthContext.tsx)
  - mock auth/session only
- [`FavoritesContext.tsx`](../app/FavoritesContext.tsx)
  - favorites state
- [`PlannerContext.tsx`](../app/PlannerContext.tsx)
  - LocalStorage-backed plans, quote requests, compare tray
  - delegates lifecycle rules to `workflowService`
- [`TripContext.tsx`](../app/TripContext.tsx)
  - LocalStorage-backed trips
  - should use `tripService` for transitions

## Canonical Product Surface
- The canonical workflow workspace is [`PlannerPage.tsx`](../features/public/pages/PlannerPage.tsx)
- Package detail, faculty dashboard, and admin dashboard are summary-oriented surfaces that deep-link into planner
- The booking-specific full-screen request surface is [`PublicPackageBookingPage.tsx`](../features/public/pages/PublicPackageDetail/PublicPackageBookingPage.tsx) on `#/package/:packageId/request`

## Package Detail Composition
- `PublicPackageDetailOverviewAndItinery.tsx` owns the overview flow composition.
- `usePackageBookingFlow.ts` is the shared package-request state and action layer used by both package detail and the full booking route.
- `hashRoute.ts` owns the package booking query helpers for `#/package/:packageId/request`.
- `TypicalSchedule.tsx` is now the merged schedule + experience surface.
- The old standalone `ExperiencePreview` section is intentionally removed.
- Previewable imagery should use `ImagePreviewLightbox` as an opt-in wrapper, not a global behavior.

## Active Architectural Defaults
- Do not introduce `react-router`
- Do not add parallel workflow state containers
- Do not keep cloning modal, route, or workflow behavior into page-local implementations when shared layers already exist
