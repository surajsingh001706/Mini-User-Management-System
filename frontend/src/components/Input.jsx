import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, required = false }) => {
    return (
        <div className="input-group" style={{ marginBottom: '1rem' }}>
            {label && <label htmlFor={name} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-color)' }}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--border-radius)',
                    border: error ? '1px solid var(--danger-color)' : '1px solid #cbd5e1',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger-color)' : '#cbd5e1'}
            />
            {error && <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{error}</span>}
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool
};

export default Input;
