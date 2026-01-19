# System Architecture

## Overview
OmTegar-site follows a **Feature-based Architecture** inspired by Domain-Driven Design (DDD). This structure prioritizes scalability and maintainability by grouping related code (UI, Logic, Data, Types) into distinct feature modules.

## Directory Structure Strategy
The codebase is organized to separate concerns effectively:

### 1. `src/features/` (The Core)
Each subfolder here represents a distinct business domain.
- **Projects**: Manages portfolio project data, filtering, and display.
- **Game**: Encapsulates the Snake game logic and UI.
- **Contact**: Handles email service integration.

Inside each feature folder:
- `components/`: UI components specific to that feature (e.g., `ProjectCard`).
- `hooks/`: Custom React hooks (e.g., `useSnakeGame`).
- `services/`: Data fetching or external API integration (e.g., `EmailService`).
- `types/`: TypeScript definitions shared within the feature.
- `logic/` or `config/`: Pure business logic or static configuration.

### 2. `src/components/` (Shared UI)
Contains "dumb" or generic components used across multiple features or layout elements (e.g., `Layout.tsx`, `Navbar`).

### 3. `src/app/` (Routing)
Follows Next.js 14+ App Router conventions.
- `page.tsx`: Entry point for routes.
- **Rule**: Pages should be minimal and primarily orchestration layers that fetch data using *Services* and render *Feature Components*.

## Principles (SOLID)
We strictly adhere to SOLID principles:
- **SRP**: Functions and components have single responsibilities.
- **OCP**: Code is open for extension via configuration (e.g., `icons.config.ts`) but closed for modification.
- **DIP**: High-level components depend on abstractions (Services), not low-level details (Direct JSON imports).

## Future Scalability
To add a new feature (e.g., "Blog"):
1. Create `src/features/blog`.
2. Implement `services/blogService.ts`, `components/BlogList.tsx`.
3. Create route `src/app/blog/page.tsx` and assemble the pieces.
