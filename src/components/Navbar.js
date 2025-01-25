import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Lost & Found</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/report-lost-item">Report Lost Item</Link></li>
        <li><Link to="/found-items">Found Items</Link></li>
        <li><Link to="/my-items">My Items</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
