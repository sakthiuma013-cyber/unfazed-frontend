import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

export const CheckoutForm = ({ amount, clientId, therapistId, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckoutInit = async () => {
    setLoading(true);
    try {
      // Shifting network collection parameters down order pathways
      const orderRes = await axiosInstance.post('/payments/order', { 
        amount: amount * 100, // Converts rupees to absolute paisa subunits
        client_id: clientId, 
        therapist_id: therapistId 
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
        console.log('🚀 [Sandbox Simulation Mode]: Auto-triggering successful transaction callbacks.');
        onSuccess({
          razorpay_order_id: orderRes.data.order_id,
          razorpay_payment_id: `pay_sim_${Math.random().toString(36).slice(-6).toUpperCase()}`,
          razorpay_signature: "simulated_verification_hash"
        });
        setLoading(false);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const failedMessage = err.response?.data?.message || err.message;
      if (onError) {
        onError(failedMessage);
      } else {
        console.error(failedMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px 0', display: 'block', visibility: 'visible' }}>
      {/* FORCED EXPLICIT HIGH CONTRAST DARK TEXT FOR VISIBILITY */}
      <p style={{ margin: '0 0 24px 0', fontSize: '16px', color: '#1E2922', display: 'block' }}>
        Total Processing Outstanding Settlement Sum Value:{' '}
        <strong style={{ fontSize: '22px', color: '#3D5A45', display: 'inline' }}>
          ₹{amount}
        </strong>
      </p>
      
      <button 
        onClick={handleCheckoutInit} 
        disabled={loading}
        style={{ 
          width: '100%',
          background: '#3D5A45', 
          color: '#FFFFFF', 
          border: 'none', 
          padding: '14px 24px', 
          borderRadius: '10px', 
          fontSize: '15px', 
          fontWeight: '700', 
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(61, 90, 69, 0.15)',
          transition: 'all 0.2s',
          display: 'block',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Initializing Order...' : 'Execute Secure Checkout Payout'}
      </button>
    </div>
  );
};
