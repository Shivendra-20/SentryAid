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

In local dev, signups are auto-approved so you can log in right after registering. The default admin (if none exists) is `admin` / `admin123` at `/adminLogin`.

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
