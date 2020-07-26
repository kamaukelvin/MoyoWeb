import React from "react";
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div>Email : naekuj@students.uonbi.ac.ke</div>
      <div>Tel : +245 718 592 124</div>
      <div>Copyright 2020</div>
      <div className="social-icons">
        <Link to="">
          <i className="fab fa-twitter" />
        </Link>
        <Link to="">
          <i className="fab fa-linkedin-in" />
        </Link>
        <Link to="">
          <i className="fab fa-github" />
        </Link>
        <Link to="">
          <i className="fab fa-instagram" />
        </Link>
      </div>
    </footer>
  );
}
