import React, { FC } from "react";

import style from "./DropDownSelector.module.scss";
import { VisibilityTypes } from "../../services/DataProvider";

interface DropDownSelectorProps {
  value: string;
  label: string;
  setValue: (value: VisibilityTypes) => void;
  data: string[];
}

const DropDownSelector: FC<DropDownSelectorProps> = ({
  value,
  setValue,
  data,
  label
}) => {
  return (
    <div className="drop_down_container">
      <label className={style.label}>{label}</label>
      <select
        className={style.dropdown_selectordesign}
        value={value}
        onChange={(e) => setValue(e.target.value as VisibilityTypes)}
      >
        {data.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        {/* {Object.values(data).map((type) => (
          <option value={type}>{type}</option>
        ))} */}
      </select>
    </div>
  );
};

export default DropDownSelector;
