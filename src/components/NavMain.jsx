import React from "react";
import { NavLink } from "react-router-dom";
import withUser from "../auth/withUser";
import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  const handleLogout = () => {
    context.removeUser();
  };

  return (
    <nav className="NavMain">
      <NavLink exact to="/">
      <img src="/logo.png" className="logo" alt="logo"/>

      </NavLink>
      <ul>
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/add-snippet" className="nav-log">
                Add Snippet
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                {context.user && context.user.userName}
              </NavLink>
            </li>
            <li>
              <NavLink exact to = "/" className="nav-log"
              onClick={handleLogout}>Logout</NavLink>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin"className="nav-log">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="nav-log">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);