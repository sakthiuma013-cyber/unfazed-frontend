import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

/* ⚡ Destructure the fields using explicit underscores: client_id and therapist_id */
export const CheckoutForm = ({ amount, client_id, therapist_id, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckoutInit = async () => {
    setLoading(true);
    try {
      const orderRes = await axiosInstance.post('/payments/order', { 
        amount: amount * 100, // Converts rupees to paisa subunits
        client_id: client_id, // Safely routes matching keys to backend controller arrays
        therapist_id: therapist_id 
      });
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "AuraHealth Checkout",
        description: "Professional Clinical Consulting Services Block",
        order_id: orderRes.data.order_id,
        handler: function (response) {
          onSuccess(response);
        },
        theme: { color: "#3D5A45" }
      };

      if (orderRes.data.is_simulation) {
        onSuccess({
          razorpay_order_id: orderRes.data.order_id,
          razorpay_payment_id: `pay_sim_${Math.random().toString(36).slice(-6).toUpperCase()}`,
          razorpay_signature: "simulated_verification_hash"
        });
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const failedMessage = err.response?.data?.message || err.message;
      if (onError) onError(failedMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px 0', display: 'block' }}>
      <p style={{ margin: '0 0 24px 0', fontSize: '16px', color: '#1E2922' }}>
        Total Processing Outstanding Settlement Sum Value:{' '}
        <strong style={{ fontSize: '22px', color: '#3D5A45' }}>₹{amount}</strong>
      </p>
      
      <button 
        onClick={handleCheckoutInit} 
        disabled={loading}
        style={{ 
          width: '100%', background: '#3D5A45', color: '#FFFFFF', border: 'none', padding: '14px 24px', 
          borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(61, 90, 69, 0.15)', transition: 'all 0.2s', display: 'block'
        }}
      >
        {loading ? 'Initializing Order...' : 'Execute Secure Checkout Payout'}
      </button>
    </div>
  );
};
