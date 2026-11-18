# Court Discovery App

A MERN court discovery application for users to find sports courts and for court owners to list and manage courts.

## Structure

- `backend/` - Express 5 and Mongoose API
- `frontend/` - React 19 and Vite interface

## Setup

### Backend

```powershell
cd backend
npm install
npm run dev
```

The backend uses `backend/.env` and runs on `http://localhost:5001`.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend uses `frontend/.env` and runs on `http://localhost:5173`.

## Features

- Register and login
- Search and filter courts
- Browse court details
- Add, edit, and delete owned courts
- Update or delete the authenticated user profile

## API Routes

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

### Users

- `GET /user`
- `GET /user/:id`
- `PUT /user/:id`
- `DELETE /user/:id`

### Courts

- `GET /court`
- `GET /court/:id`
- `POST /court`
- `PUT /court/:id`
- `DELETE /court/:id`

Supported sports include futsal, basketball, badminton, cricket, tennis, table tennis, swimming, volleyball, squash, padel, and pickleball.
