import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const { data } = await api.get('/users/me');
                setUser(data.data); // Adjust based on actual API response structure
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token); // Adjust based on API response
            // After login, fetch user details or use data.user if provided
            // Checking /me is safer or using returned user object
            if (data.user) {
                setUser(data.user);
            } else {
                await checkUserLoggedIn();
            }
            toast.success('Login successful!');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed';
            toast.error(msg);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const { data } = await api.post('/auth/signup', userData);
            localStorage.setItem('token', data.token);
            if (data.user) {
                setUser(data.user);
            } else {
                await checkUserLoggedIn();
            }
            toast.success('Signup successful!');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || 'Signup failed';
            toast.error(msg);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
