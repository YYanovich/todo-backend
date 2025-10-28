# TODO Backend — Express + TypeScript + Mongoose

Overview

This repository contains the backend API for a simple TODO application. Built with Express (TypeScript) and MongoDB (Mongoose), it provides CRUD endpoints and basic pagination.

Tech stack

- Node.js + TypeScript
- Express 5
- Mongoose (MongoDB)
- dotenv, cors

---

Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

---

Environment

Create a `.env` file in the `todoBackend` folder with at least the following variables:

```env
PORT=5003
MONGO_URL=mongodb://localhost:27017/todo_app
# Optional: FRONTEND_URL=http://localhost:5173
```

The server reads `process.env.MONGO_URL` and `process.env.PORT`. `FRONTEND_URL` can be used to add an explicit allowed origin.

---

Install and run (development)

```bash
cd todoBackend
npm install
npm run dev
```

The `dev` script uses `tsx watch src/index.ts` to restart on changes.

---

Production

To run in production:

1. Compile TypeScript into `dist/` (e.g. `tsc -b`).
2. Start the compiled server:

```bash
npm start
```

`start` executes `node dist/index.js`.

---

API overview

- GET `/api/todos?page=1&limit=10` — returns a paginated list of todos.
  - Response shape: `{ todo: [...], totalTodo, totalPages, page, limit }`
- POST `/api/todos` — create a todo (body: `name`, `description?`, `deadline?`, `completed?`, `priority?`)
- PATCH `/api/todos/:id` — update a todo
- DELETE `/api/todos/:id` — delete a todo

Example: create a todo via curl

```bash
curl -X POST http://localhost:5003/api/todos \
  -H "Content-Type: application/json" \
  -d '{"name":"Test task","description":"desc","priority":2}'
```

Get paginated list:

```bash
curl "http://localhost:5003/api/todos?page=1&limit=10"
```

---

CORS

`src/index.ts` defines `allowedOrigins` with `http://localhost:3000` and `http://localhost:5173` by default. If your frontend runs on a different origin, set `FRONTEND_URL` in `.env` or, for local development, temporarily allow all origins with `app.use(cors())`.

---

Recommendations

- Use credentials and network rules for production MongoDB access (Atlas recommended)
- Add request logging (morgan/winston) and centralized error handling
- Add integration tests for controllers
- Consider adding a small Dockerfile and a docker-compose setup (I can provide these if you want)

---

If you want, I can also provide a Postman collection or an OpenAPI spec for the API.
