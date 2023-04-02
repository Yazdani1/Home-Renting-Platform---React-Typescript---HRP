import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import style from "./SkeltonMap.module.scss";

const SkeltonMap = () => {
  return (
    <div className={style.mapViewContainer}>
      <span className={style.skeltonMapIcon}>
        <p>
          <FaMapMarkerAlt size={50} color="grey" />
        </p>
      </span>
    </div>
  );
};

export default SkeltonMap;
