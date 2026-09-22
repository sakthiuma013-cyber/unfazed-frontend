import React from 'react';

export const About = ({ bio, languages }) => (
  <div style={{ padding: '30px', background: 'white', borderRadius: '8px', margin: '20px 0', border: '1px solid #E2E8F0' }}>
    <h2 style={{ color: '#0F172A', marginBottom: '12px' }}>Professional Biography</h2>
    <p style={{ color: '#334155', lineHeight: '1.6' }}>{bio || 'No analytical overview bio configuration defined yet.'}</p>
    <div style={{ marginTop: '16px' }}>
      <strong>Languages Fluent:</strong> {languages?.join(', ') || 'English'}
    </div>
  </div>
);
