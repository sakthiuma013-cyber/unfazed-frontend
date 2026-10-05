import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');

  // 👥 Dynamic Mock Datastore for Practitioner Review Milestone Checking
  const mockClients = [
    { id: '1', name: 'Harry Styles', email: 'harry@example.com', trackingStatus: 'Active Care Plan', nextSession: 'Monday 09:00 AM' },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah13@gmail.com', trackingStatus: 'Intake Stage', nextSession: 'Pending Clearance' },
    { id: '3', name: 'Ananya Iyer', email: 'ananya@domain.com', trackingStatus: 'Active Care Plan', nextSession: 'Wednesday 11:00 AM' }
  ];

  const filteredClients = mockClients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', color: '#1E2922' }}>
      <Navbar />
      
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* Header Block Panel */}
        <header style={{ marginBottom: '32px', borderBottom: '1px solid rgba(61, 90, 69, 0.1)', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', color: '#1E2922', fontWeight: '700', margin: 0 }}>
            Client CRM Directory Ledger
          </h2>
          <p style={{ color: '#5C6760', fontSize: '15px', margin: '4px 0 0 0' }}>
            Review registered patient health spaces, monitor onboarding stages, and track intake statuses.
          </p>
        </header>

        {/* Search Search Filter Utility Desk Input */}
        <div style={{ marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search patient profiles by name signature or email address..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(61, 90, 69, 0.2)', fontSize: '14px', background: '#FFFFFF', color: '#1E2922', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* 📋 TABLE PATIENT CARD LIST LAYOUT DESK */}
        <div style={{ background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F4F6F2', borderBottom: '1px solid rgba(61, 90, 69, 0.08)' }}>
                <th style={thStyle}>Patient Name</th>
                <th style={thStyle}>Email Target</th>
                <th style={thStyle}>Care Lifecycle Status</th>
                <th style={thStyle}>Allocated Slot Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: '#5C6760', fontSize: '14px' }}>
                    No matching patient data documents located in database ledger.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} style={{ borderBottom: '1px solid rgba(61, 90, 69, 0.05)' }}>
                    <td style={tdStyle}><strong>{client.name}</strong></td>
                    <td style={tdStyle}>{client.email}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px',
                        background: client.trackingStatus === 'Active Care Plan' ? '#E8F5F3' : '#FDF0EC',
                        color: client.trackingStatus === 'Active Care Plan' ? '#2A9D8F' : '#E07A5F'
                      }}>\
                        {client.trackingStatus}
                      </span>
                    </td>
                    <td style={tdStyle}>{client.nextSession}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

const thStyle = { padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.04em' };
const tdStyle = { padding: '18px 20px', fontSize: '14px', color: '#1E2922' };
