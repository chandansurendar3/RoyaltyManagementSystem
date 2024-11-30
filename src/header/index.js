import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { logotext } from "../content_option";
import Themetoggle from "../components/themetoggle";
import { useParams } from 'react-router-dom';
import NotificationIcono from "../components/notificationIcono";

const Headermain = ({ page, notificationsLength }) => {
  const [isActive, setActive] = useState(false);
  const { userid } = useParams();
  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("ovhidden", !isActive);
  };

  return (
    <>
      <header className="fixed-top site__header">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="navbar-brand nav_ac" to="/">
            {logotext}
          </Link>
          <div className="d-flex align-items-center">
            <Themetoggle />
            {/* <NotificationIcono /> */}
            <button className="menu__button nav_ac" onClick={handleToggle}>
              {isActive ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <div className={`site__navigation ${isActive ? "menu__opend" : ""}`}>
          <div className="bg__menu">
            {page === "artistDash" && (
              <div className="menu__wrapper">
                <ul className="the_menu">
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/account" className="my-3">
                      Account
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/portfolio" className="my-3">
                      Logout
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to={`/notificationart/${userid}`} className="my-3">
                      Notifications
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {page === "adminDash" && (
              <div className="menu__wrapper">
                <ul className="the_menu">
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/login" className="my-3">
                      Dashboard
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/portfolio" className="my-3">
                      Logout
                    </Link>
                  </li>
                  
                </ul>
              </div>
            )}
            {page === "managerDash" && (
              <div className="menu__wrapper">
                <ul className="the_menu">
                  {/* <li className="menu_item">
                    <Link onClick={handleToggle} to="/managerdash" className="my-3">
                      Dashboard
                    </Link>
                  </li> */}
                  <li className="menu_item">
                    <Link onClick={handleToggle} to={`/account/${userid}`} className="my-3">
                      Account
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to="/portfolio" className="my-3">
                      Logout
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link onClick={handleToggle} to={`/notificationman/${userid}`} className="my-3">
                      Notifications
                    </Link>
                    </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="br-top"></div>
      <div className="br-bottom"></div>
      <div className="br-left"></div>
      <div className="br-right"></div>
    </>
  );
};

export default Headermain;