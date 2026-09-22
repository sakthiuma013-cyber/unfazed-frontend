import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';

export default function Clients() {
  // Hardcoded static record matrices to inject dynamic visual details immediately
  const [clients] = useState([
    {
      _id: "mock_1",
      name: "Ananya Iyer",
      email: "ananya.iyer@gmail.com",
      phone: "+91 98401 23456",
      intake_status: "completed",
      consent_signed: true,
      consent_timestamp: new Date().toLocaleString(),
      medical_history: { concerns: "Generalized anxiety patterns presenting during high-stress academic transitions.", past_therapy: "Cognitive Behavioral Therapy sub-sessions completed in 2024." }
    },
    {
      _id: "mock_2",
      name: "Rahul Malhotra",
      email: "rahul.m@yahoo.com",
      phone: "+91 91760 98765",
      intake_status: "pending",
      consent_signed: false,
      consent_timestamp: null,
      medical_history: { concerns: "Seeking occupational burnout processing strategy blocks.", past_therapy: "None declared." }
    }
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', color: '#1E2922' }}>
      <Navbar />
      
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: '#1E2922', fontWeight: '700', marginBottom: '6px' }}>
            Patient CRM Directory Ledger
          </h2>
          <p style={{ color: '#5C6760', fontSize: '15px' }}>
            Monitor active intakes, check medical presentation metrics, and manage user profile states.
          </p>
        </header>

        {/* 2-Column Split Workspace Board */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* THE DATA SHEET TABLE CONTAINER */}
          <div style={{ padding: '4px', overflow: 'hidden', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.05)' }}>
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Client Name Reference</th>
                    <th style={thStyle}>Communications Endpoint</th>
                    <th style={thStyle}>Processing State</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id}>
                      <td style={{ ...tdStyle, fontWeight: '700', color: '#1E2922' }}>{client.name}</td>
                      <td style={{ ...tdStyle, color: '#5C6760', fontFamily: 'monospace' }}>{client.email}</td>
                      <td style={tdStyle}>
                        <span style={{ 
                          display: 'inline-flex', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
                          background: client.intake_status === 'completed' ? '#E8F5F3' : '#FDF0EC', 
                          color: client.intake_status === 'completed' ? '#2A9D8F' : '#E07A5F',
                          border: `1px solid ${client.intake_status === 'completed' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)'}`
                        }}>{client.intake_status}</span>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'right' }}>
                        <button 
                          onClick={() => setSelected(client)} 
                          style={{ background: '#3D5A45', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}
                        >
                          Manage Log File
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* SLIDE-OUT OVERVIEW INFORMATION CARD */}
          {selected && (
            <div style={{ padding: '28px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#1E2922', fontWeight: '700' }}>Client Overview</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#5C6760', fontWeight: 'bold' }}>&times;</button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div><strong style={{ color: '#3D5A45' }}>Phone Link:</strong> {selected.phone}</div>
                <div><strong style={{ color: '#3D5A45' }}>Consent:</strong> {selected.consent_signed ? "True Signed" : "False"}</div>
                <div><strong style={{ color: '#3D5A45' }}>Clock Stamp:</strong> {selected.consent_timestamp || "N/A"}</div>
                <div style={{ marginTop: '10px', paddingTop: '14px', borderTop: '1px solid rgba(61, 90, 69, 0.08)' }}>
                  <strong style={{ color: '#3D5A45', display: 'block', marginBottom: '4px' }}>Primary Presentation Concerns:</strong>
                  <p style={{ margin: 0, color: '#5C6760', lineHeight: '1.5' }}>{selected.medical_history.concerns}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

const thStyle = { background: '#F4F6F2', color: '#3D5A45', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '14px 20px', borderBottom: '2px solid rgba(61, 90, 69, 0.1)', textAlign: 'left' };
const tdStyle = { padding: '16px 20px', borderBottom: '1px solid rgba(61, 90, 69, 0.06)', fontSize: '14px', verticalAlign: 'middle' };
