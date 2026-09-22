import React from 'react';

export const ServiceCard = ({ title, sessions, price, onSelect }) => (
  <div style={{ padding: '24px', background: 'white', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
    <div>
      <h3 style={{ margin: 0, color: '#0F172A' }}>{title}</h3>
      <p style={{ color: '#64748B', fontSize: '14px' }}>Bundle Capacity: {sessions} Session Units</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0F172A' }}>₹{price}</span>
      <button onClick={onSelect} style={{ background: '#2563EB', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Choose Pack</button>
    </div>
  </div>
);
