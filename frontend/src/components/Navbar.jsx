import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkStyle = (path) => ({
        color: location.pathname === path ? 'var(--primary-color)' : 'var(--text-color)',
        fontWeight: location.pathname === path ? 700 : 500,
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--border-radius)',
        transition: 'background-color 0.2s, color 0.2s',
    });

    return (
        <nav style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #e2e8f0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 1rem',
                height: '64px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--primary-color)',
                    textDecoration: 'none'
                }}>
                    User System
                </Link>

                {user && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {user.role === 'admin' ? (
                            <Link to="/admin" style={navLinkStyle('/admin')}>Dashboard</Link>
                        ) : (
                            <Link to="/tasks" style={navLinkStyle('/tasks')}>My Tasks</Link>
                        )}
                        <Link to="/profile" style={navLinkStyle('/profile')}>Profile</Link>

                        <div style={{
                            height: '24px',
                            width: '1px',
                            backgroundColor: '#e2e8f0',
                            margin: '0 0.5rem'
                        }}></div>

                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {user.fullName} ({user.role})
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #e2e8f0',
                                padding: '0.4rem 0.8rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: 'var(--text-color)'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}

                {!user && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" style={navLinkStyle('/login')}>Login</Link>
                        <Link to="/signup" style={{
                            ...navLinkStyle('/signup'),
                            backgroundColor: 'var(--primary-color)',
                            color: 'white'
                        }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
