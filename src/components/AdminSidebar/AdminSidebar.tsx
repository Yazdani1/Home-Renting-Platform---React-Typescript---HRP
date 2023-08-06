import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import {useUserContext} from "../../contextapi/UserContextCookies"

import style from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  
  let navigate = useNavigate();

  // Context api cookies
  const {user,logout} = useUserContext();

  // To logout

  const logOutAdmin = () => {
    logout()
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={style.adminSidebar}>
      <div className={style.wrapper}>
        <h6 style={{ color: "white" }}>{user?.name}</h6>
        <span className={style.logoutButton} onClick={logOutAdmin}>
          Log Out
        </span>
      </div>
    </div>
  );
};

export default AdminSidebar;
