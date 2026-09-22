import React, { useState } from 'react';
import { CheckoutForm } from '../../components/payments/CheckoutForm';
import { InvoiceView } from '../../components/payments/InvoiceView';

export default function Payment() {
  const [settled, setSettled] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // CRITICAL SYNC FIX: We use valid, synchronized 24-character hex strings so Mongoose ObjectIDs compile without crashing!
  const validMockClientId = "66f1bc20a3bc994205de1142";   // Matches Ananya Iyer's mock context ID node
  const validMockTherapistId = "66f1bc09a3bc765103ad9871"; // Matches your registered Therapist ID node

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', padding: '60px 20px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#1E2922', marginBottom: '6px' }}>
            AuraHealth Checkout Desk
          </h2>
          <p style={{ color: '#5C6760', fontSize: '15px' }}>
            Execute secure transaction settlements linked directly to your clinical portal workspace.
          </p>
        </header>

        {/* --- Dynamic Status Banner to Replace the Native Browser Popup --- */}
        {statusMessage.text && (
          <div style={{
            padding: '16px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            border: '1px solid',
            backgroundColor: statusMessage.type === 'success' ? '#E8F5F3' : '#FDF0EC',
            borderColor: statusMessage.type === 'success' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)',
            color: statusMessage.type === 'success' ? '#2A9D8F' : '#E07A5F',
            animation: 'fadeIn 0.25s ease-out'
          }}>
            {statusMessage.text}
          </div>
        )}

        <div className="natural-card" style={{ background: '#FFFFFF', padding: '32px', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.05)' }}>
          {settled ? (
            <InvoiceView paymentRecordId={paymentId} />
          ) : (
            <CheckoutForm 
              amount={1500} 
              clientId={validMockClientId} 
              therapistId={validMockTherapistId} 
              onSuccess={(res) => {
                setPaymentId(res.razorpay_payment_id || 'mock_pay_id');
                setSettled(true);
                setStatusMessage({ text: '⚡ Payout captured and logged successfully.', type: 'success' });
              }}
              onError={(errorMessage) => {
                // Catches the callback error event to display it inside the custom banner component instead of a popup box!
                setStatusMessage({ text: `❌ Settlement Initialization Halted: ${errorMessage}`, type: 'error' });
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
}
