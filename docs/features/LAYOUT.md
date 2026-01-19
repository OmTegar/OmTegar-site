# Layout & UI System

## Overview
**Location**: `src/components/Layout.tsx` & `src/app/globals.css`

The shared layout wrapper that provides the visual identity of the application. It implements a "Futuristic/Cyberpunk" aesthetic with glassmorphism and neon accents.

## Key Features

### 1. Global Styling
- **No Scrollbars**: Implemented a global CSS rule to hide scrollbars for a cleaner, app-like feel.
- **Typography**: Uses `Fira Code` (monospace) for a developer-centric look.
- **Selection**: Custom text selection color (`#43D9AD`).

### 2. Layout Structure
- **Width**: Constrained to `90%` of the viewport width on desktop for balance.
- **Navbar**: Floating glass-effect navigation bar. Collapses into a full-screen overlay menu on mobile.
- **Background**: Multi-layered background with animated blobs and noise texture overlay.

### 3. Footer
- **Minimalist Pill**: A floating pill-shaped footer containing social links, staying out of the way of content.
