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

interface AllUserListsProviderProps {
  children: ReactNode;
}

export const AllUserListsProvider: FC<AllUserListsProviderProps> = ({
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
      setAllUserLists(res);
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
