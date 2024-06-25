import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/image1';
import TicketSupport from './pages/screen1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/p1" element={<TicketSupport />} />
      </Routes>
    </Router>
  );
}

export default App;
    