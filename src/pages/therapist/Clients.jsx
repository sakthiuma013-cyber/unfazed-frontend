import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockClients = [
    { id: '1', name: 'Harry Styles', email: 'harry@example.com', trackingStatus: 'Active Care Plan', nextSession: 'Monday 09:00 AM' },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah13@gmail.com', trackingStatus: 'Intake Stage', nextSession: 'Pending Clearance' }
  ];

  const filteredClients = mockClients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', color: '#1E2922' }}>
      <Navbar />
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: '32px', borderBottom: '1px solid rgba(61, 90, 69, 0.1)', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', color: '#1E2922', fontWeight: '700', margin: 0 }}>Client CRM Directory Ledger</h2>
          <p style={{ color: '#5C6760', fontSize: '15px', margin: '4px 0 0 0' }}>Review registered patient health spaces and track intake statuses.</p>
        </header>

        <div style={{ marginBottom: '24px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search patient profiles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(61, 90, 69, 0.2)', fontSize: '14px' }}
          />
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F4F6F2', borderBottom: '1px solid rgba(61, 90, 69, 0.08)' }}>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#3D5A45' }}>Patient Name</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#3D5A45' }}>Email Target</th>
                <th style={{ padding: '16px 20px', fontSize: '12px', fontWeight: '700', color: '#3D5A45' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} style={{ borderBottom: '1px solid rgba(61, 90, 69, 0.05)' }}>
                  <td style={{ padding: '18px 20px', fontSize: '14px' }}><strong>{client.name}</strong></td>
                  <td style={{ padding: '18px 20px', fontSize: '14px' }}>{client.email}</td>
                  <td style={{ padding: '18px 20px', fontSize: '14px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', background: '#E8F5F3', color: '#2A9D8F' }}>
                      {client.trackingStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
