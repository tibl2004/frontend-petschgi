import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.scss';
import logo from "./logo.png";
import {jwtDecode} from 'jwt-decode';

// FontAwesome Icons
import {
  FaBars,
  FaHome,
  FaUserFriends,
  FaServer,
  FaLink,
  FaUsers,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaTools
} from 'react-icons/fa';

function Navbar() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          setUserType(decodedToken.userType);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Ungültiger Token:", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserType("");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className={`navbar ${burgerMenuActive ? "burger-menu-active" : ""}`}>
      <div className="navbar-container">
        <div className="logo-box">
          <Link to="/" onClick={() => setBurgerMenuActive(false)}>
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>

        <div className="menu-icon" onClick={() => setBurgerMenuActive(!burgerMenuActive)}>
          <FaBars />
        </div>

        <ul className={`nav-items ${burgerMenuActive ? "active" : ""}`}>
          <NavItem to="/" text="Home" icon={<FaHome />} setBurgerMenuActive={setBurgerMenuActive} />
          <NavItem to="/youtubekollegen" text="Youtube Kollegen" icon={<FaUserFriends />} setBurgerMenuActive={setBurgerMenuActive} />
          <NavItem to="/communityserver" text="Community Server" icon={<FaServer />} setBurgerMenuActive={setBurgerMenuActive} />
          <NavItem to="/links" text="Links" icon={<FaLink />} setBurgerMenuActive={setBurgerMenuActive} />

          {isLoggedIn && ['admin', 'mitarbeiter'].includes(userType) && (
            <>
              <NavItem to="/kunden" text="Kunden" icon={<FaUsers />} setBurgerMenuActive={setBurgerMenuActive} />
              <NavItem to="/profile" text="Profil" icon={<FaUser />} setBurgerMenuActive={setBurgerMenuActive} />
            </>
          )}

          {!isLoggedIn ? (
            <NavItem to="/login" text="Login" icon={<FaSignInAlt />} setBurgerMenuActive={setBurgerMenuActive} />
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ to, text, icon, setBurgerMenuActive }) {
  return (
    <li>
      <Link to={to} className="nav-link" onClick={() => setBurgerMenuActive(false)}>
        {icon} {text}
      </Link>
    </li>
  );
}

export default Navbar;
