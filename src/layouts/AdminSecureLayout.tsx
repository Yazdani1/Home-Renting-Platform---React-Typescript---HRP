import { useContext, ReactNode, FC, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { UserContext } from "../contextapi/UserContext";
import { getUserRoleForAdmin } from "../services/API";

interface AdminSecureLayoutProps {
  children: ReactNode;
}

const AdminSecureLayout: FC<AdminSecureLayoutProps> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();

  const [userstate, setState] = useContext(UserContext);

  /**
   * This function will check admin role. If role is admin then admin page will be accessible
   *  else it will send to the home page
   */
  const loadCurrentUserAdminRole = async () => {
    try {
      const res = await getUserRoleForAdmin();
    } catch (error:any) {
      navigate("/");

      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (userstate && userstate.token) loadCurrentUserAdminRole();
  }, [userstate && userstate.token]);

  return userstate?.user ? (
    <> {children}</>
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default AdminSecureLayout;
