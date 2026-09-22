import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ◄--- Visibility tracking state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const processFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/auth/signup', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration engine mapping failure.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#FDFBF7' }}>
      <div style={{ padding: '48px 40px', maxWidth: '420px', width: '100%', boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.16)', borderRadius: '14px', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', padding: '12px', background: '#EFEFE9', borderRadius: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🌱</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', letterSpacing: '-0.025em', color: '#1E2922' }}>Join AuraHealth</h2>
          <p style={{ margin: '8px 0 0 0', color: '#5C6760', fontSize: '14px' }}>Register your digital therapeutic workspace</p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#F87171', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={processFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Full Professional Name</label>
            <input type="text" placeholder="Dr. Sarah Jenkins" value={name} onChange={e => setName(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Email Address</label>
            <input type="email" placeholder="sarah@aurahealth.com" value={email} onChange={e => setEmail(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secure Passkey</label>
              {/* Clickable text toggle button link */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: '#3D5A45', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
            {/* Dynamically swaps type between "text" and "password" */}
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <button type="submit" style={{ padding: '14px', background: '#10B981', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', marginTop: '8px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
            Register Matrix Credentials
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', margin: '24px 0 0 0', fontSize: '14px', color: '#5C6760' }}>
          Already have an account? <Link to="/login" style={{ color: '#3D5A45', textDecoration: 'none', fontWeight: '700' }}>Execute Access</Link>
        </p>
      </div>
    </div>
  );
}

const inputOverrideStyle = { width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.25)', color: '#1E2922', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
