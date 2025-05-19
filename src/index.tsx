import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';
import App from './App.tsx';

// ▶ Automatically attach JWT (if present) to all axios requests
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(
  document.getElementById('root')!
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);