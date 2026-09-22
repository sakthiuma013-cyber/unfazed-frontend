import React from 'react';

export const Hero = ({ name, specializations }) => (
  <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
    <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>{name || 'Mental Health Professional'}</h1>
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {specializations?.map((spec, i) => (
        <span key={i} style={{ background: '#2563EB', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px' }}>{spec}</span>
      ))}
    </div>
  </div>
);
