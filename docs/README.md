# EcoLink Docs Index

This folder exists to give future agents and contributors a fast, stable map of the app without requiring a full repo re-scan.

## Start Here
- [`../AGENT.md`](../AGENT.md): high-signal operational summary for agents
- [`ARCHITECTURE.md`](./ARCHITECTURE.md): folder structure, boundaries, and shared layer responsibilities
- [`DESIGN.md`](./DESIGN.md): typography, layout, interaction hierarchy, and UI consistency rules
- [`ROUTING.md`](./ROUTING.md): hash-router model, query syncing, and planner route rules
- [`WORKFLOW.md`](./WORKFLOW.md): planner/request/trip lifecycle and canonical workflow rules
- [`DATA-SERVICES.md`](./DATA-SERVICES.md): repositories, services, contexts, and data ownership
- [`AI-HANDOFF.md`](./AI-HANDOFF.md): practical guidance for the next AI touching this app

## Current Defaults
- Router: custom hash router, not `react-router`
- Source of truth for packages: shared repositories
- Canonical workflow surface: `#/planner`
- Global font: `Lora`
- Shared modal layer: `shared/ui/Dialog.tsx`
- Shared lifecycle logic: `shared/services/workflowService.ts` and `shared/services/tripService.ts`
- Package-detail schedule is the merged experience/storytelling module
- Image preview is opt-in through `shared/components/ImagePreviewLightbox.tsx`

## Verification
- Current collaboration preference: do not run routine lint/build for every small visual tweak
- Lint: `npm run lint`
- Tests: `npm run test`
- Build: `npm run build`
