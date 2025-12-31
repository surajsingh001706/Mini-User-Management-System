# 🧑‍💼 Mini User Management System

A robust, full-stack application for managing users and tasks with role-based access control (RBAC). Built with **React** (Frontend) and **Node.js/Express** (Backend), this system demonstrates authentications, secure CRUD operations, and modern deployment practices.

## 🌐 Live Demos

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | [View Application](https://mini-user-management-system-mocha.vercel.app/) | 🟢 Live |
| **Backend API** | [View API Base](https://mini-user-management-system-wjjd.onrender.com/) | 🟢 Live |

---

## 🚀 Key Features

*   **Role-Based Access Control**:
    *   **Admin**: View all users, manage user status (Active/Inactive), and delete users.
    *   **Regular User**: Update profile, change password, and manage personal tasks.
*   **Task Management**: Create, read, update, and delete tasks (specific to logged-in user).
*   **Authentication**: Secure Signup & Login using JWT and Bcrypt.
*   **Notifications**: Real-time feedback using React Toastify.
*   **Responsive UI**: Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Routing**: React Router DOM v6
*   **State**: Context API
*   **Styling**: CSS Modules / Standard CSS
*   **Utilities**: Axios, React Toastify

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose)
*   **Security**: Helmet, CORS, JWT, BcryptJS
*   **Validation**: Express Validator

---

## 📖 API Documentation

### Auth Endpoints
*   `POST /api/auth/signup` - Register new user
*   `POST /api/auth/login` - Authenticate user & get token
*   `POST /api/auth/logout` - Logout (Client-side clear)

### User Endpoints
*   `GET /api/users/profile` - Get logged-in user details
*   `PUT /api/users/profile` - Update profile info
*   `GET /api/users` - Get all users (**Admin Only**)
*   `PATCH /api/users/:id/status` - Toggle user status (**Admin Only**)
*   `DELETE /api/users/:id` - Delete user (**Admin Only**)

### Task Endpoints
*   `GET /api/tasks` - Get my tasks
*   `POST /api/tasks` - Create new task
*   `PUT /api/tasks/:id` - Update task (Title, Description, Status)
*   `DELETE /api/tasks/:id` - Delete task

---

## 🔧 Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/surajsingh001706/Mini-User-Management-System.git
cd Mini-User-Management-System
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
*Create a `.env` file in `backend/`:*
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Deliverables Checklist
- [x] **GitHub Repo**: Monorepo structure (`frontend`/`backend`).
- [x] **Commit History**: Meaningful commits throughout development.
- [x] **Security**: `.env` excluded via `.gitignore`.
- [x] **Functionality**: Login/Signup, RBAC, CRUD Tasks, Profile Management.
- [x] **Deployment**: Live on Vercel & Render.
