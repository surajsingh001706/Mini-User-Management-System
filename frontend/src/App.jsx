import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import UserTasks from './pages/UserTasks';
import ProtectedRoute from './routes/ProtectedRoute';

const AppRoutes = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? '/admin' : '/profile'} />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to={user.role === 'admin' ? '/admin' : '/profile'} />} />

                {/* Protected Routes - General User */}
                <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                    <Route path="/tasks" element={<UserTasks />} />
                </Route>

                {/* Common Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate to="/profile" replace />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
                    <AppRoutes />
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </AuthProvider>
        </Router>
    );
}

export default App;
