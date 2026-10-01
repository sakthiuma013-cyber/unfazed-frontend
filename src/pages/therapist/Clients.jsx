import React, { useContext } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FDFBF7' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '50px 40px', maxWidth: '1300px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* Warm Greeting Top Header Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', background: 'linear-gradient(135deg, #E6ECE6 0%, #D8E2DC 100%)', padding: '32px 40px', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.1)' }}>
          <div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#3D5A45', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Workspace Control Suite</span>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E2922', margin: '4px 0 0 0' }}>
              Good day, {user?.name || 'Practitioner'}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', fontWeight: '600' }}>
            <span style={{ width: '8px', height: '8px', background: '#2A9D8F', borderRadius: '50%' }}></span>
            <span style={{ color: '#3D5A45' }}>Ecosystem Node Connected</span>
          </div>
        </div>

        {/* 3-Column Vibrant Visual Metrics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', borderLeft: '5px solid #3D5A45', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.04)' }}>
            <div style={metricLabelStyle}>Enrolled Active Clients</div>
            <div style={metricValueStyle}>05 <span style={{ fontSize: '14px', color: '#5C6760', fontWeight: '400' }}>/ 05 cap</span></div>
          </div>
          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', borderLeft: '5px solid #E07A5F', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.04)' }}>
            <div style={metricLabelStyle}>Gross Income Log</div>
            <div style={metricValueStyle}>₹48.5K <span style={{ fontSize: '13px', color: '#2A9D8F', background: '#E8F5F3', padding: '2px 6px', borderRadius: '4px' }}>+14.2%</span></div>
          </div>
          <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', borderLeft: '5px solid #F4A261', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.04)' }}>
            <div style={metricLabelStyle}>Subscription Level</div>
            <div style={{ ...metricValueStyle, color: '#3D5A45' }}>Standard Free</div>
          </div>
        </div>

        {/* Action Panel Workspace Framework Boards Layout */}
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>
            Clinical Management Shortcuts
          </h2>
          
          {/* COMPLETE 5-COLUMN STRUCTURAL FLEX GRID CONFIGURATION */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            
            {/* SHORTCUT CARD 1: CLIENT CRM LOGS */}
            <Link to="/clients" style={actionCardStyle}>
              <div style={iconBadgeStyle('#3D5A45')}>👥</div>
              <h3 style={cardTitleStyle}>Client CRM Directory Logs</h3>
              <p style={cardDescStyle}>Review inbound client profiles, keep track of digital intake forms, and manage secure liability consent tracking logs.</p>
            </Link>

            {/* SHORTCUT CARD 2: SCHEDULING MATRIX */}
            <Link to="/schedule" style={actionCardStyle}>
              <div style={iconBadgeStyle('#E07A5F')}>📅</div>
              <h3 style={cardTitleStyle}>Availability Slots Matrix</h3>
              <p style={cardDescStyle}>Configure timezone-aware booking rules, schedule custom opening calendar blocks, and establish session interval buffers.</p>
            </Link>

            {/* SHORTCUT CARD 3: SOAP NOTES SUITE */}
            <Link to="/notes" style={actionCardStyle}>
              <div style={iconBadgeStyle('#F4A261')}>📝</div>
              <h3 style={cardTitleStyle}>Encounter Notes Suite</h3>
              <p style={cardDescStyle}>Compile historical treatment timelines and draft secure session notes using clinical SOAP documentation templates.</p>
            </Link>

            {/* SHORTCUT CARD 4: WEBSOCKET REAL-TIME LIVE MESSAGING */}
            <Link to="/portal" style={actionCardStyle}>
              <div style={iconBadgeStyle('#E07A5F')}>💬</div>
              <h3 style={cardTitleStyle}>Live Message Hub</h3>
              <p style={cardDescStyle}>Open direct, end-to-end communication channels with active clients using secure real-time WebSocket nodes.</p>
            </Link>

            {/* SHORTCUT CARD 5: REVENUE & PRACTICE PERFORMANCE ANALYTICS */}
            <Link to="/analytics" style={{ ...actionCardStyle, borderTop: '4px solid #2A9D8F' }}>
              <div style={iconBadgeStyle('#2A9D8F')}>📊</div>
              <h3 style={cardTitleStyle}>Performance & Financial Matrix</h3>
              <p style={cardDescStyle}>Track dynamic revenue volume distributions, review settlement streams, and monitor subscriber velocity.</p>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}

/* --- Premium Unified Style Tokens Blocks --- */
const metricLabelStyle = { fontSize: '12px', fontWeight: '700', color: '#5C6760', textTransform: 'uppercase', letterSpacing: '0.04em' };
const metricValueStyle = { fontSize: '28px', fontWeight: '800', color: '#1E2922', marginTop: '6px' };

const actionCardStyle = {
  display: 'block',
  padding: '28px 24px',
  textDecoration: 'none',
  color: 'inherit',
  background: '#FFFFFF',
  border: '1px solid rgba(61, 90, 69, 0.12)',
  borderRadius: '14px',
  boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.04)',
  transition: 'transform 0.2s ease-out, border-color 0.2s ease-out',
  boxSizing: 'border-box'
};

const iconBadgeStyle = (color) => ({
  width: '46px',
  height: '46px',
  background: color + '10',
  border: `1px solid ${color}30`,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  marginBottom: '20px'
});

const cardTitleStyle = { margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#1E2922' };
const cardDescStyle = { margin: 0, fontSize: '13px', color: '#5C6760', lineHeight: '1.5' };
