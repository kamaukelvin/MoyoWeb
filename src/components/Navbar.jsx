import React from "react";
import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <header className="header">
      <div className="brand">
      <Link className="text-dark" to="/dashboard">Moyoweb</Link>
      </div>
      <div className="header-links">
        <Link to="/">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    </header>
  );
}
