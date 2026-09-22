import React from 'react';

export const SoapTemplate = ({ content }) => (
  <div style={{ padding: '14px', background: '#F8FAFC', borderLeft: '4px solid #64748B', margin: '8px 0', borderRadius: '0 6px 6px 0' }}>
    {Object.entries(content || {}).map(([key, val]) => (
      <div key={key} style={{ fontSize: '13px', marginBottom: '4px' }}>
        <strong style={{ textTransform: 'uppercase', color: '#475569' }}>{key[0]}:</strong> <span style={{ color: '#1E293B' }}>{val}</span>
      </div>
    ))}
  </div>
);
