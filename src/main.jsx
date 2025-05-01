import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

function RootComponent() {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Failed to find the root element: #root');
    return (
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
        <h1>Application Error</h1>
        <p>Root element not found. Please ensure a div with id "root" exists in your HTML.</p>
      </div>
    );
  }

  try {
    const root = ReactDOM.createRoot(rootElement);

    return (
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error during React rendering:', error);
    return (
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
        <h1>Application Error</h1>
        <p>An error occurred while rendering the application. Please try refreshing the page.</p>
        <p>If the problem persists, contact support.</p>
        <details>
          <summary>Error Details</summary>
          <pre>{error.message}</pre>
        </details>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);