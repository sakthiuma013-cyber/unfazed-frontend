import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ⚡ THE SYSTEM KEY: This injects your clean unified routing framework seamlessly */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
