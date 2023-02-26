import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../../contextapi/UserContext";
import style from "./SubscriberSidebar.module.scss";

const SubscriberSidebar = () => {
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
    <div className={style.subscriberSidebar}>
      <div className={style.sideBarList}>
        <ul>
          <li>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={"/photo-library"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Photo Library
            </Link>
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
