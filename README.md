# Todo App

A modern, mobile-first todo application built with Next.js, TypeScript, and Tailwind CSS. Designed from a [Figma community template](https://www.figma.com/design/NiJytz8G06FWgb8lHodJf9/Todo-App--Community-) featuring gradient auth screens, categorized task management, and a clean dashboard.

## Features

- **Authentication** -- Sign up and log in with form validation. Credentials persist in localStorage.
- **Categorized Tasks** -- Organize tasks into four categories: Project, Work, Daily Tasks, and Groceries. Each category shows a live task count.
- **Full CRUD** -- Create, read, update, and delete tasks. Toggle completion with a single tap.
- **Time Tracking** -- Assign start/end times to tasks, displayed in 12-hour format.
- **User Profile** -- View and edit email and phone. Log out to return to the login screen.
- **Mobile-First Design** -- Optimized for 375px+ screens with a fixed bottom navigation bar.
- **Persistent Storage** -- All data survives page refreshes via localStorage.

## Tech Stack

| Layer       | Technology                  | Why                                                  |
| ----------- | --------------------------- | ---------------------------------------------------- |
| Framework   | Next.js 16 (App Router)     | File-based routing, React Server Components support  |
| Language    | TypeScript (strict)         | Type safety across components, context, and hooks    |
| Styling     | Tailwind CSS v4             | Utility-first, fast iteration, design-token friendly |
| State       | React Context               | Lightweight global state without external deps       |
| Storage     | localStorage                | Zero-config persistence for MVP                      |
| Linting     | ESLint + Prettier           | Consistent code style                                |

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
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/                        # Next.js App Router
    layout.tsx                 # Root layout -- fonts, AuthProvider, TaskProvider
    page.tsx                   # Root redirect (login or dashboard)
    globals.css                # Tailwind theme, gradients, global styles
    login/page.tsx             # Login page with gradient background
    signup/page.tsx            # Sign-up page with gradient background
    dashboard/page.tsx         # Main dashboard -- categories + task list
    profile/page.tsx           # User profile -- email, phone, logout
  components/
    ui/                        # Reusable primitives
      Button.tsx               # 5 variants: primary, cta, danger, outline, ghost
      Input.tsx                # Form input with label and error state
      Card.tsx                 # Rounded card wrapper
      Avatar.tsx               # Image avatar with fallback initial
    auth/                      # Authentication forms
      LoginForm.tsx            # Username/password login form
      SignUpForm.tsx            # Registration form with validation
    tasks/                     # Task management components
      CategoryCard.tsx         # Color-coded category with live count
      TaskItem.tsx             # Task row: checkbox, edit, delete
      TaskList.tsx             # Task list with empty state
      CreateTaskModal.tsx      # Bottom-sheet modal for new tasks
    layout/                    # App shell
      Header.tsx               # Greeting + avatar (dashboard) or page title
      BottomNav.tsx            # Fixed bottom tab bar (Home, Profile)
  context/
    AuthContext.tsx             # Auth state, login/signup/logout/updateProfile
    TaskContext.tsx             # Task CRUD state with localStorage sync
  hooks/
    useAuth.ts                 # Typed hook for AuthContext
    useTasks.ts                # Typed hook for TaskContext
  lib/
    types.ts                   # User, Task, Category, CategoryId interfaces
    constants.ts               # Category definitions and color mappings
    storage.ts                 # Typed localStorage helpers
```

## Screens

| Screen    | Route        | Description                                       |
| --------- | ------------ | ------------------------------------------------- |
| Login     | `/login`     | Gradient background, username + password fields   |
| Sign Up   | `/signup`    | Avatar, email, password with confirmation         |
| Dashboard | `/dashboard` | Category cards, task list, create task button      |
| Profile   | `/profile`   | Editable email/phone, logout                      |

## Milestones

| #  | Milestone                          | Tag      | Status |
| -- | ---------------------------------- | -------- | ------ |
| 0  | Project Initialization             | `v0.1.0` | Done   |
| 1  | Design System & UI Components      | `v0.2.0` | Done   |
| 2  | Authentication UI                  | `v0.3.0` | Done   |
| 3  | Core CRUD -- Dashboard & Tasks     | `v0.4.0` | Done   |
| 4  | Profile, Polish & Documentation    | `v1.0.0` | Done   |

## Design Reference

Based on the [Todo App (Community)](https://www.figma.com/design/NiJytz8G06FWgb8lHodJf9/Todo-App--Community-) Figma file.

## License

This project is for educational and portfolio purposes.
