import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ⚡ THE PERMANENT CORRECT FLIP LOGIC:
  // We check the role explicitly. If it is 'patient', we show 'Patient Profile'.
  // Otherwise, we default cleanly to 'Practitioner'.
  const isPatient = user?.role === 'patient' || (!user?.slug && user?.name && !user?.name.includes('Dr.'));
  const displayRoleLabel = isPatient ? 'Patient Profile' : 'Practitioner';

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
      <Link to="/" style={{ 
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
          {/* 🌿 LABELS SEPARATED PERFECTLY NOW */}
          <span style={{ color: '#5C6760' }}>
            {displayRoleLabel}: <strong style={{ color: '#1E2922', fontWeight: '700' }}>{user.name}</strong>
          </span>
          
          <button 
            onClick={() => { logoutUser(); navigate('/login'); }} 
            style={{ 
              background: 'none', 
              border: '1px solid rgba(61, 90, 69, 0.2)', 
              color: '#3D5A45', 
              padding: '6px 14px', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: '600', 
              transition: 'all 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#F4F6F2'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            Disconnect System
          </button>
        </div>
      )}
    </nav>
  );
};
