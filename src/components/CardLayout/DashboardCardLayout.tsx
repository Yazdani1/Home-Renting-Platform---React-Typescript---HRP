import React, { FC, ReactNode } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

import style from "./DashboardCardLayout.module.scss";

interface DashboardCardLayoutProps {
  children: ReactNode;
  title?: string;
  openModal?: () => void;
  showAddIcon?: boolean;
}

const DashboardCardLayout: FC<DashboardCardLayoutProps> = ({
  children,
  title,
  openModal,
  showAddIcon,
}) => {
  return (
    <React.Fragment>
      {showAddIcon && (
        <div className={style.card_design}>
          <div className={style.card_header_row}>
            <p>{title}</p>
            {showAddIcon && (
              <p onClick={openModal}>
                <IoAddCircleSharp size={25} />
              </p>
            )}
          </div>
          {children}
        </div>
      )}

      <div className={style.card_design}>
        {/* <div className={style.card_header_row}>
          <p>{title}</p>
          {showAddIcon && (
            <p onClick={openModal}>
              <IoAddCircleSharp size={25} />
            </p>
          )}
        </div> */}
        {children}
      </div>
    </React.Fragment>
  );
};

export default DashboardCardLayout;
