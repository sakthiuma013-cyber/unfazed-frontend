import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import { Navbar } from '../../components/common/Navbar';
import { CheckoutForm } from '../../components/payments/CheckoutForm';
import { InvoiceView } from '../../components/payments/InvoiceView';
import { ChatWindow } from '../../components/chat/ChatWindow';

export default function BookingPage() {
  const { user } = useContext(AuthContext);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeTab, setActiveTab] = useState('about'); 
  const [settled, setSettled] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [assignedPractitioner, setAssignedPractitioner] = useState({ name: 'Loading Doctor Profile...', id: '' });

  const baseSessionRoomId = "room_session_9942";

  useEffect(() => {
    axiosInstance.get('/auth/my-therapist')
      .then(res => {
        if (res.data && res.data.therapist) {
          setAssignedPractitioner({
            name: res.data.therapist.name,
            id: res.data.therapist.id
          });
        }
      })
      .catch(() => {
        setAssignedPractitioner({
          name: 'Dr. Sakthi Uma',
          id: '66f1bc09a3bc765103ad9871'
        });
      });
  }, [user]);

  const mockScheduleSlots = [
    { id: 1, day: 'Monday Session', time: '09:00 AM - 09:45 AM' },
    { id: 2, day: 'Wednesday Checkpoint', time: '11:00 AM - 11:45 AM' },
    { id: 3, day: 'Friday Follow-up', time: '03:00 PM - 03:45 PM' }
  ];

  const handleSlotConfirm = (slot) => {
    setSelectedSlot(slot.id);
    setStatusMessage({
      text: `📆 Care session held provisionally for ${slot.day} (${slot.time}). Settle dues in the billing panel to confirm.`,
      type: 'success'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', color: '#1E2922' }}>
      <Navbar />
      
      <div style={{ background: 'linear-gradient(135deg, #3D5A45 0%, #2F4535 100%)', color: 'white', padding: '48px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: '700' }}>Patient Wellness Dashboard</h1>
        <p style={{ color: '#D8E2DC', fontSize: '16px', margin: '0 0 16px 0' }}>Welcome back to your secure AuraHealth health space</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.02em' }}>
            🔒 Verified Account Status: Active
          </span>
        </div>
      </div>

      <main style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {statusMessage.text && (
          <div style={{ padding: '14px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', border: '1px solid', backgroundColor: statusMessage.type === 'success' ? '#E8F5F3' : '#FDF0EC', borderColor: statusMessage.type === 'success' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)', color: statusMessage.type === 'success' ? '#2A9D8F' : '#E07A5F' }}>
            {statusMessage.text}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(61, 90, 69, 0.12)', paddingBottom: '12px', marginBottom: '32px' }}>
          {['about', 'book', 'billing', 'chat'].map((tab) => (
            <button key={tab} onClick={() => { setActiveTab(tab); setStatusMessage({ text: '', type: '' }); }} style={{ background: activeTab === tab ? '#3D5A45' : 'transparent', color: activeTab === tab ? '#FFFFFF' : '#5C6760', border: activeTab === tab ? 'none' : '1px solid rgba(61,90,69,0.2)', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              {tab === 'about' ? '📋 My Treatment Profile' : tab === 'book' ? '📅 Book Therapy Slots' : tab === 'billing' ? '💳 Invoices & Billing' : '💬 Live Practitioner Chat'}
            </button>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.03)' }}>
          
          {activeTab === 'about' && (
            <div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1E2922', fontWeight: '700' }}>Your Personal Care Plan Summary</h3>
              <p style={{ color: '#5C6760', lineHeight: '1.6', fontSize: '15px', margin: '0 0 20px 0' }}>
                This is your dedicated workspace where you can review ongoing progress strategies, book open appointment times with your clinical practitioner, and track treatment package invoices.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(61, 90, 69, 0.08)', paddingTop: '20px' }}>
                <div style={{ flex: 1, background: '#E8F5F3', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#2A9D8F', fontWeight: '600' }}>
                  👤 Assigned Practitioner: {assignedPractitioner.name}
                </div>
                <div style={{ flex: 1, background: '#F4F6F2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#3D5A45' }}>
                  🎯 Focus Track: Stress & Work-Life Calibration
                </div>
              </div>
            </div>
          )}

          {activeTab === 'book' && (
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E2922', fontWeight: '700' }}>Select An Available Therapy Block</h3>
              <p style={{ color: '#5C6760', fontSize: '14px', marginBottom: '20px' }}>Click an open time slot from your practitioner's calendar below to reserve an upcoming appointment unit instantly.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {mockScheduleSlots.map((slot) => {
                  const isCurrent = selectedSlot === slot.id;
                  return (
                    <div key={slot.id} onClick={() => handleSlotConfirm(slot)} style={{ padding: '16px', background: isCurrent ? '#DCFCE7' : '#FFFDF9', border: isCurrent ? '1px solid #2A9D8F' : '1px dashed rgba(61,90,69,0.25)', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: isCurrent ? '#166534' : '#1E2922' }}>{slot.day}</div>
                      <div style={{ fontSize: '13px', color: isCurrent ? '#2A9D8F' : '#5C6760', marginTop: '4px' }}>{slot.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E2922', fontWeight: '700' }}>Outstanding Invoices</h3>
              <p style={{ color: '#5C6760', fontSize: '14px', marginBottom: '24px' }}>Settle package fees or generate transaction tax receipts via our encrypted checkout desk.</p>
              
              {settled ? (
                <InvoiceView paymentRecordId={paymentId} />
              ) : (
                <CheckoutForm 
                  amount={1500} 
                  client_id={user?.id || user?._id || "66f1bc20a3bc994205de1142"} 
                  therapist_id={assignedPractitioner.id || "66f1bc09a3bc765103ad9871"} 
                  onSuccess={(res) => {
                    setPaymentId(res.razorpay_payment_id || 'pay_sim_9988');
                    setSettled(true);
                    setStatusMessage({ text: '⚡ Transaction settled successfully! Your official tax receipt invoice is rendered below.', type: 'success' });
                  }}
                  onError={(err) => setStatusMessage({ text: `❌ Processing Halt: ${err}`, type: 'error' })}
                />
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E2922', fontWeight: '700' }}>Live Communication Terminal</h3>
              <p style={{ color: '#5C6760', fontSize: '14px', marginBottom: '20px' }}>Exchange instant messages safely with your clinical practitioner over our secure, real-time messaging network.</p>
              
              <ChatWindow 
                roomId={baseSessionRoomId}
                userId={user?.id || user?._id || "client_ananya_iyer"}
                userName={user?.name || "Harry Styles (Patient)"}
              />
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
