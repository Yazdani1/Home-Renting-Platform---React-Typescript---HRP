import { ReactNode, FC, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getUserRoleForAdmin } from "../services/API";

interface AdminSecureLayoutProps {
  children: ReactNode;
}

const AdminSecureLayout: FC<AdminSecureLayoutProps> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();

  /**
   * This function will check admin role. If role is admin then admin page will be accessible
   *  else it will send to the home page
   */
  const loadCurrentUserAdminRole = async () => {
    try {
      const res = await getUserRoleForAdmin();
    } catch (error: any) {
      navigate("/");

      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    loadCurrentUserAdminRole();
  }, []);

  const tokenData = localStorage.getItem("token");

  return tokenData ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default AdminSecureLayout;
