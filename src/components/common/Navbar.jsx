import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '16px 40px', 
      background: '#FFFFFF', 
      borderBottom: '1px solid rgba(61, 90, 69, 0.1)',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(61, 90, 69, 0.02)'
    }}>
      <Link to="/dashboard" style={{ 
        color: '#3D5A45', 
        textDecoration: 'none', 
        fontWeight: '800', 
        fontSize: '22px',
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        ✨ AuraHealth
      </Link>
      {user && (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontSize: '14px' }}>
          <span style={{ color: '#5C6760' }}>Practitioner: <strong style={{ color: '#1E2922', fontWeight: '700' }}>{user.name}</strong></span>
          <button onClick={() => { logoutUser(); navigate('/login'); }} style={{ background: 'none', border: '1px solid rgba(61, 90, 69, 0.2)', color: '#3D5A45', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>Disconnect System</button>
        </div>
      )}
    </nav>
  );
};
