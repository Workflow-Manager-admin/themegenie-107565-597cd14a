import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar() {
  /** Reusable site navigation shown on all pages. */
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="navbar__brand">Theme Creator</span>
      </div>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" className="navbar__link" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/codelab" className="navbar__link">
            CodeLab
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="navbar__link">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
