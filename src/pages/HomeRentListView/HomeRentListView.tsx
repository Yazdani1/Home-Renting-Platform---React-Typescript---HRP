import React, { useContext, useEffect, useState } from "react";

import style from "./HomeRentListView.module.scss";
import HomePageLayout from "../../layouts/HomePageLayout";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";
import HomeRentPostCard from "../Home/HomeRentPostCard";
import { HomeRentPostsProps } from "../../services/DataProvider";
import SkeltonCard from "../../components/Skelton/SkeltonCard";

const HomeRentListView = () => {
  // Context api. This context api has all the home rent posts
  const allHomeRentPosts = useContext<HomeRentPostsProps[]>(
    HomeRentAllPostsContext
  );

  // To show the skelton - first check if the data i available then turn it to false else true.
  // if its true then we show the skelton

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Here we check if data is loaded from context api
  useEffect(() => {
    if (allHomeRentPosts && allHomeRentPosts.length > 0) {
      setIsLoading(false);
    }
  }, [allHomeRentPosts]);

  /**
   * To add tab title for this page
   */

  useEffect(() => {
    document.title = `List View`;
  }, []);

  return (
    <HomePageLayout>
      <div className="container">
        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* ////                       To show skelton                   /////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}

        {isLoading && (
          <div className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                <div style={{ marginTop: "10px" }}>
                  <SkeltonCard key={index} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* ////                       To show all the posts             /////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}

        {!isLoading && (
          <div className="row">
            {allHomeRentPosts &&
              allHomeRentPosts.map((item) => (
                <div className="col-xl-3 col-lg-3">
                  <HomeRentPostCard homerental_post={item} key={item._id} />
                </div>
              ))}
          </div>
        )}
      </div>
    </HomePageLayout>
  );
};

export default HomeRentListView;
