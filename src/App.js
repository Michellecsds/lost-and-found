import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home';
import Find from './components/Find';
import Report from './components/Report';
import Login from './components/Login';
import History from './components/History';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import './App.css';
import FloatingChat from "./components/FloatingChat";
import ChatBox from "./components/Chatbox";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/find" element={<Find />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <FloatingChat onClick={() => setIsChatOpen(!isChatOpen)} />
        {isChatOpen && <ChatBox />}
      </div>
    </Router>
  );
}

export default App;



