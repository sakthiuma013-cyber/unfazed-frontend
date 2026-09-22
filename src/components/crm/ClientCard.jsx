import React from 'react';

export const ClientCard = ({ client }) => (
  <div style={{ padding: '20px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
    <h3 style={{ margin: '0 0 12px 0', color: '#0F172A' }}>Metadata Ledger: {client?.name}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#334155' }}>
      <div><strong>Email Contact:</strong> {client?.email}</div>
      <div><strong>Phone Link:</strong> {client?.phone || 'N/A'}</div>
      <div><strong>Consent Verified Status:</strong> {client?.consent_signed ? 'True Signed Timestamped' : 'False'}</div>
      <div><strong>Consent Logged Clock:</strong> {client?.consent_timestamp ? new Date(client.consent_timestamp).toLocaleString() : 'N/A'}</div>
    </div>
    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #E2E8F0' }}>
      <strong>Primary Presentation Concerns:</strong>
      <p style={{ margin: '6px 0 0 0', color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>{client?.medical_history?.concerns || 'No intake records declared.'}</p>
    </div>
  </div>
);
