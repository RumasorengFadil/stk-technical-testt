# STK Technical Test - Fullstack Menu Tree System

A full-stack web application for managing hierarchical menu structures with unlimited nesting levels. The project consists of a **Next.js** frontend and a **NestJS** backend connected to a **PostgreSQL** database.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- TanStack Query
- dnd-kit (Drag and Drop)

### Backend
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Swagger (OpenAPI)

---

# Implementation Choices

## Architecture

The project is separated into two independent applications:

```
root
├── stk-technical-test-api
└── stk-technical-test-fullstack-web
```

This separation keeps the frontend and backend loosely coupled and easier to develop, test, and deploy independently.

### Backend

The backend follows a layered architecture:

```
src
└── modules
    └── menu
        ├── application
        ├── domain
        ├── infrastructure
```

The responsibilities are separated into:

- **Presentation Layer** handles HTTP requests through controllers.
- **Application Layer** contains DTOs and request validation.
- **Domain Layer** contains business logic and services.
- **Infrastructure Layer** manages database persistence using TypeORM.

### Frontend

The frontend is organized by feature modules.

```
src
├── app
├── components
├── features
├── hooks
├── lib
├── services
└── utils
```

Each feature encapsulates its own:

- components
- hooks
- services
- schemas
- types

This structure improves maintainability and scalability.

---

# Features

Implemented features:

- Display hierarchical menu tree
- Unlimited nested menu levels
- Create menu
- Update menu
- Delete menu (cascade delete)
- Expand all / Collapse all
- Drag and drop menu reordering
- Move menu to another parent
- Form validation using Zod
- Loading state
- Error handling
- Responsive layout
- Swagger API documentation

---

# API Documentation

Swagger documentation is available at

```
http://localhost:3000/api
```

---

# Getting Started

## Prerequisites

- Node.js >= 20
- PostgreSQL
- npm

---

# Backend Setup

Navigate to backend project

```bash
cd stk-technical-test-api
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env
```

Configure your database credentials inside `.env`.

Create a new database in MySQL (or any compatible database server) using the same database name specified in the `.env` file.

Example:

```sql
CREATE DATABASE your_database_name;
```

After the database has been created, seed the initial data by running:

```bash
npm run seed
```

Start development server

```bash
npm run start:dev
```

Backend will run on

```
http://localhost:8000
```

---

# Frontend Setup

Navigate to frontend project

```bash
cd stk-technical-test-fullstack-web
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env.local
```

Example

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run development server

```bash
npm run dev
```

Frontend will run on

```
http://localhost:3000
```

---

# Production

Backend

```bash
npm run build
npm run start:prod
```

Frontend

```bash
npm run build
npm start
```

---

# Environment Variables

Backend

```env
PORT=8000

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

# Database

Database engine:

- PostgreSQL

The project uses TypeORM migrations for schema management.

---

# Validation

The frontend uses:

- React Hook Form
- Zod

The backend uses:

- class-validator
- ValidationPipe

to ensure all incoming requests are validated before processing.

---

# Drag and Drop

Drag-and-drop functionality is implemented using **dnd-kit**.

Features include:

- reorder menu within same level
- move menu to different parent
- preserve menu hierarchy
- update ordering through backend API

---

# Error Handling

The application provides:

- frontend validation
- backend validation
- API exception handling
- loading indicators
- user-friendly error messages

---

# Future Improvements

- Authentication & Authorization
- Unit Tests
- E2E Tests
- Docker support
- Search and filtering optimization
- Virtualized tree rendering for large datasets

---

# Screenshots

_Add screenshots here._

---

# Repository

Frontend

```
https://github.com/<username>/stk-technical-test-fullstack-web
```

Backend

```
https://github.com/<username>/stk-technical-test-api
```

---

# Author

Fadil
