# PeopleFlow HRMS

## Run locally

1. Set `MONGODB_URI`, `TOKEN_SECRET`, and `CLIENT_URL` in `backend/.env`.
2. Run `npm run dev` in `backend` and `frontend` (use `npm.cmd` in PowerShell environments that block `npm.ps1`).
3. Register an account, then promote the intended administrator's MongoDB `User.role` to `ADMIN`. Administrators create employee accounts from the Employees screen.

The frontend API base URL is `http://localhost:5000/api`; change `src/api/axiosInstance.js` for a deployed API.

## API overview

All routes except signup/login require `Authorization: Bearer <token>`.

| Area | Routes |
| --- | --- |
| Auth | `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`, `POST /auth/logout` |
| Profile | `PATCH /profile` |
| Employees (admin) | `GET/POST /employees`, `GET/PUT/DELETE /employees/:id` |
| Leaves | `GET/POST /leaves`, `PUT /leaves/:id/approve`, `PUT /leaves/:id/reject` (admin review) |
| Attendance | `POST /attendance/check-in`, `POST /attendance/check-out`, `GET /attendance/:employeeId`, `GET /attendance/today`, `GET /attendance`, `GET /attendance/summary` |
| Admin dashboard | `GET /admin/dashboard` |

`GET /employees` accepts `search`. `GET /leaves` accepts `status`. Admin attendance supports `date`, `employeeId`, `status`, `from`, and `to` where applicable. API errors use `{ "message": "…" }`, which the UI surfaces in an alert.
