import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';

const Nav = props => {
  const handleLogout = () => {
    props.logout();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        PaTutor
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${window.location.pathname === '/' ? 'active' : null}`}>
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className={`nav-item ${window.location.pathname === '/edit-profile' ? 'active' : null}`}>
            <Link className="nav-link" to="/edit-profile">
              Edit profile
            </Link>
          </li>
          <li className="nav-item">
            <span className="nav-link" onClick={handleLogout} style={{cursor: 'pointer'}}>
              Logout
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default connect(null, actions)(Nav);
