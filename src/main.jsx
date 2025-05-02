import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

function RootComponent() {
  const [error, setError] = useState(null);
  const [rootElement, setRootElement] = useState(null);

  useEffect(() => {
    const element = document.getElementById('root');
    if (!element) {
      setError(new Error('Failed to find the root element: #root'));
    } else {
      setRootElement(element);
    }
  }, []);

  if (error) {
    console.error(error);
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

  if (!rootElement) {
    return <div>Loading...</div>; // Or a more appropriate loading indicator
  }

  try {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (renderError) {
    console.error('Error during React rendering:', renderError);
    return (
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
        <h1>Application Error</h1>
        <p>An error occurred while rendering the application. Please try refreshing the page.</p>
        <p>If the problem persists, contact support.</p>
        <details>
          <summary>Error Details</summary>
          <pre>{renderError.message}</pre>
        </details>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Failed to find the root element: #root');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RootComponent />);
}