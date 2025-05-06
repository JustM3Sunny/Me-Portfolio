import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

function RootComponent() {
  const [error, setError] = useState(null);
  const [isRootReady, setIsRootReady] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
      const errorMessage = 'Failed to find the root element: #root';
      console.error(errorMessage);
      setError(new Error(errorMessage));
      return; // Exit the useEffect if root is not found
    }

    setIsRootReady(true);

  }, []);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
        <h1>Application Error</h1>
        <p>Root element not found. Please ensure a div with id "root" exists in your HTML.</p>
        <details>
          <summary>Error Details</summary>
          <pre>{error.message}</pre>
        </details>
      </div>
    );
  }

  if (!isRootReady) {
    return <div>Loading...</div>; // Or a more appropriate loading indicator
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

const renderApp = () => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Failed to find the root element: #root');
    // Render an error message directly to the document body if the root element is missing.
    const errorDiv = document.createElement('div');
    errorDiv.style.textAlign = 'center';
    errorDiv.style.padding = '20px';
    errorDiv.style.backgroundColor = '#f8d7da';
    errorDiv.style.color = '#721c24';
    errorDiv.innerHTML = `
      <h1>Application Error</h1>
      <p>Root element not found. Please ensure a div with id "root" exists in your HTML.</p>
    `;
    document.body.appendChild(errorDiv);
    return; // Prevent React from trying to render if root is missing
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(<RootComponent />);
};

// Call renderApp after the DOM is fully loaded.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}