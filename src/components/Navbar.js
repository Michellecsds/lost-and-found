import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="container-fluid">
    <nav className="navbar">
      <h1 class = "title">Lost & Found at Uni</h1>
      <ul className="nav-links">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Report" activeClassName="active">Report Lost Item</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Find" activeClassName="active">Found Items</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/History" activeClassName="active">History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Login" activeClassName="active">Log-in</NavLink>
            </li>
          </ul>
{/*         <li><Link to="/">Home</Link></li>
        <li><Link to="/Report">Report Lost Item</Link></li>
        <li><Link to="/Find">Found Items</Link></li>
        <li><Link to="/History">History</Link></li> */}
    </nav>
    </div>
  );
}

export default Navbar;