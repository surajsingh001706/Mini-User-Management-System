# User Management System

A production-ready Mini User Management System with React frontend and Node.js/Express backend. Features secure authentication, role-based access control (Admin/User), profile management, and a dynamic task management system.

## 🚀 Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Standard CSS (Responsive & Modern UI)
- **State Management**: Context API
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt (hashing), CORS, Helmet
- **Logging**: Morgan

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mini-User-Management-System
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
# (See Environment Variables section below)

# Start Server
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
# App runs on http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
node_env=development
```

*(Note: Never commit your actual `.env` file to version control)*

---

## 📡 API Documentation

### Auth
- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Login user & return JWT
- **POST** `/api/auth/logout` - Logout user

### Users
- **GET** `/api/users/profile` - Get current user profile (Protected)
- **PUT** `/api/users/profile` - Update profile details (Protected)
- **PUT** `/api/users/change-password` - Change password (Protected)
- **GET** `/api/users` - Get all users (Admin only)
- **PATCH** `/api/users/:id/status` - Toggle user status (Admin only)
- **DELETE** `/api/users/:id` - Delete user (Admin only)

### Tasks
- **GET** `/api/tasks` - Get current user's tasks
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks/:id` - Update task (Title, Description, Status)
- **DELETE** `/api/tasks/:id` - Delete a task

---

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Import repository to Vercel/Netlify.
3. Set **Root Directory** to `frontend`.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add environment variable `VITE_API_URL` pointing to your deployed backend URL.

### Backend (Render/Railway)
1. Push code to GitHub.
2. Import repository to Render/Railway.
3. Set **Root Directory** to `backend`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`) in the dashboard.

---

## 📝 Deliverables Checklist
- [x] **GitHub Repo**: Monorepo structure (`frontend`/`backend`).
- [x] **Commit History**: Meaningful commits throughout development.
- [x] **Security**: `.env` excluded via `.gitignore`.
- [x] **Functionality**:
    - Login/Signup
    - RBAC (Admin/User)
    - CRUD Tasks
    - Profile Management
