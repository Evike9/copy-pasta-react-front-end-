import React from "react";
import { NavLink } from "react-router-dom";

const NavMain = () => {
  return (
    <nav className="NavMain">
      <NavLink exact to="/">
        {/* <h1 className="logo">COPY-PASTA </h1> */}
      </NavLink>
    </nav>
  );
};

export default NavMain;