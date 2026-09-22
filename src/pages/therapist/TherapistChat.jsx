import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { ChatWindow } from '../../components/chat/ChatWindow';

export default function TherapistChat() {
  // CRITICAL SYNC FIX: Matches the exact channel variables used in ClientPortal.jsx
  const sampleSharedRoomId = "room_session_9942";
  const therapistId = "therapist_amit_sharma";
  const therapistName = "Dr. Amit Sharma (Therapist)";

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7' }}>
      <Navbar />
      <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', boxSizing: 'border-box' }}>
        
        <header style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: '#1E2922', fontWeight: '700', marginBottom: '6px' }}>
            Practitioner Communication Terminal
          </h2>
          <p style={{ color: '#5C6760', fontSize: '15px' }}>
            Live therapeutic link synchronized with the active patient workspace portal.
          </p>
        </header>

        {/* MOUNTED SOCKET CONSOLE LINK */}
        <ChatWindow 
          roomId={sampleSharedRoomId} 
          userId={therapistId} 
          userName={therapistName} 
        />

      </main>
    </div>
  );
}
