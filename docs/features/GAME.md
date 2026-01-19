# Snake Game Feature

## Overview
**Location**: `src/features/game`

A fully functional, retro-style Snake game embedded directly into the landing page's hero section. It serves as an interactive "Easter egg" to demonstrate complex state management and logic handling in React.

## Capabilities
- **Game Engine**: Custom game loop running on `requestAnimationFrame` (via `useInterval`).
- **Input Handling**: Listens for Arrow keys globally to control the snake.
- **Collision Detection**: Checks for wall hits, self-collision, and apple consumption.
- **Scoring**: Updates the score in real-time, displayed on the UI dashboard.

## Architecture
- **`logic/SnakeEngine.ts`**: Pure TypeScript class handling the coordinate math and game rules.
- **`hooks/useSnakeGame.ts`**: React adapter that connects the Engine to React State, driving the re-renders.
- **`components/`**: UI components for the board and controls.
