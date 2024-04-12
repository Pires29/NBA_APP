import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  // Estado para controlar a exibição do dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Função para alternar a exibição do dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="nav_links">
        <NavLink to="/home" className="first-link">
          Home
        </NavLink>
        <NavLink to="/rostersteam" activeClassName="activeLink">
          Rosters
        </NavLink>

        <div className="dropdown-container">
          <div onClick={toggleDropdown} className="dropdown-trigger">
            Stats
          </div>
          {/* Conteúdo do dropdown condicionalmente renderizado */}
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/stats">Leaders</Link>
              <Link to="/statsplayer">Player</Link>
            </div>
          )}
        </div>

        <NavLink to="/seasons" className="last-link">
          Seasons Hub
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
