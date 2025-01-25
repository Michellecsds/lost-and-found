import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home';
import Find from './components/Find';
import Report from './components/Report';
import History from './components/History';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/find" element={<Find />} />
          <Route path="/history" element={<History />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



