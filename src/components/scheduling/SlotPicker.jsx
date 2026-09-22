import React from 'react';

export const SlotPicker = ({ selectedSlot, onConfirm }) => (
  <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '6px', border: '1px solid #BFDBFE', marginTop: '16px' }}>
    <p style={{ margin: 0, color: '#1E40AF', fontWeight: '500' }}>
      Selected Appointment Sequence Element: <strong>Day {selectedSlot?.day_of_week} ({selectedSlot?.start_time} - {selectedSlot?.end_time})</strong>
    </p>
    <button onClick={onConfirm} style={{ marginTop: '12px', background: '#2563EB', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
      Confirm Placement
    </button>
  </div>
);
