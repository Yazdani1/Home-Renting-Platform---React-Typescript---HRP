import { useState, createContext, useEffect, ReactNode, FC } from "react";

type UserState = {
  user: any;
  token: string;
};

const UserContext = createContext<
  [UserState, React.Dispatch<React.SetStateAction<UserState>>]
>([{ user: null, token: "" }, () => null]);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [state, setState] = useState<UserState>({ user: null, token: "" });

  useEffect(() => {
    const tokenLogin = window.localStorage.getItem("tokenLogin");
    if (tokenLogin) {
      setState(JSON.parse(tokenLogin));
    }
  }, []);

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

// Will try this code to do the user context api
