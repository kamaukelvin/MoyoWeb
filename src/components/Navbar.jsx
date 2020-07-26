import React from "react";
import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <header className="header">
      <div className="brand">
        <a href="index.html">Moyoweb</a>
      </div>
      <div className="header-links">
        <Link to="/">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </header>
  );
}
