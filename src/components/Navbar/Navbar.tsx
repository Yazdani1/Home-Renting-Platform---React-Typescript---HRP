import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import style from "./Navbar.module.scss";
import ModalBox from "../Modal/ModalBox";
import { SelectLogInRegistration } from "../../services/DataProvider";
import LogIn from "../../pages/Auth/LogIn";
import Registration from "../../pages/Auth/Registration";
import { useUserContext } from "../../contextapi/UserContextCookies";

const Navbar = () => {
  
  // Context api cookies
  const { user, setUser } = useUserContext();

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
      <span className={style.siteTitle}>Home Rental Platform</span>
      <ul>
        <li className="nav-item">{user?.name}</li>

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
            to={"/listview"}
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
            List View
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/mapview"}
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
            Mapview
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/alluser-lists"}
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
            Members
          </NavLink>
        </li>

        {user ? (
          <li className="nav-item">
            <Link
              to={"/dashboard"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Dashboard
            </Link>
          </li>
        ) : (
          <li className={style.joinNowLinkDesign} onClick={handleOpenModal}>
            Join Now
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
