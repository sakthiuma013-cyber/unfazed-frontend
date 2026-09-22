import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Navbar } from '../../components/common/Navbar';

export default function Schedule() {
  const [selectedPreviewIdx, setSelectedPreviewIdx] = useState(null);
  const [slots, setSlots] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(1); // Default: Monday
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [slotDuration, setSlotDuration] = useState(45);
  const [bufferTime, setBufferTime] = useState(15);
  
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [previewIntervals, setPreviewIntervals] = useState([]);

  // Dynamically compute runtime preview intervals whenever parameters change
  useEffect(() => {
    if (!startTime || !endTime) return;
    const intervals = [];
    
    const timeToMin = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const minToTime = (m) => {
      const h = Math.floor(m / 60).toString().padStart(2, '0');
      const min = (m % 60).toString().padStart(2, '0');
      return `${h}:${min}`;
    };

    let currentMinutes = timeToMin(startTime);
    const endMinutes = timeToMin(endTime);
    const step = parseInt(slotDuration) + parseInt(bufferTime);

    while (currentMinutes + parseInt(slotDuration) <= endMinutes) {
      intervals.push({
        start: minToTime(currentMinutes),
        end: minToTime(currentMinutes + parseInt(slotDuration))
      });
      currentMinutes += step;
    }
    setPreviewIntervals(intervals);
  }, [startTime, endTime, slotDuration, bufferTime, dayOfWeek]);

  const addSlotBlock = () => {
    const newBlock = { day_of_week: parseInt(dayOfWeek), start_time: startTime, end_time: endTime };
    const isDuplicate = slots.some(s => s.day_of_week === newBlock.day_of_week && s.start_time === newBlock.start_time && s.end_time === newBlock.end_time);
    
    if (isDuplicate) {
      return setStatusMessage({ text: 'This specific calendar configuration block already exists in your staged queue.', type: 'error' });
    }
    setSlots([...slots, newBlock]);
    setStatusMessage({ text: 'Added slot block to collection stack. Click Save below to sync with server.', type: 'success' });
  };

  const commitAvailability = async () => {
    if (slots.length === 0) {
      return setStatusMessage({ text: 'Please define at least one operational day slot block before updating network configuration profiles.', type: 'error' });
    }
    setIsSaving(true);
    setStatusMessage({ text: '', type: '' });
    try {
      await axiosInstance.post('/schedule/availability', { 
        location_timezone: 'Asia/Kolkata', 
        weekly_slots: slots,
        slot_duration: parseInt(slotDuration),
        buffer_time: parseInt(bufferTime)
      });
      setStatusMessage({ text: '⚡ Calendar availability constraints locked across database channels successfully.', type: 'success' });
      setTimeout(() => setStatusMessage({ text: '', type: '' }), 4000);
    } catch (err) {
      setStatusMessage({ text: err.response?.data?.message || 'Error processing scheduling constraints updates.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', color: '#5C6760', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' };
  const inputOverrideStyle = { width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.25)', color: '#1E2922', padding: '12px 10px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', display: 'block' };

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7' }}>
      <Navbar />
      <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: '#1E2922', marginBottom: '6px' }}>Availability Management Engine</h2>
          <p style={{ color: '#5C6760', fontSize: '15px' }}>Configure structural clinical calendar vectors and slice operational windows down into secure patient appointment slots.</p>
        </header>

        {statusMessage.text && (
          <div style={{ padding: '14px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', border: '1px solid', backgroundColor: statusMessage.type === 'success' ? '#E8F5F3' : '#FDF0EC', borderColor: statusMessage.type === 'success' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)', color: statusMessage.type === 'success' ? '#2A9D8F' : '#E07A5F' }}>
            {statusMessage.text}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* COLUMN 1: SIDEBAR CONFIGURATION INPUTS */}
          <section style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)' }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: '#1E2922' }}>Slot Configuration Engine</h3>
            <div>
              <label style={labelStyle}>Target Weekday</label>
              <select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(61,90,69,0.25)', color: '#1E2922', backgroundColor: '#FFFFFF' }}>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d, i) => (
                  <option key={i} value={i}>{d}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label style={labelStyle}>Start Time</label>
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={inputOverrideStyle} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label style={labelStyle}>End Time</label>
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={inputOverrideStyle} />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label style={labelStyle}>Session (Mins)</label>
                <input type="number" min="15" max="180" value={slotDuration} onChange={e => setSlotDuration(e.target.value)} style={inputOverrideStyle} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <label style={labelStyle}>Rest Buffer (Mins)</label>
                <input type="number" min="0" max="60" value={bufferTime} onChange={e => setBufferTime(e.target.value)} style={inputOverrideStyle} />
              </div>
            </div>
            
            <button type="button" onClick={addSlotBlock} style={{ width: '100%', padding: '12px', background: '#F4A261', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '8px' }}>
              ➕ Push Block to Stack
            </button>
            
            <button type="button" onClick={commitAvailability} disabled={isSaving} style={{ width: '100%', padding: '14px', background: '#3D5A45', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
              {isSaving ? 'Syncing Base Data...' : '💾 Save Complete Layout'}
            </button>
          </section>

                    {/* COLUMN 2: ACTIVE STACK & LIVE PREVIEW MATRIX */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Queued Target Slots Tracker Card */}
            <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1E2922', fontWeight: '700' }}>Staged Active Weekly Time Boundaries Queue</h4>
              {slots.length === 0 ? (
                <p style={{ color: '#5C6760', fontSize: '14px', margin: 0 }}>No calendar blocks queued up yet. Configure parameters on the left panel to begin.</p>
              ) : (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {slots.map((s, idx) => (
                    <div key={idx} style={{ padding: '8px 14px', background: '#F4F6F2', border: '1px solid rgba(61,90,69,0.15)', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '700', color: '#3D5A45' }}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][s.day_of_week]}: {s.start_time} - {s.end_time}
                      </span>
                      <button type="button" onClick={() => setSlots(slots.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#E07A5F', cursor: 'pointer', fontSize: '16px', fontWeight: '800' }}>&times;</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Interactive Click-Selection Sliced Matrix Preview */}
            <div style={{ padding: '24px', background: '#FFFFFF', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1E2922', fontWeight: '700' }}>Real-Time Calculated Bookable Session Units Preview</h4>
              <p style={{ color: '#5C6760', fontSize: '12px', marginBottom: '16px' }}>This tracks exactly how your client interface will compute individual bookable windows:</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                {previewIntervals.map((slot, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedPreviewIdx(i)} 
                    style={{ 
                      padding: '10px', 
                      background: selectedPreviewIdx === i ? '#DCFCE7' : '#FFFDF9', 
                      border: selectedPreviewIdx === i ? '1px solid #2A9D8F' : '1px dashed rgba(61, 90, 69, 0.2)', 
                      borderRadius: '6px', 
                      textAlign: 'center', 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: selectedPreviewIdx === i ? '#166534' : '#1E2922',
                      cursor: 'pointer', 
                      transform: selectedPreviewIdx === i ? 'scale(1.03)' : 'none',
                      transition: 'all 0.2s ease-out'
                    }}
                  >
                    {selectedPreviewIdx === i ? '✅ ' : '⏱️ '} {slot.start} - {slot.end}
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
