# Data And Services

## Shared Repositories
- [`shared/repositories/packageRepository.ts`](../shared/repositories/packageRepository.ts)
  - packages
  - package about data
  - initial trips
- [`shared/repositories/plannerRepository.ts`](../shared/repositories/plannerRepository.ts)
  - initial plans
  - initial quote requests
- [`shared/repositories/projectRepository.ts`](../shared/repositories/projectRepository.ts)
  - shared faculty/admin project access

## Shared Services
- [`shared/services/workflowService.ts`](../shared/services/workflowService.ts)
  - create plans
  - duplicate plans
  - create/submit/reopen/update requests
  - add request comments
- [`shared/services/tripService.ts`](../shared/services/tripService.ts)
  - create trips from requests
  - publish approval packs
  - verify/reject payment
  - lock trips
- [`shared/services/plannerRouteService.ts`](../shared/services/plannerRouteService.ts)
  - build/open/replace planner workspace routes
- [`shared/services/packageService.ts`](../shared/services/packageService.ts)
  - package-fit and explorer re-exports

## Data Ownership Rules
- App pages should source package data from the shared package repository
- Dashboards should source project data from shared project repository
- Context bootstrapping should source shared repositories, not feature-local mock files

## Legacy Reality
- Older feature-local mock data files may still exist on disk
- Treat them as legacy artifacts unless a current page still imports them
- Do not create new feature-local forks for packages, workflow requests, or project records

## Shared Status Presentation
- Shared status mapping lives in [`shared/domain/statusPresentation.ts`](../shared/domain/statusPresentation.ts)
- Status visuals should use shared presentation rules instead of page-local color maps
