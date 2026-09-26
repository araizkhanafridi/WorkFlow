# WorkFlow

WorkFlow is a responsive task and project management dashboard built with React, TypeScript, Vite, and Tailwind CSS.

It helps users organize tasks, manage projects, track progress, and view productivity statistics through a clean and responsive interface.

## Features

- Create, edit, and delete tasks
- Set task status and priority
- Assign tasks to projects
- Search tasks by title
- Filter tasks by status and project
- Automatic overdue task detection
- Create, edit, and delete projects
- View tasks associated with individual projects
- Track project completion progress
- Dashboard with task statistics
- Analytics page with task progress overview
- Clear completed tasks
- Reset workspace data
- Confirmation dialogs for destructive actions
- LocalStorage support for persistent data
- Responsive design for mobile, tablet, laptop, and desktop devices

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage

## Project Structure

```text
src/
├── components/
│   ├── AddProjectForm.tsx
│   ├── AddTaskForm.tsx
│   ├── EditProjectForm.tsx
│   ├── EditTaskForm.tsx
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   ├── Sidebar.tsx
│   ├── StatsCards.tsx
│   └── TaskCard.tsx
│
├── App.tsx
├── index.css
└── main.tsx