import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ◄--- Visibility tracking state
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const processFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      loginUser(res.data.therapist, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Identity verification network failure.');
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#FDFBF7' }}>
      <div style={{ padding: '48px 40px', maxWidth: '420px', width: '100%', boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>✨</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '800', letterSpacing: '-0.025em', color: '#1E2922' }}>AuraHealth Workspace</h2>
          <p style={{ margin: '8px 0 0 0', color: '#5C6760', fontSize: '14px' }}>Access your clinical practitioner control panel</p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#F87171', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={processFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Practitioner Email</label>
            <input type="email" placeholder="name@aurahealth.com" value={email} onChange={e => setEmail(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password Key</label>
              {/* Clickable text toggle button link */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: '#3D5A45', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
            {/* Dynamically swaps type between "text" and "password" */}
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <button type="submit" style={{ padding: '14px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', marginTop: '8px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}>
            Authenticate Session
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', margin: '24px 0 0 0', fontSize: '14px', color: '#5C6760' }}>
          New to the ecosystem? <Link to="/register" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: '700' }}>Create Profile</Link>
        </p>
      </div>
    </div>
  );
}

const inputOverrideStyle = { width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.25)', color: '#1E2922', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' };
