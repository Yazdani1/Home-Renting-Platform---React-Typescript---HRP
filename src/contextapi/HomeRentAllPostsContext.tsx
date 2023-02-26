import React, {
  useState,
  createContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { ToastContainer, toast } from "react-toastify";

import { getAllHomeRentPosts } from "../services/API";
import { HomeRentPostsProps } from "../services/DataProvider";

export const HomeRentAllPostsContext = createContext<null | any>(null);

interface HomeRentAllPostsContextProviderProps {
  children: ReactNode;
}

export const HomeRentAllPostsProvider: FC<
  HomeRentAllPostsContextProviderProps
> = ({ children }) => {
  const [allHomeRentPosts, setAllHomeRentPosts] = useState<
    HomeRentPostsProps[]
  >([]);

  const loadAllHomeRentPosts = async () => {
    try {
      const res = await getAllHomeRentPosts();
      setAllHomeRentPosts(res.data);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

    useEffect(() => {
      loadAllHomeRentPosts();
    }, []);

  return (
    <HomeRentAllPostsContext.Provider value={allHomeRentPosts}>
      {children}
    </HomeRentAllPostsContext.Provider>
  );
};
