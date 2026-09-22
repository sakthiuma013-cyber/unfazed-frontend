import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Navbar } from '../../components/common/Navbar';
import { RevenueChart } from '../../components/analytics/RevenueChart';
import { Loader } from '../../components/common/Loader';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get('/analytics/revenue')
      .then(res => setData(res.data))
      .catch(err => setError(err.response?.data?.message || 'Paywall restrictions intercepting operation data.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '30px', maxWidth: '1000px', margin: 'auto' }}>
        <h2>Advanced Analytics Dynamic Monitoring Hub</h2>
        {loading ? <Loader /> : error ? (
          <div style={{ padding: '24px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '6px', marginTop: '20px' }}>
            <strong>Access Intercepted:</strong> {error}
          </div>
        ) : <div style={{ marginTop: '20px' }}><RevenueChart data={data} /></div>}
      </div>
    </div>
  );
}
