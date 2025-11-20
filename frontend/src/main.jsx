import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ya no necesitamos crear el router aquí porque App.jsx ya contiene el <BrowserRouter>
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);