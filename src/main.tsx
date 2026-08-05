import { useState, useEffect, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function ErrorBoundary({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Captured WebView Error:', event.error);
      if (event?.message) {
        setErrorMsg(event.message);
      }
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '24px', color: '#fff', backgroundColor: '#030712', minHeight: '100vh', fontFamily: 'sans-serif', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#f87171' }}>⚠️ App Load Warning</h2>
        <p style={{ fontSize: '14px', opacity: 0.8, maxWidth: '400px', marginBottom: '20px' }}>
          {errorMsg || 'An error occurred while rendering.'}
        </p>
        <button
          onClick={() => {
            setHasError(false);
            window.location.reload();
          }}
          style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Reload App
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
