import React, { useContext } from "react";

import style from "./HomeRentListView.module.scss";
import HomePageLayout from "../../layouts/HomePageLayout";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";
import HomeRentPostCard from "../Home/HomeRentPostCard";
import { HomeRentPostsProps } from "../../services/DataProvider";

const HomeRentListView = () => {
  const allHomeRentPosts = useContext<HomeRentPostsProps[]>(
    HomeRentAllPostsContext
  );

  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          {allHomeRentPosts &&
            allHomeRentPosts.map((item) => (
              <div className="col-xl-3 col-lg-3">
                <HomeRentPostCard homerental_post={item} />
              </div>
            ))}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default HomeRentListView;
