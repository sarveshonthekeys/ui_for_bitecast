# Bitecast

A modern social media app with reels, stories, and content exploration features.

## Overview

Bitecast is a React-based social media application featuring:
- Home feed with content from creators
- Reels/short-form video browsing with swipe navigation
- Stories viewing experience
- User profiles and content library
- Explore page for discovering new content

## Recent Changes

- **Dec 16, 2025**: Added CommentsPanel component to reels page
  - Slides up from bottom with smooth vaul-based animations
  - Supports snap points at 50%, 75%, and 100% screen height
  - Dark theme with rounded top corners
  - Scrollable comment list with profile pics, usernames, timestamps, and likes
  - Fixed comment input at bottom with send button
  - Gesture-based swipe up/down to expand/collapse

## Project Architecture

### Frontend (client/src)
- **pages/**: Main app pages (home, reels, explore, library, profile, story, login)
- **components/**: Reusable UI components including shadcn/ui primitives
- **components/comments-panel.tsx**: Sliding comments drawer for reels

### Backend (server)
- Express server serving the frontend and API routes
- In-memory storage for data

### Shared (shared)
- Schema definitions using Drizzle ORM
- Type definitions shared between frontend and backend

## Running the Project

The app runs on port 5000 with `npm run dev` which starts the Express server and Vite dev server together.
