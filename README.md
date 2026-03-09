# Todo App

A modern, mobile-first todo application built with Next.js, TypeScript, and Tailwind CSS. Designed from a [Figma community template](https://www.figma.com/design/NiJytz8G06FWgb8lHodJf9/Todo-App--Community-) featuring gradient auth screens, categorized task management, and a clean dashboard.

## Tech Stack

| Layer       | Technology              |
| ----------- | ----------------------- |
| Framework   | Next.js 16 (App Router) |
| Language    | TypeScript (strict)     |
| Styling     | Tailwind CSS v4         |
| State       | React Context           |
| Storage     | localStorage (MVP)      |
| Linting     | ESLint + Prettier       |

## Features

- User authentication (login / sign-up) with form validation
- Categorized tasks: Project, Work, Daily Tasks, Groceries
- Full CRUD: create, read, update, and delete tasks
- User profile with editable contact info
- Mobile-first responsive design with gradient UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/jenniesaf/ai-todo-app.git
cd ai-todo-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    login/              # Login page
    signup/             # Sign-up page
    dashboard/          # Main task dashboard
    profile/            # User profile
  components/
    ui/                 # Reusable primitives (Button, Input, Card, Avatar)
    auth/               # Auth form components
    tasks/              # Task-related components
    layout/             # Header, navigation
  context/              # React Context providers (Auth, Tasks)
  lib/                  # Types, constants, storage helpers
  hooks/                # Custom React hooks
```

## Milestones

| #  | Milestone                          | Tag      |
| -- | ---------------------------------- | -------- |
| 0  | Project Initialization             | `v0.1.0` |
| 1  | Design System & UI Components      | `v0.2.0` |
| 2  | Authentication UI                  | `v0.3.0` |
| 3  | Core CRUD -- Dashboard & Tasks     | `v0.4.0` |
| 4  | Profile, Polish & Documentation    | `v1.0.0` |

## License

This project is for educational and portfolio purposes.
