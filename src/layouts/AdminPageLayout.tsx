import React, { ReactNode, FC } from "react";

import AdminSidebar from "../components/AdminSidebar/AdminSidebar";

interface AdminPageLayoutProps {
  children: ReactNode;
}

const AdminPageLayout: FC<AdminPageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-lg-2">
          <AdminSidebar />
        </div>

        <div className="col-xl-10 col-lg-10">{children}</div>
      </div>
    </div>
  );
};

export default AdminPageLayout;
