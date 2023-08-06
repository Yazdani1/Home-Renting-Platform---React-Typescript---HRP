import React, { FC } from "react";

import style from "./DropdownCategory.module.scss";
import { Category } from "../../services/DataProvider";

interface DropdownCategoryProps {
  value: string;
  label: string;
  setValue: (value: string) => void;
  data: Category[];
}

const DropdownCategory: FC<DropdownCategoryProps> = ({
  value,
  label,
  setValue,
  data,
}) => {
  return (
    <div className="dropdown_container">
      <label className={style.label}>{label}</label>
      <select
        className={style.dropdown_selectordesign}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {data.map((cat) => (
          <option value={cat._id} key={cat._id}>
            {cat.categoryName}
          </option>
        ))}
    
      </select>
    </div>
  );
};

export default DropdownCategory;
