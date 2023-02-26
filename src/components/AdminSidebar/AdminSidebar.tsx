import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../../contextapi/UserContext";

import style from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  let navigate = useNavigate();
  const [state, setState] = useContext(UserContext);

  // To logout

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    window.localStorage.removeItem("token");
    navigate("/");
    setState("");
  };

  return (
    <div className={style.adminSidebar}>
      <div className={style.wrapper}>
        <h6 style={{ color: "white" }}>{state.user?.name}</h6>
        <span className={style.logoutButton} onClick={logOut}>
          Log Out
        </span>
      </div>
    </div>
  );
};

export default AdminSidebar;
