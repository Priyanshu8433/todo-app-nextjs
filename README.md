# Todo App

> **Note:** This is a practice project I made to explore Next.js.

A fullstack task management app built with Next.js 15, React 19, MongoDB, Tailwind CSS and Shadcn UI. Features include task creation, completion toggling, and deletion, with a modern UI and dark mode support.

## Features

- Add, complete, and delete tasks
- Responsive UI with dark/light mode toggle
- Persistent storage using MongoDB
- API routes for CRUD operations
- Animated loaders and icons

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, ShadCn UI, Lucide Icons
- **Backend:** Next.js API routes, Mongoose (MongoDB)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env.local` or `.env.production` file:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — UI and custom React components
- `models/` — Mongoose models
- `lib/` — Database connection and utility functions

## API Endpoints

- `GET /api/tasks` — Fetch all tasks
- `POST /api/tasks` — Add a new task (`{ title }`)
- `PATCH /api/tasks` — Toggle completion (`{ id, completed }`)
- `DELETE /api/tasks` — Delete a task (`{ id }`)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
