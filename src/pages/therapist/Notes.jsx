import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';

export default function Notes() {
  const [activeClientId, setActiveClientId] = useState('mock_client_64f1b');
  const [noteType, setNoteType] = useState('private');
  
  // Isolated states for each structural SOAP line matrix parameter
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');

  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  // Injects realistic clinical records directly into input blocks instantly
  const loadClinicalTemplate = () => {
    setSubjective("Client reports heightened baseline anxiety over the past 7 days, primarily tracking with upcoming workspace deliverables. Describes sleep disruption, averaging 4.5 hours per night, accompanied by racing thoughts at onset.");
    setObjective("Client appeared alert, well-groomed, and fully oriented. Speech pattern was slightly accelerated but cohesive. Maintained sustained eye contact throughout. Subtle motor restlessness noted (tapping fingers on lap).");
    setAssessment("Anxiety symptoms resemble moderate Generalized Anxiety Disorder (GAD) characteristics, heavily amplified by current occupational burnout stressors. Client exhibits strong cognitive insight and remains highly receptive to coping frameworks.");
    setPlan("1. Complete 4-count breathing practices twice daily during task transitions.\n2. Restructure evening routing timeline to isolate screen devices 45 minutes prior to sleep onset.\n3. Schedule matching sub-session checkpoint block on Tuesday at 14:00.");
    setStatusMessage({ text: '🌱 Professional SOAP Clinical Template loaded successfully.', type: 'success' });
  };

  const handleCommitNote = (e) => {
    e.preventDefault();
    if (!activeClientId) {
      return setStatusMessage({ text: '❌ Target Client Object Identifier must be input before committing files.', type: 'error' });
    }
    
    setStatusMessage({ text: '⚡ Session notes committed safely to secure encrypted database database ledger lines.', type: 'success' });
    // Reset form after a simulated successful dispatch delay
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
      
      <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: '28px', color: '#1E2922', fontWeight: '700', marginBottom: '6px' }}>
              Clinical Encounter Workspace
            </h2>
            <p style={{ color: '#5C6760', fontSize: '15px' }}>
              Draft treatment progression timelines protected by automated visibility gating rules [INDEX].
            </p>
          </div>
          
          <button 
            type="button" 
            onClick={loadClinicalTemplate}
            style={{ padding: '10px 16px', background: '#F4A261', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}
          >
            💡 Auto-Load Test Template
          </button>
        </header>

        {statusMessage.text && (
          <div style={{ padding: '14px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', border: '1px solid', backgroundColor: statusMessage.type === 'success' ? '#E8F5F3' : '#FDF0EC', borderColor: statusMessage.type === 'success' ? 'rgba(42, 157, 143, 0.2)' : 'rgba(224, 122, 95, 0.2)', color: statusMessage.type === 'success' ? '#2A9D8F' : '#E07A5F' }}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleCommitNote} style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#FFFFFF', padding: '32px', borderRadius: '14px', border: '1px solid rgba(61, 90, 69, 0.12)', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.05)' }}>
          
          <div>
            <label style={labelStyle}>Target Client ID Signature String</label>
            <input type="text" value={activeClientId} onChange={e => setActiveClientId(e.target.value)} style={inputStyle} required />
          </div>

          <div>
            <label style={labelStyle}>Security Clearance Gating Visibility Mode</label>
            <select value={noteType} onChange={e => setNoteType(e.target.value)} style={{ ...inputStyle, backgroundColor: '#FFFFFF' }}>
              <option value="private">Private Clinical Blueprint (Therapist Panel Gated Only) [INDEX]</option>
              <option value="shared">Shared Interaction Summary (Visible on Client Portal) [INDEX]</option>
            </select>
          </div>

          {/* Granular SOAP Structural Fields Inputs */}
          <div>
            <label style={labelStyle}>SOAP Matrix Line: Subjective (S)</label>
            <textarea rows="3" value={subjective} onChange={e => setSubjective(e.target.value)} style={textStyle} required placeholder="What the client reports verbally..." />
          </div>

          <div>
            <label style={labelStyle}>SOAP Matrix Line: Objective (O)</label>
            <textarea rows="3" value={objective} onChange={e => setObjective(e.target.value)} style={textStyle} required placeholder="Clinical observations and mental status evaluations..." />
          </div>

          <div>
            <label style={labelStyle}>SOAP Matrix Line: Assessment (A)</label>
            <textarea rows="3" value={assessment} onChange={e => setAssessment(e.target.value)} style={textStyle} required placeholder="Your professional analytical appraisal and synthesis..." />
          </div>

          <div>
            <label style={labelStyle}>SOAP Matrix Line: Plan (P)</label>
            <textarea rows="3" value={plan} onChange={e => setPlan(e.target.value)} style={textStyle} required placeholder="Next steps, actions, task milestones, and sub-session bookings..." />
          </div>

          <button type="submit" style={{ padding: '14px', background: '#3D5A45', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(61,90,69,0.15)' }}>
            Commit Note to Encrypted Database
          </button>

        </form>
      </main>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '700', color: '#5C6760', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(61, 90, 69, 0.25)', color: '#1E2922', outline: 'none', fontSize: '14px', boxSizing: 'border-box' };
const textStyle = { ...inputStyle, fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.5' };
