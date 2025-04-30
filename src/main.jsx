import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element: #root');
  // Consider rendering an error message directly to the body if root is missing.
  document.body.innerHTML = '<h1>Application Error: Root element not found.</h1>';
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error during React rendering:', error);
    // Render a user-friendly error message in the UI.
    rootElement.innerHTML = '<h1>An error occurred while rendering the application.</h1><p>Please try refreshing the page.</p>';
  }
}