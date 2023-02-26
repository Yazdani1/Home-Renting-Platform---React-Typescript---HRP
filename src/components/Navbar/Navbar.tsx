import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import style from "./Navbar.module.scss";
import ModalBox from "../Modal/ModalBox";
import { SelectLogInRegistration } from "../../services/DataProvider";
import LogIn from "../../pages/Auth/LogIn";
import Registration from "../../pages/Auth/Registration";
import { UserContext } from "../../contextapi/UserContext";

const Navbar = () => {
  const [userDetails] = useContext(UserContext);

  /****************************************/
  /***** Login and Registration Tab  ******/
  /****************************************/

  const [selectLoginOrRegistration, setSelectLoginOrRegistration] =
    useState<SelectLogInRegistration>(SelectLogInRegistration.LOGIN);

  const handleSelectLoginOrRegistration = (
    selectType: SelectLogInRegistration
  ) => {
    setSelectLoginOrRegistration(selectType);
  };

  /****************************************/
  /*********To open modal box *************/
  /****************************************/

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <nav className={style.navbarContainer}>
      <ul>
        <li className="nav-item">
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={"/listview"}
            style={{ textDecoration: "none", color: "white" }}
          >
            List View
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={"/mapview"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Mapview
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={"/alluser-lists"}
            style={{ textDecoration: "none", color: "white" }}
          >
            Members
          </Link>
        </li>

        {userDetails?.user ? (
          <li className="nav-item">
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Dashboard
            </Link>
          </li>
        ) : (
          <li className="nav-item" onClick={handleOpenModal}>
            Log In
          </li>
        )}
      </ul>

      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* ////          Modal Box for Login Registration                   /////// */}
      {/* //////////////////////////////////////////////////////////////////////// */}

      <ModalBox
        title="Authentication"
        open={openModal}
        onCloseModal={handleCloseModal}
      >
        {/* To add tab system button */}
        <div className={style.buttonContainer}>
          <span
            className={
              SelectLogInRegistration.LOGIN === selectLoginOrRegistration
                ? style.loginOptionActive
                : style.loginOption
            }
            onClick={() =>
              handleSelectLoginOrRegistration(SelectLogInRegistration.LOGIN)
            }
          >
            LogIn
          </span>
          <span
            className={
              SelectLogInRegistration.CREATE_ACCOUNT ===
              selectLoginOrRegistration
                ? style.registrationOptionActive
                : style.registrationOption
            }
            onClick={() =>
              handleSelectLoginOrRegistration(
                SelectLogInRegistration.CREATE_ACCOUNT
              )
            }
          >
            Create Account
          </span>
        </div>

        {/* To show the component */}

        <div className={style.componentContainer}>
          {SelectLogInRegistration.LOGIN === selectLoginOrRegistration && (
            <LogIn />
          )}
          {SelectLogInRegistration.CREATE_ACCOUNT ===
            selectLoginOrRegistration && <Registration />}
        </div>
      </ModalBox>
    </nav>
  );
};

export default Navbar;
