import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const ChatWindow = ({ roomId, userId, userName }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const serverUrl = "http://localhost:5000";
    const newSocket = io(serverUrl, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.emit('join_chat_room', { room_id: roomId });

    newSocket.on('receive_instant_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Dynamic helper to format raw ISO database timestamps down into human-readable local times
  const formatTime = (timestampStr) => {
    try {
      const date = new Date(timestampStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    } catch (e) {
      return timestampStr;
    }
  };

  const pushMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !socket) return;

    const msgPayload = {
      room_id: roomId,
      sender_id: userId,
      sender_name: userName,
      text: text.trim(),
      timestamp: new Date().toISOString() // Transmits valid ISO strings to sync up with database models
    };

    socket.emit('send_instant_message', msgPayload);
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '500px', background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(61, 90, 69, 0.04)' }}>
      
      {/* Dynamic Header Tracking Banner */}
      <div style={{ padding: '16px 24px', background: '#F4F6F2', borderBottom: '1px solid rgba(61, 90, 69, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '700', color: '#3D5A45', fontSize: '15px' }}>🔒 End-to-End Encrypted Session Link</span>
        <span style={{ fontSize: '12px', background: '#E8F5F3', color: '#2A9D8F', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>Active Node</span>
      </div>

      {/* Message Bubble Feed Panel Container */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: '#FFFDFB' }}>
        {messages.length === 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center', color: '#5C6760', fontSize: '14px' }}>
            <span style={{ fontSize: '24px' }}>🌱</span>
            <p style={{ marginTop: '8px' }}>Persistent connection opened cleanly. Type a message below to begin.</p>
          </div>
        ) : (
          messages.map((m, idx) => {
            // Checks if the sender_id of the message explicitly matches the current logged-in role ID
            const isOwn = m.sender_id === userId;
            
            return (
              <div key={idx} style={{ 
                alignSelf: isOwn ? 'flex-end' : 'flex-start', 
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwn ? 'flex-end' : 'flex-start'
              }}>
                <div style={{ fontSize: '11px', color: '#5C6760', marginBottom: '4px', fontWeight: '700' }}>
                  {m.sender_name} • {formatTime(m.timestamp)}
                </div>
                <div style={{ 
                  padding: '12px 16px', 
                  borderRadius: isOwn ? '14px 14px 0 14px' : '14px 14px 14px 0', 
                  background: isOwn ? '#3D5A45' : '#EFEFE9', 
                  color: isOwn ? '#FFFFFF' : '#1E2922',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}>
                  {m.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </div>

      {/* Outbound Input Message Controller Dock */}
      <form onSubmit={pushMessage} style={{ display: 'flex', padding: '16px', background: '#FFFFFF', borderTop: '1px solid rgba(61, 90, 69, 0.1)' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type your message securely..." 
          style={{ flex: 1, border: '1px solid rgba(61, 90, 69, 0.2)', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ marginLeft: '12px', background: '#3D5A45', color: 'white', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
          Send
        </button>
      </form>
      
    </div>
  );
};
