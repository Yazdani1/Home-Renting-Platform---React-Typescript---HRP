import React, { FC, ReactNode } from "react";
import { IoAddCircleSharp } from "react-icons/io5";

import style from "./CardLayout.module.scss";

interface CardLayoutProps {
  children?: ReactNode;
  title?: string;
  openModal?: () => void;
  showAddIcon?: boolean;
}

const CardLayout: FC<CardLayoutProps> = ({
  children,
  title,
  showAddIcon,
  openModal,
}) => {
  return (
    <div className={style.cardContainer}>

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
  );
};

export default CardLayout;
