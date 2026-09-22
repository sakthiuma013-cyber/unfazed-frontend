import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { CheckoutForm } from '../../components/payments/CheckoutForm';
import { InvoiceView } from '../../components/payments/InvoiceView';

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeTab, setActiveTab] = useState('about'); // Tabs: about, book, billing
  const [settled, setSettled] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // Mock schedule interval blocks computed directly for the patient selection grid
  const mockScheduleSlots = [
    { id: 1, day: 'Monday', time: '09:00 - 09:45' },
    { id: 2, day: 'Wednesday', time: '11:00 - 11:45' },
    { id: 3, day: 'Friday', time: '15:00 - 15:45' }
  ];

  const handleSlotConfirm = (slot) => {
    setSelectedSlot(slot.id);
    setStatusMessage({
      text: `✅ Time slot verified and locked: ${slot.day} (${slot.time}). Proceed to billing tab if package settlement is required.`,
      type: 'success'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', color: '#1E2922' }}>
      <Navbar />
      
      {/* 🌿 WARM BOTANICAL PROFILE HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #3D5A45 0%, #2F4535 100%)', color: 'white', padding: '48px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: '700' }}>Dr. Amit Sharma</h1>
        <p style={{ color: '#D8E2DC', fontSize: '16px', margin: '0 0 16px 0' }}>Consulting Clinical Psychologist & Behavioral Specialist</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {['Anxiety Management', 'CBT Specialist', 'Occupational Burnout'].map((tag, i) => (
            <span key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{tag}</span>
          ))}
        </div>
      </div>

      <main style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* --- Dynamic Status Feedback Message Banner --- */}
        {statusMessage.text && (
          <div style={{ padding: '14px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', border: '1px solid', backgroundColor: statusMessage.type === 'success' ? '#E8F5F3' : '#FDF0EC', borderColor: statusMessage.type === 'success' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)', color: statusMessage.type === 'success' ? '#2A9D8F' : '#E07A5F' }}>
            {statusMessage.text}
          </div>
        )}

        {/* 📑 PATIENT ENGAGEMENT SECTION MENU NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(61, 90, 69, 0.12)', paddingBottom: '12px', marginBottom: '32px' }}>
          {['about', 'book', 'billing'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#3D5A45' : 'transparent', color: activeTab === tab ? '#FFFFFF' : '#5C6760', border: activeTab === tab ? 'none' : '1px solid rgba(61,90,69,0.2)', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }}>
              {tab === 'about' ? '📋 About & Bio' : tab === 'book' ? '📅 Schedule Sessions' : '💳 Package Billing'}
            </button>
          ))}
        </div>

        {/* 🔄 TAB DISPLAY DECISION MATRIX */}
        <div className="natural-card" style={{ background: '#FFFFFF', padding: '32px', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.03)' }}>
          
          {/* TAB A: DETAILED BIOGRAPHY OVERVIEW */}
          {activeTab === 'about' && (
            <div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#1E2922' }}>Professional Background Overview</h3>
              <p style={{ color: '#5C6760', lineHeight: '1.6', fontSize: '15px', margin: '0 0 16px 0' }}>
                Dr. Amit Sharma holds over 12 years of specialized mental health consulting experience [INDEX]. His clinical focus concentrates on supporting practitioners experiencing severe occupational burnout, corporate anxiety matrices, and lifestyle transition roadblocks [INDEX].
              </p>
              <div style={{ background: '#F4F6F2', padding: '16px', borderRadius: '8px', fontSize: '14px', color: '#3D5A45' }}>
                <strong>Languages Fluent:</strong> English, Hindi, Tamil
              </div>
            </div>
          )}

          {/* TAB B: INTERACTIVE TIME-SLOT CALENDAR ENGAGEMENT */}
          {activeTab === 'book' && (
            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1E2922' }}>Select Available Booking Units</h3>
              <p style={{ color: '#5C6760', fontSize: '14px', marginBottom: '20px' }}>Choose an active consultation slot block below to register your placement instantly on the clinician's calendar ledger [INDEX].</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
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

          {/* TAB C: SECURE CHECKOUT PROCESSING PILLARS */}
          {activeTab === 'billing' && (
            <div>
              {settled ? (
                <InvoiceView paymentRecordId={paymentId} />
              ) : (
                <CheckoutForm 
                  amount={1500} 
                  clientId="66f1bc20a3bc994205de1142" 
                  therapistId="66f1bc09a3bc765103ad9871" 
                  onSuccess={(res) => {
                    setPaymentId(res.razorpay_payment_id || 'pay_sim_9988');
                    setSettled(true);
                    setStatusMessage({ text: '⚡ Transaction captured successfully. Feel free to print your tax invoice structural file.', type: 'success' });
                  }}
                  onError={(err) => setStatusMessage({ text: `❌ Processing Halt: ${err}`, type: 'error' })}
                />
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
