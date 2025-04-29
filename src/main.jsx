import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find the root element: #root');
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
    // Optionally render an error message to the user in the UI.
    // For example:
    // rootElement.innerHTML = '<h1>An error occurred while rendering the application.</h1>';
  }
}