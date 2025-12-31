import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type = 'button', onClick, disabled = false, variant = 'primary', style = {} }) => {
    const baseStyle = {
        padding: '0.75rem 1.5rem',
        borderRadius: 'var(--border-radius)',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        transition: 'transform 0.1s, opacity 0.2s',
        width: '100%',
        ...style
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--primary-color)',
            color: 'white',
        },
        secondary: {
            backgroundColor: 'var(--secondary-color)',
            color: 'white',
        },
        danger: {
            backgroundColor: 'var(--danger-color)',
            color: 'white',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '1px solid var(--primary-color)',
            color: 'var(--primary-color)'
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyle, ...variants[variant] }}
            onMouseDown={(e) => !disabled && (e.target.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => !disabled && (e.target.style.transform = 'scale(1)')}
            onMouseLeave={(e) => !disabled && (e.target.style.transform = 'scale(1)')}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
    style: PropTypes.object
};

export default Button;
