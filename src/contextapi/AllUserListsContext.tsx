import React, {
  useState,
  createContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

import { getAllUserLists } from "../services/API";
import { UserProfileDetailsProps } from "../services/DataProvider";

export const AllUserContext = createContext<null | any>(null);

interface AllUserListsContextProps {
  children: ReactNode;
}

export const AllUserListsProvider: FC<AllUserListsContextProps> = ({
  children,
}) => {
  /****************************************/
  /********* All User Lists   *************/
  /****************************************/

  const [allUserLists, setAllUserLists] = useState<UserProfileDetailsProps[]>(
    []
  );

  const loadAllUserPosts = async () => {
    try {
      const res = await getAllUserLists();
      setAllUserLists(res.data);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadAllUserPosts();
  }, []);

  return (
    <AllUserContext.Provider value={allUserLists}>
      {children}
    </AllUserContext.Provider>
  );
};
