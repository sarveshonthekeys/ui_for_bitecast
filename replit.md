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

- **Dec 16, 2025**: Enhanced CommentsPanel and reel interactions
  - Each reel/post has unique comments (hash-based generation from contentId)
  - Fixed overlay dismiss - touch events only blocked on scroll area
  - Added heart animation timeout cleanup to prevent memory leaks
  - Added double-tap to like with heart animation (matching stories)
  - Like state persists in localStorage per reel
  - Integrated comments panel into home page feed items
  - Accessibility improvements (VisuallyHidden title for screen readers)

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
