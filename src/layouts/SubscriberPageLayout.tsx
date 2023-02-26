import React, { ReactNode, FC } from "react";

import style from "./SubscriberPageLayout.module.scss";
import SubscriberSidebar from "../components/SubscriberSidebar/SubscriberSidebar";

interface SubscriberPageLayoutProps {
  children: ReactNode;
}

const SubscriberPageLayout: FC<SubscriberPageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-2 col-lg-2">
          <SubscriberSidebar />
        </div>

        <div className="col-xl-10 col-lg-10">{children}</div>
      </div>
    </div>
  );
};

export default SubscriberPageLayout;
