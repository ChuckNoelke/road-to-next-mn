# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application  
- `npm run lint` - Run ESLint checks
- `npm run lint-fix` - Run ESLint with auto-fix
- `npm run type` - Run TypeScript type checking without emitting files
- `npm run prisma-seed` - Seed database with initial data

## Database Management

- `prisma generate` - Generate Prisma client (runs automatically on `npm install`)
- Database uses PostgreSQL with Prisma ORM
- Schema located in `prisma/schema.prisma`
- Seed script in `prisma/seed.ts`

## Architecture Overview

This is a Next.js 15 application using the App Router with:

### Authentication System
- **Lucia Auth** for session management with Prisma adapter
- User sessions stored in PostgreSQL database
- Cookie-based authentication with secure attributes in production
- User attributes: username, email, passwordHash

### Core Features
- **Ticket Management System**: CRUD operations for support tickets
- **User Authentication**: Sign up, sign in, sign out functionality
- **Theme Support**: Dark/light mode with next-themes

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/features/` - Feature-based modules (auth, tickets)
- `src/components/` - Reusable UI components and forms
- `src/lib/` - Core utilities (Prisma, Lucia, utilities)
- `src/actions/` - Server actions (currently contains cookie utilities)
- `src/paths.ts` - Centralized route path definitions

### Key Technologies
- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Prisma** ORM with PostgreSQL
- **Lucia Auth** for authentication
- **Tailwind CSS** with Radix UI components
- **Zod** for schema validation
- **React Error Boundary** for error handling
- **Sonner** for toast notifications

### Data Models
- **User**: id, username, email, passwordHash, sessions[], tickets[]
- **Session**: id, expiresAt, userId
- **Ticket**: id, title, content, status (OPEN/IN_PROGRESS/DONE), deadline, bounty, userId

### Feature Organization
Each feature module (auth, ticket) contains:
- `actions/` - Server actions and queries
- `components/` - Feature-specific components  
- `queries/` - Data fetching functions
- `types.ts` - TypeScript type definitions
- `constants.tsx` - Feature constants

### Form Handling
- Custom form utilities in `src/components/form/`
- Action feedback hooks for server action responses
- Zod validation with error handling
- Submit button states and loading indicators