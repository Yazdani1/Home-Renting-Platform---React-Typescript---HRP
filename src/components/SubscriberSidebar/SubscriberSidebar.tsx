import React, { useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import style from "./SubscriberSidebar.module.scss";
import { useUserContext } from "../../contextapi/UserContextCookies";

const SubscriberSidebar = () => {
  let navigate = useNavigate();

  // Context api cookies
  const { user, logout } = useUserContext();

  // To logout

  const logOut = () => {
    logout();
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={style.subscriberSidebar}>
      <div className={style.sideBarList}>
        <ul>
          <div className={style.profileContainer}>
            {user?.profilepic ? (
              <div className={style.profilePicture}>
                <img src={user?.profilepic} alt="Profile" />
              </div>
            ) : (
              <div className={style.profilePictureAvatar}>
                <CgProfile size={80} />
              </div>
            )}
          </div>
          <li className={style.username}>{user?.name}</li>
          <hr />

          <li>
            <NavLink
              to={"/"}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "white",
                      textDecoration: "none",
                      borderBottom: "3px solid yellow",
                    }
                  : { color: "white", textDecoration: "none" }
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/dashboard"}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "white",
                      textDecoration: "none",
                      borderBottom: "3px solid yellow",
                    }
                  : { color: "white", textDecoration: "none" }
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/photo-library"}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "white",
                      textDecoration: "none",
                      borderBottom: "3px solid yellow",
                      marginTop: "5px",
                    }
                  : { color: "white", textDecoration: "none" }
              }
            >
              Photo Library
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/profile"}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "white",
                      textDecoration: "none",
                      borderBottom: "3px solid yellow",
                    }
                  : { color: "white", textDecoration: "none" }
              }
            >
              Profile
            </NavLink>
          </li>
        </ul>

        <span className={style.logoutButton} onClick={logOut}>
          Log Out
        </span>
      </div>
    </div>
  );
};

export default SubscriberSidebar;
