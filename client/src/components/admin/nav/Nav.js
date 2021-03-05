import React, { Redirect } from "react";
import "../admins/admins.css";

import { Link } from "react-router-dom";
function Nav() {
  const logout = () => {
      localStorage.removeItem("admToken");
    <Redirect to="/admin"></Redirect>;
  };
  return (
    <div>
      <nav className="main-menu">
        <ul>
          <li>
            <Link to="/admin/admins">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">Admins Management</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/admin/question">
              <i className="fa fa-laptop fa-2x"></i>
              <span className="nav-text">Quesetions Management</span>
            </Link>
          </li>
          <li className="has-subnav">
            <Link to="/admin/validate">
              <i className="fa fa-laptop fa-2x"></i>
              <span className="nav-text">Validation Management</span>
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text" onClick={logout}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
