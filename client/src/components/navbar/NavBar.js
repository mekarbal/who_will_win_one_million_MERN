import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
function NavBar({ check, setCheck = check }) {


  let menu;
  const logout = () => {
    localStorage.removeItem("parToken");
    setCheck("");
  };

  if (check != null) {
    menu = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            logout
          </Link>
        </li>
      </>
    );
  } else {
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">Login</Link>
      </li>
      <li>
        <Link to="/register">register</Link>
      </li>

      <li>
        <Link to="/participants">Participants</Link>
      </li>
    </>;
  }

  return (
    <div>
      <div className="allMenu">
        <ul className="menu-bar">{menu}</ul>
      </div>
    </div>
  );
}

export default NavBar;
