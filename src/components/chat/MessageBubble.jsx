import React from 'react';

export const MessageBubble = ({ text, isOwn }) => (
  <div style={{ alignSelf: isOwn ? 'flex-end' : 'flex-start', background: isOwn ? '#2563EB' : '#E2E8F0', color: isOwn ? 'white' : '#0F172A', padding: '8px 14px', borderRadius: '12px', maxWidth: '70%', wordBreak: 'break-word', fontSize: '14px' }}>
    {text}
  </div>
);
