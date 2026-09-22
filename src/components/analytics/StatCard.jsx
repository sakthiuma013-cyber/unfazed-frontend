import React from 'react';

export const StatCard = ({ label, value, subtext }) => (
  <div style={{ padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
    <div style={{ fontSize: '14px', color: '#64748B', fontWeight: '500', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', margin: '6px 0' }}>{value}</div>
    {subtext && <div style={{ fontSize: '12px', color: '#10B981' }}>{subtext}</div>}
  </div>
);
