import React, { FC, ReactNode } from "react";

import Navbar from "../components/Navbar/Navbar";

interface HomePageLayoutProps {
  children: ReactNode;
}

const HomePageLayout: FC<HomePageLayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
        
      <Navbar />
      <div style={{ margin: "30px" }}>{children}</div>
    </div>
  );
};

export default HomePageLayout;
