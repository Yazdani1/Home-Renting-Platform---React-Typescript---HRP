import React, { useState, FC } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import style from "./DropDownItem.module.scss";

interface DropDownItemProps {
  onSaveButton?: () => void;
  onReportButton?: () => void;
}

const DropDownItem: FC<DropDownItemProps> = ({
  onSaveButton,
  onReportButton,
  
}) => {
  const [showDropDownList, setShowDropDownList] = useState<boolean>(false);

  const handleDropDownList = () => {
    setShowDropDownList(!showDropDownList);
  };

  return (
    <div className={style.moreIconContainer}>
      {/* Icon */}
      <div className={style.moreIconDesign} onClick={handleDropDownList}>
        <p>
          <BiDotsHorizontalRounded size={25} />
        </p>
      </div>

      

      {/* Dropdown List */}
      {showDropDownList && (
        <div className={style.dropDownList}>
            

          <p
            onClick={() => {
              onSaveButton?.();
              handleDropDownList();
            }}
          >
            Save
          </p>


          <p
            onClick={() => {
              onReportButton?.();
              handleDropDownList();
            }}
          >
            Report
          </p>
        </div>
      )}


    </div>
  );
};

export default DropDownItem;
