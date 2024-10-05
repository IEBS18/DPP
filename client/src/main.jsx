// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home';
import Visualize from '../src/components/Visualize';
import Predict from '../src/components/Predict';
import Authenticate from '../src/pages/Authenticate';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visualize" element={<Visualize />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/auth" element={<Authenticate />} />
      </Routes>
    </Router>
  </StrictMode>
);

