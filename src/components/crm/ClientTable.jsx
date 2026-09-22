import React from 'react';

export const ClientTable = ({ clients, onSelectClient }) => {
  return (
    <div style={{ overflowX: 'auto', width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            <th style={thStyle}>Client Name Reference</th>
            <th style={thStyle}>Registered Communications Endpoint</th>
            <th style={thStyle}>Intake Processing State</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Management System Operations</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id} style={{ transition: 'background-color 0.2s' }}>
              {/* FORCED HIGH CONTRAST DARK FOREST GREEN FOR TEXT LOGS */}
              <td style={{ ...tdStyle, fontWeight: '700', color: '#1E2922' }}>
                {client.name}
              </td>
              <td style={{ ...tdStyle, color: '#5C6760', fontFamily: 'monospace' }}>
                {client.email}
              </td>
              <td style={tdStyle}>
                <span style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px', 
                  borderRadius: '9999px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: client.intake_status === 'completed' ? '#E8F5F3' : '#FDF0EC', 
                  color: client.intake_status === 'completed' ? '#2A9D8F' : '#E07A5F',
                  border: `1px solid ${client.intake_status === 'completed' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)'}`
                }}>
                  {client.intake_status}
                </span>
              </td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <button 
                  onClick={() => onSelectClient(client)} 
                  style={{ 
                    background: 'var(--color-sage, #3D5A45)', 
                    color: '#FFFFFF', 
                    border: 'none', 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: '700', 
                    fontSize: '13px',
                    boxShadow: '0 4px 10px rgba(61, 90, 69, 0.1)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Manage Log File
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* --- Strict Explicit Layout Style Tokens to Stop Transparent Text Overlap --- */
const thStyle = {
  background: '#F4F6F2',
  color: '#3D5A45',
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  padding: '14px 20px',
  borderBottom: '2px solid rgba(61, 90, 69, 0.1)',
  textAlign: 'left'
};

const tdStyle = {
  padding: '16px 20px',
  borderBottom: '1px solid rgba(61, 90, 69, 0.06)',
  fontSize: '14px',
  verticalAlign: 'middle'
};
