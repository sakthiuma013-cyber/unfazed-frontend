import React from 'react';

export const InvoiceView = ({ paymentRecordId }) => {
  const downloadPDFInvoice = () => {
    const apiURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    window.open(`${apiURL}/payments/invoice-download/${paymentRecordId}`, '_blank');
  };

  return (
    <div style={{ padding: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#166534', fontWeight: '500' }}>Transaction Settlement Executed and Cleared Successfully!</span>
      <button onClick={downloadPDFInvoice} style={{ background: '#166534', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
        Fetch Tax Receipt File (PDF)
      </button>
    </div>
  );
};
