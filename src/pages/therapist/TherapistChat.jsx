import React, { useContext } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { ChatWindow } from '../../components/chat/ChatWindow';
import { AuthContext } from '../../context/AuthContext';

export default function TherapistChat() {
  const { user } = useContext(AuthContext);

  const sampleSharedRoomId = "room_session_9942";
  
  // ⚡ DYNAMIC FALLBACK SYSTEM
  // This explicitly strips out 'Amit Sharma' and checks who is actually logged into localStorage
  const therapistId = user?.id || user?._id || "therapist_active_node";
  const therapistName = user?.name ? `${user.name} (Therapist)` : "Dr. Sakthi Uma (Therapist)";

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

        <ChatWindow 
          roomId={sampleSharedRoomId} 
          userId={therapistId} 
          userName={therapistName} 
        />
      </main>
    </div>
  );
}
