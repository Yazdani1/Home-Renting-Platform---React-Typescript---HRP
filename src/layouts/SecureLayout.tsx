import { ReactNode, FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProposSecureLayout {
  children: ReactNode;
}

const SecureLayout: FC<IProposSecureLayout> = ({ children }) => {
  let location = useLocation();

  const tokenData = localStorage.getItem("token");

  return tokenData ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );

};

export default SecureLayout;
