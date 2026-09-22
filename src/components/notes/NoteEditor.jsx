import React, { useState } from 'react';

export const NoteEditor = ({ onSave }) => {
  const [noteType, setNoteType] = useState('private');
  const [soap, setSoap] = useState({ subjective: '', objective: '', assessment: '', plan: '' });

  const submitNote = (e) => {
    e.preventDefault();
    onSave({ note_type: noteType, content: soap });
    setSoap({ subjective: '', objective: '', assessment: '', plan: '' });
  };

  return (
    <form onSubmit={submitNote} style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
      <div style={{ marginBottom: '14px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Security Clearance Layer Visibility Gating Mode Selector:</label>
        <select value={noteType} onChange={(e) => setNoteType(e.target.value)} style={{ padding: '6px', borderRadius: '4px' }}>
          <option value="private">Private Clinical Blueprint (Therapist Panel Gated Only)</option>
          <option value="shared">Shared Interaction Metrics Summary (Client Interface Clear)</option>
        </select>
      </div>
      {['subjective', 'objective', 'assessment', 'plan'].map((field) => (
        <div key={field} style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', textTransform: 'capitalize', fontWeight: '500', marginBottom: '4px' }}>SOAP Structure Matrix Line: {field}</label>
          <textarea rows="3" value={soap[field]} onChange={(e) => setSoap({ ...soap, [field]: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} required />
        </div>
      ))}
      <button type="submit" style={{ background: '#2563EB', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Commit Note to Database</button>
    </form>
  );
};
