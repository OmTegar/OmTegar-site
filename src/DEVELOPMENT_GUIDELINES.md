# Development Guidelines & Documentation

## 1. Project Overview & Architecture
**Project Name**: OmTegar-site
**Architecture**: Feature-based Architecture (Domain Driven Design inspired)
**Tech Stack**:
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4), HeadlessUI, Framer Motion
- **State Management**: React Hooks (Local & Feature-scoped)

> [!NOTE]
> For detailed detailed architecture and feature documentation, please refer to the `docs/` directory:
> - [Architecture & Principles](docs/ARCHITECTURE.md)
> - [Features Overview](docs/features/)

### Directory Structure (Feature-based)
We group files by **Feature** rather than by file type. This ensures that as the application grows, related code stays together.

```text
src/
├── app/                  # App Router pages (Entry points)
│   ├── projects/         # Route: /projects
│   └── ...
├── features/             # Business Logic & Feature UI
│   ├── projects/         # Feature: Projects
│   │   ├── components/   # UI Components (ProjectShowcase, Card)
│   │   ├── config/       # static configs (Icon mappings)
│   │   ├── hooks/        # Feature-specific hooks (useProjectFilter)
│   │   ├── services/     # Data fetching (projectService)
│   │   └── types/        # TypeScript Definitions (Project)
├── components/           # Shared/Generic UI (SnakeGame, Navbar)
├── lib/                  # Shared Utilities (Helpers)
└── data/                 # Static Data (to be replaced by DB)
```

---

## 2. Coding Standards & Principles (SOLID)
This project strictly adheres to **SOLID** principles to ensure scalability and maintainability.

### S - Single Responsibility Principle (SRP)
**"A component should do one thing and do it well."**
- **Applied**: 
  - `ProjectShowcase.tsx`: Handles UI layout only.
  - `useProjectFilter.ts`: Handles filtering logic only.
  - `projectService.ts`: Handles data fetching only.

### O - Open/Closed Principle (OCP)
**"Open for extension, closed for modification."**
- **Applied**: 
  - `config/icons.tsx`: Technology icons are defined in a configuration map. Adding a new technology (e.g., "GoLang") only requires adding one line to the map, without touching the UI components.

### L - Liskov Substitution Principle (LSP)
**"Objects of a superclass shall be replaceable with objects of its subclasses."**
- **Applied**: 
  - UI Components accept generic Props interfaces allowing them to be swapped or reused easily within the feature.

### I - Interface Segregation Principle (ISP)
**"Clients should not be forced to depend upon interfaces that they do not use."**
- **Applied**: 
  - We export specific interfaces like `Project` from `features/projects/types`. Components only import the specific types they need.

### D - Dependency Inversion Principle (DIP)
**"Depend upon abstractions, not concretions."**
- **Applied**: 
  - Pages do NOT import JSON files directly.
  - Pages call `getProjects()` from the Service Layer.
  - The Service Layer acts as an abstraction. It currently serves JSON, but can be switched to a Database (Prisma/Postgres) without breaking any UI code.

---

## 3. Workflow for New Features
When adding a new feature (e.g., "Blog"), follow this workflow:

1. **Create Feature Folder**: `src/features/blog/`
2. **Define Types**: Create `types/post.ts`.
3. **Business Logic**:
   - Create `services/postService.ts` (Data fetching).
   - Create `hooks/usePosts.ts` (State/Interaction logic).
4. **UI Components**: 
   - Create `components/BlogList.tsx`, `components/BlogPost.tsx`.
5. **Integration**:
   - Create `src/app/blog/page.tsx` as a Server Component.
   - Fetch data using `postService`.
   - Pass data to `BlogList`.

---

## 4. Current Status
- [x] **Projects Feature**: Refactored to Feature-based + SOLID.
- [ ] **Auth System**: Pending implementation (NextAuth v5).
- [ ] **Database Connection**: Pending integration (Postgres/Prisma).
