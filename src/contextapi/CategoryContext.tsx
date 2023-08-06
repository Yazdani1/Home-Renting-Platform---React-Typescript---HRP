import React, {
  useState,
  createContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

import { getAllCategory } from "../services/API";
import { Category } from "../services/DataProvider";

export const CategoryContext = createContext<null | any>(null);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: FC<CategoryProviderProps> = ({ children }) => {
    
  const [allCategory, setAllCategory] = useState<Category[]>([]);

  const loadAllCategory = async () => {
    try {
      const res = await getAllCategory();
      setAllCategory(res);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllCategory();
  }, []);

  return (
    <CategoryContext.Provider value={allCategory}>
      {children}
    </CategoryContext.Provider>
  );
};
