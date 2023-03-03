import React from "react";

import style from "./About.module.scss";
import HomePageLayout from "../../layouts/HomePageLayout";
import CardLayout from "../../components/CardLayout/CardLayout";
const About = () => {
  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <CardLayout>
              <h5>Image will be here</h5>
            </CardLayout>
          </div>

          <div className="col-xl-6 col-lg-6">
            <CardLayout>
              <h5>
                Hi, I am yazdani chowdhury. I work as a full stack developer.
              </h5>
            </CardLayout>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default About;

// ">0.2%",
// "not dead",
// "not op_mini all"
