# Workflow

## Canonical Workflow Surface
- Planner is the canonical full-detail workflow workspace
- Main file: [`features/public/pages/PlannerPage.tsx`](../features/public/pages/PlannerPage.tsx)
- Package detail, faculty dashboard, and admin dashboard should summarize and then deep-link into planner

## Workflow Stages
- Planner plans
- Quote requests
- Trips

## Request Status Model
- `Draft`
- `Needs Info`
- `Under Review`
- `Quoted`
- `Approved`
- `Locked`

## Shared Lifecycle Logic
- Request lifecycle:
  - [`shared/services/workflowService.ts`](../shared/services/workflowService.ts)
- Trip lifecycle:
  - [`shared/services/tripService.ts`](../shared/services/tripService.ts)

## Request Creation Rules
- Package detail and planner/faculty/admin flows should create requests through `workflowService`
- Shared request input type: `CreateRequestInput`
- Duplicate request creation should be resolved through the service, not page-local logic

## Trip Creation Rules
- Trips derived from requests should use `tripService.createTripFromRequest()`
- Approval-pack publish, payment verification, payment rejection, and manual locking should use `tripService`

## Notes and History
- Notes are split into:
  - `requester`
  - `internal`
- History is a separate stream from notes and timeline
- Shared normalization lives in [`shared/utils/requestWorkflow.ts`](../shared/utils/requestWorkflow.ts)

## Current UX Rule
- Do not expand every role page into a second planner
- Keep deep workflow detail in planner and keep other pages focused
