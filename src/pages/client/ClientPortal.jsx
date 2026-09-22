import React from 'react';
import { ChatWindow } from '../../components/chat/ChatWindow';

export default function ClientPortal() {
  // Synchronized context elements to lock the patient straight into the active socket node
  const sampleSharedRoomId = "room_session_9942";
  const patientId = "client_ananya_iyer";
  const patientName = "Ananya Iyer (Patient)";

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '28px', color: '#1E2922', marginBottom: '6px' }}>
            AuraHealth Secure Journey Space
          </h1>
          <p style={{ color: '#5C6760', fontSize: '15px' }}>
            Communicate safely with your clinical practitioner via end-to-end encrypted messaging nodes [INDEX].
          </p>
        </header>

        {/* --- MOUNTED PERSISTENT CHAT SCREEN ENGINE --- */}
        <ChatWindow 
          roomId={sampleSharedRoomId} 
          userId={patientId} 
          userName={patientName} 
        />

      </div>
    </div>
  );
}
