import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="container-fluid">
      <nav className="navbar">
        <h1>Lost & Found</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/report">Report Lost Item</Link></li>
          <li><Link to="/find">Found Items</Link></li>
          <li><Link to="/my-items">My Items</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
