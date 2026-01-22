# Project Context: EcoLink Portal

## 1. Architecture & Environment
- **Environment:** Browser-native ES Modules (no local bundler like Webpack/Vite). All third-party dependencies are defined in the `importmap` within `index.html`.
- **Framework:** React 18 (Functional Components + Hooks).
- **Routing:** Custom Hash-based routing (`window.location.hash`). The `AppRouter.tsx` handles path parsing and route protection.
- **State Management:** React Context API (`AuthContext`, `TripContext`).
- **Styling:** Tailwind CSS (via CDN script). Configuration is strictly defined in the `tailwind.config` script tag in `index.html`.

## 2. Project Directory Structure
The project follows a Feature-Based architecture combined with Atomic Design for shared UI.

```text
/
├── index.html              # CSS Variables, Import Map, Tailwind Config
├── index.tsx               # React Entry Point
├── app/                    # Global Application Logic
│   ├── AppRouter.tsx       # Routing & Navigation Logic
│   ├── AuthContext.tsx     # User Session Management
│   ├── TripContext.tsx     # Global Data State
│   └── guards/             # Route Protection (RoleGuard)
├── shared/                 # Reusable Assets & UI
│   ├── atoms/              # Base components (Button, Input, Badge)
│   ├── molecules/          # Complex UI (Card)
│   ├── types/              # TypeScript Interfaces (Source of Truth)
│   ├── theme/              # JS-side Theme Constants
│   └── data/               # Mock Database files
└── features/               # Domain-Specific Logic
    ├── public/             # Landing, Catalog, Map, Public Details
    ├── faculty/            # Faculty Dashboard, Trip Management
    └── admin/              # Admin Dashboard, Approval Workflows
```

## 3. Design System & Theming
**Reference File:** `index.html` (CSS Variables & Tailwind Config)

The design system relies on a set of CSS variables mapped to Tailwind utility classes. Do not introduce hardcoded hex values in components; use the semantic names.

### Typography
- **font-sans:** Inter (UI, Body)
- **font-serif:** Lora (Headings, Heroes)

### Color Semantics
- **primary:** Main brand color (Emerald).
- **surface / surface-2:** Background layers.
- **accent / clay:** Highlight and warning colors.
- **status-* :** Semantic colors for project states (Pending, Approved, Locked, etc.).

### Shape & Space
- **rounded-eco:** Global border radius (`var(--radius)`).
- **p-eco / m-eco:** Standard spacing unit (`var(--pad)`).

## 4. Data Models & Constants
**Reference File:** `shared/types/index.ts`

The application logic revolves around strict TypeScript interfaces.

- **UserRole:** Enum defining access levels (`PUBLIC`, `FACULTY`, `ADMIN`).
- **ProjectStatus:** Enum defining the lifecycle of a trip (`PENDING`, `APPROVED`, `LOCKED`, `COMPLETED`, `CANCELLED`).
- **CBETPackage:** Represents a static destination product (Location, Price Bands, Schedule).
- **Trip:** Represents a dynamic instance of a booked package (Date, Group Size, Specific Status).

## 5. Key Coding Patterns

### A. Routing Pattern
- Do not use `react-router-dom`.
- Navigation is handled via `window.location.hash = '/path'`.
- Route parameters are extracted via regex in `AppRouter.tsx` (e.g., `/package/:id`).

### B. Shared Component Usage
- **Card:** The primary container for content. Accepts `title` and `actions` props.
- **Button:** Supports variant (`'primary'`, `'secondary'`, `'outline'`, `'ghost'`).
- **StatusBadge:** Automatically styles itself based on the `ProjectStatus` enum passed to it.

### C. Map Implementation
- **Library:** `react-leaflet`.
- **Import Rule:** Due to the ESM environment, Leaflet is imported as `import * as L from 'leaflet'`.
- **Components:** `CBETMap` handles marker rendering and custom tooltips.

### D. Authentication
- Authentication is simulated via `AuthContext`.
- There is no backend; `login()` sets a mock user object in state.
- Protected routes use `RoleGuard` to check `UserRole` and redirect if unauthorized.

## 6. Feature Page Structure Pattern
- **Entry Page:** One top-level page component orchestrates section order, navigation state, and scroll tracking.
- **Layout Shell:** A dedicated layout component handles structural composition only (e.g., sticky sidebar + main content), with no data/state logic.
- **Sections:** Each section is a standalone component living under a `components/` folder and contains its own local data/constants.
- **Rules:**
  1) Add new sections as standalone components under `components/`.
  2) Maintain a single `SECTIONS` registry in the entry page (id/label/icon/tip) for navigation.
  3) Ensure each section root uses the same `id` as the registry for scroll/active tracking.
  4) Keep layout changes isolated to the layout component only.
