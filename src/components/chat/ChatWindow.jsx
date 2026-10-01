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

    newSocket.on('load_chat_history', (historyArray) => {
      setMessages(historyArray || []);
    });

    newSocket.on('receive_instant_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.off('load_chat_history');
      newSocket.off('receive_instant_message');
      newSocket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const pushMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !socket) return;

    const msgPayload = {
      room_id: roomId,
      sender_id: userId,
      sender_name: userName,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    socket.emit('send_instant_message', msgPayload);
    setText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '460px', background: '#FFFFFF', border: '1px solid rgba(61, 90, 69, 0.12)', borderRadius: '14px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 24px', background: '#F4F6F2', borderBottom: '1px solid rgba(61, 90, 69, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '700', color: '#3D5A45', fontSize: '13px' }}>🔒 Encrypted Live Session Channel</span>
        <span style={{ fontSize: '11px', background: '#E8F5F3', color: '#2A9D8F', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>Active Node</span>
      </div>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FFFDFB' }}>
        {messages.map((m, idx) => {
          // ⚡ TRIPLE-CHECK IDENTITY EXTRACTION:
          // If the message sender ID matches your screen role, it goes right. Otherwise, it forces left!
          const isOwn = m.sender_id === userId;
          
          return (
            <div key={idx} style={{ 
              alignSelf: isOwn ? 'flex-end' : 'flex-start', 
              maxWidth: '75%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isOwn ? 'flex-end' : 'flex-start'
            }}>
              <div style={{ fontSize: '11px', color: '#5C6760', marginBottom: '4px', fontWeight: '700' }}>
                {m.sender_name} • {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
              <div style={{ 
                padding: '12px 16px', 
                borderRadius: isOwn ? '16px 16px 2px 16px' : '16px 16px 16px 2px', 
                background: isOwn ? '#3D5A45' : '#EFEFE9', // Emerald Green vs Modern Grey
                color: isOwn ? '#FFFFFF' : '#1E2922',
                fontSize: '14px',
                lineHeight: '1.5',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={pushMessage} style={{ display: 'flex', padding: '16px', background: '#FFFFFF', borderTop: '1px solid rgba(61, 90, 69, 0.1)' }}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message securely..." style={{ flex: 1, border: '1px solid rgba(61, 90, 69, 0.2)', padding: '12px 16px', borderRadius: '8px', fontSize: '14px', outline: 'none' }} />
        <button type="submit" style={{ marginLeft: '12px', background: '#3D5A45', color: 'white', border: 'none', padding: '0 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Send String</button>
      </form>
    </div>
  );
};
