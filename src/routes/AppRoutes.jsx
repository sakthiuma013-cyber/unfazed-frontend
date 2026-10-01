import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Import all modular page components cleanly
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/therapist/Dashboard';
import Clients from '../pages/therapist/Clients';
import Schedule from '../pages/therapist/Schedule';
import Notes from '../pages/therapist/Notes';
import Analytics from '../pages/therapist/Analytics';
import BookingPage from '../pages/client/BookingPage';
import ClientPortal from '../pages/client/ClientPortal';
import Payment from '../pages/client/Payment';

// 🌿 AURAHEALTH CENTRAL APPLICATION HUB ENTRY GATEWAY POPUP SELECTOR
const CentralAppGateway = () => {
  const { user } = useContext(AuthContext);

  // Dynamic selector link maps. If logged in, links directly to the personalized URL handle
  const structuralSlugLink = user?.slug ? `/p/${user.slug}` : '/p/portal-home';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#FDFBF7' }}>
      <div style={{ width: '100%', maxWidth: '640px', textAlign: 'center' }}>
        
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1E2922', letterSpacing: '-0.03em', margin: '0 0 8px 0', fontFamily: 'var(--font-display, serif)' }}>
            ✨ AuraHealth Ecosystem
          </h1>
          <p style={{ color: '#5C6760', fontSize: '16px', fontWeight: '500' }}>
            Select an interaction interface module node to launch platform pathways.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          {/* CARD 1: THERAPIST CONSOLE CONTROL DESK */}
          <Link to="/login" style={gatewayCardStyle}>
            <div style={iconBadgeStyle('#2563EB')}>🩺</div>
            <h3 style={cardTitleStyle}>Therapist Suite</h3>
            <p style={cardDescStyle}>Access your professional practice control panel to update calendar availability parameters, manage client profiles, and securely draft clinical session documentation.</p>
          </Link>

          {/* CARD 2: REFACTORED PATIENT HUB LINK DESK */}
          <Link to={structuralSlugLink} style={gatewayCardStyle}>
            <div style={iconBadgeStyle('#10B981')}>👤</div>
            <h3 style={cardTitleStyle}>Patient Portal Desk</h3>
            <p style={cardDescStyle}>Explore practitioner bio credentials, review open appointment openings to schedule sessions, and securely manage your plan packages and invoice billings.</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

// Authorization Route Security Gating Middleware Interceptor
const ProtectionGate = ({ children }) => {
  const { token } = useContext(AuthContext);
  // Re-routes non-authenticated sessions cleanly to the dynamic login card
  return token ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => (
  <Routes>
    {/* Base Core Root Landing Page mounts the Hub Gate Selector */}
    <Route path="/" element={<CentralAppGateway />} />
    
    {/* Public Identity Verification Checkpoints */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* 🩺 PROTECTED SPECIALIST ENTERPRISE CONTROL DASHBOARDS MAPS */}
    <Route path="/dashboard" element={<ProtectionGate><Dashboard /></ProtectionGate>} />
    <Route path="/clients" element={<ProtectionGate><Clients /></ProtectionGate>} />
    <Route path="/schedule" element={<ProtectionGate><Schedule /></ProtectionGate>} />
    <Route path="/notes" element={<ProtectionGate><Notes /></ProtectionGate>} />
    <Route path="/analytics" element={<ProtectionGate><Analytics /></ProtectionGate>} />

    {/* Public Client Journey Touchpoints */}
    <Route path="/p/:slug" element={<BookingPage />} />
    <Route path="/portal" element={<ClientPortal />} />
    <Route path="/pay" element={<Payment />} />

    {/* Dynamic Redirection Catch-all Fallback Redirection */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

/* --- High-End Gateway Visual Layout Styles Objects --- */
const gatewayCardStyle = {
  display: 'block', padding: '32px 24px', textDecoration: 'none', background: '#FFFFFF',
  border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px',
  boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.04)', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', textAlign: 'left',
  boxSizing: 'border-box'
};
const iconBadgeStyle = (color) => ({ width: '46px', height: '46px', background: color + '10', border: `1px solid ${color}30`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '16px' });
const cardTitleStyle = { margin: '0 0 6px 0', fontSize: '18px', fontWeight: '700', color: '#1E2922' };
const cardDescStyle = { margin: 0, fontSize: '13px', color: '#5C6760', lineHeight: '1.5' };
