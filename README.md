# Operation Scheduler

A full-stack web application for hospital operation scheduling, built with Node.js (Express, MongoDB) for the backend and React (Vite, Tailwind CSS) for the frontend. Admins can manage doctors, patients, operation theatres, and surgeries. Users can register, login, and view their details.

---

## Table of Contents
- [Operation Scheduler](#operation-scheduler)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Backend Setup](#2-backend-setup)
    - [3. Frontend Setup](#3-frontend-setup)
  - [Admin Login Details](#admin-login-details)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Doctors](#doctors)
    - [Patients](#patients)
    - [Operation Theatres](#operation-theatres)
    - [Surgeries](#surgeries)
  - [Frontend Pages](#frontend-pages)
  - [License](#license)

---

## Features
- **Admin Login**: Only admins can login (not register) and manage all data.
- **User Registration/Login**: Users can register and login.
- **Doctor Management**: Add, edit, delete, and view doctor details.
- **Patient Management**: Add, edit, delete, and view patient details.
- **Operation Theatre Management**: Manage OT details.
- **Surgery Scheduling**: Post and manage surgery schedules.
- **Protected Routes**: Role-based access for admin and users.

---

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router DOM

---

## Project Structure

```
Operation Scheduler/
├── backend/
│   ├── index.js                # Main server file
│   ├── package.json            # Backend dependencies
│   ├── .env                    # Environment variables
│   ├── connectDb/db.js         # MongoDB connection
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Auth middleware
│   ├── models/                 # Mongoose models (User, Doctor, Patient, OT, Surgery)
│   ├── routes/                 # API routes
│   ├── utils/admin.js          # Default admin creation
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── package.json            # Frontend dependencies
│   ├── src/
│   │   ├── main.jsx            # React entry point
│   │   ├── App.jsx             # Main App component
│   │   ├── api/axios.js        # Axios config
│   │   ├── components/         # Navbar, ProtectedRoute
│   │   ├── pages/              # Home, Login, Register, Doctors, Patients, OTs, Surgeries, Profile
│   │   ├── assets/             # Images and icons
│   │   ├── App.css, index.css  # Styles
│   ├── public/                 # Static assets
│   ├── README.md               # Frontend README
```

---

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repo-url>
cd "Operation Scheduler"
```

### 2. Backend Setup
```sh
cd backend
npm install
```
- Create a `.env` file with:
  ```env
  MONGO_URI=mongodb://localhost:27017/operation_scheduler
  JWT_SECRET=your_jwt_secret
  ```
- Start the backend server:
  ```sh
  node index.js
  # or for development
  npx nodemon index.js
  ```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```
- The frontend will run on `http://localhost:5173` by default.

---

## Admin Login Details
- **Email**: `admin@example.com`
- **Password**: `Admin@123`

> The default admin is created automatically when the backend starts (see `backend/utils/admin.js`).

---

## API Endpoints

### Auth
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — Login (user & admin)
- `GET /api/auth/logout` — Logout
- `GET /api/auth/me` — Get current user

### Doctors
- `GET /api/doctors` — List doctors
- `POST /api/doctors` — Add doctor
- `PUT /api/doctors/:id` — Update doctor
- `DELETE /api/doctors/:id` — Delete doctor

### Patients
- `GET /api/patients` — List patients
- `POST /api/patients` — Add patient
- `PUT /api/patients/:id` — Update patient
- `DELETE /api/patients/:id` — Delete patient

### Operation Theatres
- `GET /api/ots` — List OTs
- `POST /api/ots` — Add OT
- `PUT /api/ots/:id` — Update OT
- `DELETE /api/ots/:id` — Delete OT

### Surgeries
- `GET /api/surgeries` — List surgeries
- `POST /api/surgeries` — Add surgery
- `PUT /api/surgeries/:id` — Update surgery
- `DELETE /api/surgeries/:id` — Delete surgery

---

## Frontend Pages
- **Home**: Landing page
- **Login**: User/admin login
- **Register**: User registration
- **Doctors**: Manage doctors
- **Patients**: Manage patients
- **OTs**: Manage operation theatres
- **Surgeries**: Manage surgeries
- **Profile**: View user/admin profile

---

## License
This project is for educational purposes.
