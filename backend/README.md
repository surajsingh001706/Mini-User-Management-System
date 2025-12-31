# Mini User Management System - Backend

A production-ready REST API for user management built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based Signup, Login, and Logout.
- **User Management**: Profile update, password change.
- **Admin**: View all users, activate/deactivate users.
- **Security**: Password hashing (bcrypt), Request validation, Role-based access control.

## Tech Stack

- **Node.js** & **Express**
- **MongoDB** (Mongoose)
- **JWT** & **Bcrypt** for Auth
- **Jest** & **Supertest** for Testing

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017 (or update .env)

### Installation

1. Navigate to backend:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Rename `.env.example` to `.env` and update values if needed.
   
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mini_user_management
   JWT_SECRET=your_secret_key
   ```

4. Run Server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout (Client side clear)

### Users
- `GET /api/users/me` - Get current user info (Protected)
- `PUT /api/users/updatedetails` - Update profile details
- `PUT /api/users/updatepassword` - Change password

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `PUT /api/admin/users/:id/status` - Activate/Deactivate user

## Testing

Run unit/integration tests:

```bash
npm test
```
