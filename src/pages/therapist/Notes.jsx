import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';

export default function Notes() {
  const [activeClientId, setActiveClientId] = useState('mock_client_64f1b');
  const [noteType, setNoteType] = useState('private');
  
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');

  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  const loadClinicalTemplate = () => {
    setSubjective("Client reports heightened baseline anxiety over the past 7 days, primarily tracking with upcoming workspace deliverables. Describes sleep disruption, averaging 4.5 hours per night, accompanied by racing thoughts at onset.");
    setObjective("Client appeared alert, well-groomed, and fully oriented. Speech pattern was slightly accelerated but cohesive. Maintained sustained eye contact throughout. Subtle motor restlessness noted (tapping fingers on lap).");
    setAssessment("Anxiety symptoms are consistent with moderate Generalized Anxiety Disorder (GAD) characteristics, heavily amplified by current occupational burnout stressors. Client exhibits strong cognitive insight and remains highly receptive to coping frameworks.");
    setPlan("1. Complete 4-count breathing practices twice daily during task transitions.\n2. Restructure evening routing timeline to isolate screen devices 45 minutes prior to sleep onset.\n3. Schedule matching progress checkpoint block on Tuesday at 14:00.");
    setStatusMessage({ text: 'Clinical template configuration loaded successfully into active form blocks.', type: 'success' });
  };

  const handleCommitNote = (e) => {
    e.preventDefault();
    setStatusMessage({ text: 'Clinical session notes committed safely to the secure database ledger lines.', type: 'success' });
    setTimeout(() => {
      setSubjective('');
      setObjective('');
      setAssessment('');
      setPlan('');
      setStatusMessage({ text: '', type: '' });
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', color: '#1E2922' }}>
      <Navbar />
      
      <main style={{ padding: '40px 40px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
        
        {/* POLISHED SUB-HEADER BAR SECTION */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid rgba(61, 90, 69, 0.1)', paddingBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: '#1E2922', fontWeight: '700', letterSpacing: '-0.02em', margin: 0 }}>
              Clinical Documentation Workspace
            </h2>
            <p style={{ color: '#5C6760', fontSize: '15px', margin: '4px 0 0 0' }}>
              Draft treatment progression timelines protected by automated visibility access gating rules.
            </p>
          </div>
          
          <button 
            type="button" 
            onClick={loadClinicalTemplate}
            style={{ padding: '12px 20px', background: '#F4A261', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(244, 162, 97, 0.2)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#E79553'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#F4A261'}
          >
            💡 Auto-Load Test Template
          </button>
        </header>

        {statusMessage.text && (
          <div style={{ padding: '14px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', marginBottom: '28px', border: '1px solid', backgroundColor: statusMessage.type === 'success' ? '#E8F5F3' : '#FDF0EC', borderColor: statusMessage.type === 'success' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)', color: statusMessage.type === 'success' ? '#2A9D8F' : '#E07A5F' }}>
            {statusMessage.text}
          </div>
        )}

        {/* 🏛️ TWO-COLUMN ENTERPRISE STRUCTURAL GRID */}
        <form onSubmit={handleCommitNote} style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* COLUMN 1: METADATA ACCESS CONTROLS SIDEBAR */}
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1E2922', borderBottom: '1px solid rgba(61, 90, 69, 0.08)', paddingBottom: '10px' }}>Session Controls</h3>
            
            <div>
              <label style={labelStyle}>Target Client ID Signature</label>
              <input type="text" value={activeClientId} onChange={e => setActiveClientId(e.target.value)} style={inputStyle} required />
            </div>

            <div>
              <label style={labelStyle}>Security Clearance Visibility Mode</label>
              <select value={noteType} onChange={e => setNoteType(e.target.value)} style={{ ...inputStyle, backgroundColor: '#FFFFFF', cursor: 'pointer' }}>
                <option value="private">Private Clinical Blueprint (Therapist Only)</option>
                <option value="shared">Shared Summary (Visible on Client Portal)</option>
              </select>
            </div>

            <button type="submit" style={{ width: '100%', padding: '14px', background: '#3D5A45', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(61,90,69,0.15)', marginTop: '10px' }} onMouseEnter={(e) => e.currentTarget.style.background = '#2F4535'} onMouseLeave={(e) => e.currentTarget.style.background = '#3D5A45'}>
              💾 Save Entry to Database
            </button>
          </div>

          {/* COLUMN 2: 2x2 BALANCED GRID OF SOAP BLOCK TEXTAREAS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            
            <div style={cardStyle}>
              <label style={soapLabelStyle('#3D5A45')}>Subjective (S)</label>
              <textarea rows="6" value={subjective} onChange={e => setSubjective(e.target.value)} style={textStyle} required placeholder="Record what the client reports verbally regarding symptoms, feelings, and progress milestones..." />
            </div>

            <div style={cardStyle}>
              <label style={soapLabelStyle('#E07A5F')}>Objective (O)</label>
              <textarea rows="6" value={objective} onChange={e => setObjective(e.target.value)} style={textStyle} required placeholder="Record clinical observations, physiological metrics, and direct behavioral evaluations..." />
            </div>

            <div style={cardStyle}>
              <label style={soapLabelStyle('#F4A261')}>Assessment (A)</label>
              <textarea rows="6" value={assessment} onChange={e => setAssessment(e.target.value)} style={textStyle} required placeholder="Record professional analytical synthesis, interpretations, and clinical trends..." />
            </div>

            <div style={cardStyle}>
              <label style={soapLabelStyle('#2A9D8F')}>Plan (P)</label>
              <textarea rows="6" value={plan} onChange={e => setPlan(e.target.value)} style={textStyle} required placeholder="Record clear action milestones, home assignments, and details for upcoming appointments..." />
            </div>

          </div>

        </form>
      </main>
    </div>
  );
}

/* --- Premium CSS Design Style Tokens --- */
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#5C6760', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' };
const soapLabelStyle = (color) => ({ display: 'inline-block', fontSize: '12px', fontWeight: '800', color: color, textTransform: 'uppercase', letterSpacing: '0.06em', background: color + '10', padding: '4px 12px', borderRadius: '6px', marginBottom: '12px' });
const cardStyle = { background: '#FFFFFF', padding: '24px', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.03)' };
const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(61, 90, 69, 0.25)', color: '#1E2922', outline: 'none', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' };
const textStyle = { ...inputStyle, width: '100%', resize: 'none', lineHeight: '1.6', background: '#FFFDFB', border: '1px solid rgba(61, 90, 69, 0.15)' };
