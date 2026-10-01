import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function Login() {
  const [role, setRole] = useState('therapist'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const processFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const apiEndpoint = role === 'therapist' ? '/auth/login' : '/auth/client/login';
    
    try {
      const res = await axiosInstance.post(apiEndpoint, { email, password });
      
      if (role === 'therapist') {
        loginUser(res.data.therapist, res.data.token);
        navigate('/dashboard');
      } else {
        loginUser(res.data.client, res.data.token);
        navigate(`/p/${res.data.client?.slug || 'amit-sharma'}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Identity verification network failure.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#FDFBF7' }}>
      <div style={{ padding: '44px 40px', maxWidth: '420px', width: '100%', boxSizing: 'border-box', background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.08)' }}>
        
        <div style={{ display: 'flex', background: '#F4F6F2', padding: '4px', borderRadius: '10px', marginBottom: '32px' }}>
          <button type="button" onClick={() => { setRole('therapist'); setError(''); }} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', transition: 'all 0.2s', background: role === 'therapist' ? '#FFFFFF' : 'transparent', color: role === 'therapist' ? '#3D5A45' : '#5C6760', boxShadow: role === 'therapist' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
            🩺 Therapist
          </button>
          <button type="button" onClick={() => { setRole('patient'); setError(''); }} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', transition: 'all 0.2s', background: role === 'patient' ? '#FFFFFF' : 'transparent', color: role === 'patient' ? '#3D5A45' : '#5C6760', boxShadow: role === 'patient' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
            👤 Patient
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', letterSpacing: '-0.025em', color: '#1E2922' }}>
            {role === 'therapist' ? 'AuraHealth Workspace' : 'Patient Portal Desk'}
          </h2>
          <p style={{ margin: '6px 0 0 0', color: '#5C6760', fontSize: '14px' }}>
            {role === 'therapist' ? 'Access your clinical practitioner control panel' : 'Access your personalized wellness profile & billings'}
          </p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', color: '#F87171', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={processFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
              {role === 'therapist' ? 'Practitioner Email' : 'Patient Email Address'}
            </label>
            <input type="email" placeholder={role === 'therapist' ? "name@aurahealth.com" : "yourname@domain.com"} value={email} onChange={e => setEmail(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#3D5A45', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {role === 'therapist' ? 'Password Key' : 'Secure Access Key'}
              </label>
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: '#3D5A45', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                {showPassword ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
            <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={inputOverrideStyle} required />
          </div>

          <button type="submit" style={{ padding: '14px', background: role === 'therapist' ? '#2563EB' : '#10B981', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', marginTop: '6px', boxShadow: role === 'therapist' ? '0 4px 12px rgba(37, 99, 235, 0.2)' : '0 4px 12px rgba(16, 185, 129, 0.2)' }}>
            {role === 'therapist' ? 'Authenticate Session' : 'Enter Secure Portal'}
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
