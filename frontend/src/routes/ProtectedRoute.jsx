import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid var(--primary-color)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;
