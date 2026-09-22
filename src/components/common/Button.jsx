import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  const baseStyle = { padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, transition: 'all 0.2s' };
  const variants = {
    primary: { background: '#2563EB', color: 'white' },
    secondary: { background: '#64748B', color: 'white' },
    danger: { background: '#DC2626', color: 'white' }
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...baseStyle, ...variants[variant] }}>
      {children}
    </button>
  );
};
