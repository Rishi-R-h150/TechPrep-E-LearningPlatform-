import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/dsa-portal" className={({ isActive }) => isActive ? 'active-link' : ''}>Gym</NavLink>
        <NavLink to="/core-skills" className={({ isActive }) => isActive ? 'active-link' : ''}>Core Skills</NavLink>
        
        
        <div className="dropdown">
          <span className={`nav-link ${isOpen ? 'active-dropdown' : ''}`} onClick={toggleDropdown}>Compete</span>
          {isOpen && (
            <div className="dropdown-content">
              <NavLink to="/contest/create" className={({ isActive }) => isActive ? 'active-link' : ''}>Create Contest</NavLink>
              <NavLink to="/contest/display" className={({ isActive }) => isActive ? 'active-link' : ''}>All Contests</NavLink>
              <NavLink to="/contest/joinedContest" className={({ isActive }) => isActive ? 'active-link' : ''}>Joined Contests</NavLink>
            </div>
          )}
        </div>
      </div>
      
      <div className="navbar-right">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Sign Out</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
