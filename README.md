# Order Management Dashboard

This is a full-stack Order Management Dashboard built as part of a job assessment. It displays a real-time order board where users can track, view, and manage customer orders efficiently.

---

## 🛠 Tech Stack

### Backend:

- **Node.js + Express** – for building a scalable RESTful API
- **TypeScript** – for safer, more maintainable backend logic
- **PostgreSQL** – as the relational database
- **Prisma ORM** – to simplify DB access with type-safety and schema modeling

### Frontend:

- **React** – for building a dynamic and component-based UI
- **Material UI** – for a consistent and clean visual design
- **@dnd-kit** – for drag-and-drop interaction (React Beautiful DnD wasn't compatible with my React version)

### Infrastructure:

- **Docker** – for creating a reproducible development and deployment environment across OS platforms

---

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Kingtiger0719/restaunax-dashboard
   cd restaunax-dashboard
   ```

2. **Run with Docker:**

   ```bash
      docker compose up --build
   This application will be served at http://localhost:3001
   ```

## 🧱 Architecture Overview

      React (Material UI + @dnd-kit)
               |
               ↓
      Express API (Node.js + TypeScript)
               |
               ↓
      Prisma ORM ↔ PostgreSQL

### Key Functional Areas

#### Drag-and-Drop Order Status Management

Users can move orders between different states (e.g., "Pending", "Preparing", "Completed") using a simple drag-and-drop UI.

#### Filtering Interface

Filters by customer name, order status, and type make it easy to locate specific orders quickly.

#### Single Deployable Unit

The React frontend is built and served by the Express backend, making deployment seamless.

---

## 🧠 Technical Decisions & Rationale

#### @dnd-kit over react-beautiful-dnd:

React Beautiful DnD wasn't supported with the React version I used, and @dnd-kit provided modern, performant drag-and-drop behavior with good customization options.

#### Prisma ORM:

Prisma gave me type-safe access to the database, made schema management easier, and reduced boilerplate.

#### Dockerization:

Ensured the app runs consistently across different development environments without the need for local installation of Node/Postgres.

#### Frontend Inside Backend:

Simplified hosting and deployment by bundling the frontend and backend into a single service.

---

## 🧩 What I’d Improve With More Time

Add real-time updates (e.g., via WebSocket or polling) to reflect order changes across multiple users in real-time.

Implement user authentication and role-based access control.

Add pagination and better error handling for API responses.

Write unit/integration tests using Jest and Supertest.

Improve UI responsiveness for smaller screen sizes.

## ⚠️ Challenges Faced

### Drag-and-drop compatibility:

React Beautiful DnD didn’t work due to version mismatches, so I switched to @dnd-kit. This required rethinking the drag event flow and drop zone configuration but gave me more flexibility in the end.

### Merging frontend into backend:

Serving the built React app from Express took some initial setup but ultimately made deployment smoother and reduced complexity.

### Environment portability:

Docker was key in solving OS-specific setup issues, especially around Node and Postgres version mismatches on different platforms.
