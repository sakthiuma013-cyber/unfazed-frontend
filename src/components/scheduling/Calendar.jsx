import React from 'react';

export const Calendar = ({ weeklySlots, onSelectSlot }) => (
  <div style={{ padding: '20px', background: 'white', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
    <h3 style={{ color: '#0F172A', marginBottom: '16px' }}>Available Booking Slots</h3>
    {weeklySlots?.length === 0 ? (
      <p style={{ color: '#64748B' }}>No clinical schedule blocks opened for reservation.</p>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {weeklySlots?.map((slot, idx) => (
          <div key={idx} onClick={() => onSelectSlot(slot)} style={{ padding: '12px', border: '1px solid #CBD5E1', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', background: '#F8FAFC', transition: 'all 0.2s' }}>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1E293B' }}>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.day_of_week]}
            </div>
            <div style={{ fontSize: '13px', color: '#2563EB', marginTop: '4px' }}>{slot.start_time} - {slot.end_time}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);
