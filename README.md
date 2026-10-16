# SentryAid

SentryAid is a women's safety and emergency response platform built on the MERN stack. Users can send SOS alerts, volunteers respond in real time, and admins manage users, volunteers, and incident reports.

## Features

- **Users** — register/login, keep a profile (blood group, allergies, medical info), send SOS alerts, read notifications, and report volunteers.
- **Volunteers** — receive and respond to SOS requests, chat with users, and share live location during an alert.
- **Admins** — manage users and volunteers, send notifications, review reports, and monitor SOS cases.

## Tech Stack

- React + Vite, Tailwind CSS
- Node.js, Express
- MongoDB + Mongoose
- Socket.IO (real-time chat and location)
- JWT authentication

## Getting Started

You need:

- Node.js v18 or newer
- MongoDB running locally

One-time setup:

```powershell
cd SentryAid
.\setup.ps1
```

Start the backend and frontend together:

```powershell
npm run dev
```

Then open http://localhost:5173/

In local dev, signups are auto-approved so you can log in right after registering.

## Demo accounts (local dev)

The dev seed (`backend/src/config/devSeed.js`) creates these accounts on startup and keeps their passwords in sync, so they always work:

| Role | Name | Password | Login page |
| --- | --- | --- | --- |
| Admin *(only one admin ever exists)* | `admin` | `1234` | http://localhost:5173/adminLogin |
| User | `user1` | `1234` | http://localhost:5173/usersLogin |
| Volunteer | `v1` | `1234` | http://localhost:5173/volunteerLogin |

Notes:

- The seed never creates a second admin — if an admin already exists under another name, it is left alone.
- `user1` and `v1` are seeded with `request: "accepted"` (and `status: "active"` for the volunteer) so login isn't blocked by the approval flow.
- Override the demo password with `DEMO_PASSWORD` in `backend/.env` if you want something else.
- Seeds run only when `NODE_ENV` is not `production`.

Run services separately if needed:

```powershell
npm run dev:backend    # http://localhost:5000/api
npm run dev:frontend   # http://localhost:5173
```

If the env files are missing, copy the examples:

```powershell
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

- `backend/.env` — MongoDB connection and JWT secret
- `frontend/.env` — API URL

## Project Structure

```
SentryAid/
├── backend/     Express API, models, routes, and Socket.IO server
└── frontend/    React app with role-based pages for users, volunteers, and admins
```
