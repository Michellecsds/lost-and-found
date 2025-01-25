import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmitFoundItemPage from './pages/SubmitFoundItemPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/submit-found-item" element={<SubmitFoundItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
