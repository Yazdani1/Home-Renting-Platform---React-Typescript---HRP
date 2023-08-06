import React, { ReactNode, FC } from "react";

import style from "./MarkerviewButton.module.scss";

interface MarkerviewButtonProps {
  children: ReactNode;
}

const MarkerviewButton: FC<MarkerviewButtonProps> = ({ children }) => {
  return (
    <button className={style.btnDesign}>{children}</button>
  );
};

export default MarkerviewButton;
