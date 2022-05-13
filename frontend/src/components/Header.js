import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [activeMenu, setActiveMenu] = useState("");

  const handleActiveMenu = () => {
    let currentPath = window.location.pathname;
    if (currentPath === "/about") {
      setActiveMenu("about");
    } else if (currentPath === "/") {
      setActiveMenu("home");
    } else {
      setActiveMenu("");
    }
  };

  useEffect(() => {
    handleActiveMenu();
  }, []);

  return (
    <div className="header">
      <div className="header__left-part">
        <Link to="/">
          <div className="header__logo">BLOG</div>
        </Link>
      </div>
      <div className="header__center-part">
        <Link
          to="/"
          //  onClick={(e) => setActiveMenu("home")}
        >
          <div className="header__center-part__option">Home</div>
          <span
            className={`header__center-part__active-bar ${
              activeMenu === "home" ? "active" : ""
            }`}
          ></span>
        </Link>

        <Link
          to="/about"
          // onClick={(e) => setActiveMenu("about")}
        >
          <div className="header__center-part__option">About</div>
          <span
            className={`header__center-part__active-bar ${
              activeMenu === "about" ? "active" : ""
            }`}
          ></span>
        </Link>
      </div>
      <div className="header__right-part">Search</div>
    </div>
  );
}

export default Header;
