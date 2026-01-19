# Projects Portfolio Feature

## Overview
**Location**: `src/features/projects`

This feature manages the display, filtering, and interaction with the user's project portfolio. It is designed to be data-driven, receiving project data from a service layer and rendering it via a responsive UI.

## Capabilities
- **Bento Filtering**: Users can filter projects by technology stack (e.g., ReactJS, Python, Laravel).
- **Interactive Cards**: Hover effects and animations powered by Framer Motion.
- **Detail View**: A modal (Dialog) opens to show full project details when clicked.
- **Responsive Layout**: Adapts from a single column on mobile to a 3-column bento grid on desktop.

## Tech Stack
- **State**: `useProjectFilter` hook for filtering logic.
- **UI**: HeadlessUI (`Dialog` for modals), Framer Motion (`AnimatePresence` for transitions).
- **Data**: Mock `getProjects()` service (simulating DB call).
