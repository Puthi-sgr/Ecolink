# Routing

## Router Model
- Routing is custom and hash-based
- Main implementation: [`app/AppRouter.tsx`](../app/AppRouter.tsx)
- Do not migrate to `react-router` unless the app architecture is intentionally being replaced

## Shared Routing Helpers
- Low-level helpers live in [`shared/utils/hashRoute.ts`](../shared/utils/hashRoute.ts)
- App-level planner deep-link helpers live in [`shared/services/plannerRouteService.ts`](../shared/services/plannerRouteService.ts)

## Important Rule
- Query-only hash changes may use `history.replaceState`
- Because of that, anything reacting to route/query changes must use:
  - `subscribeToHashRouteChanges()`
- Do not rely only on native `hashchange`

## Route Set
- Public:
  - `/`
  - `/about`
  - `/favorites`
  - `/planner`
  - `/destinations`
  - `/travel-guide`
  - `/package/:packageId/:tab?`
- Faculty:
  - `/faculty`
  - `/faculty/dashboard`
  - `/faculty/trips/:tripId`
- Admin:
  - `/admin`
  - `/admin/dashboard`
  - `/admin/trips/:tripId`

## Planner Query Model
- `#/planner?plan=<id>&view=brief|timeline`
- `#/planner?request=<id>&view=timeline|documents|notes|history`
- optional `document=brief|itinerary|approval-pack`
- optional `audience=requester|faculty|admin`
- optional `print=1`

## Preferred Usage
- When opening planner from another feature, use `plannerRouteService`
- When parsing route state, use shared hash helpers
- Do not hand-roll planner URLs in page files if a shared helper already exists
