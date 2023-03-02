import React, { FC, useEffect, useState } from "react";

import { HomeRentPostsProps } from "../../services/DataProvider";
import HomeRentPostCard from "./HomeRentPostCard";
import style from "./HomeRentPost.module.scss";
import SkeltonCard from "../../components/Skelton/SkeltonCard";

interface HomeRentPostProps {
  allHomeRentPosts: HomeRentPostsProps[];
}

const HomeRentPost: FC<HomeRentPostProps> = ({ allHomeRentPosts }) => {
  // To show the skelton - first check if the data i available then turn it to false else true.
  // if its true then we show the skelton

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Here we check if data is loaded from context api
  useEffect(() => {
    if (allHomeRentPosts && allHomeRentPosts.length > 0) {
      setIsLoading(false);
    }
  }, [allHomeRentPosts]);

  return (
    <React.Fragment>
      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* ////                       To show skelton                   /////////// */}
      {/* //////////////////////////////////////////////////////////////////////// */}

      {isLoading && (
        <div className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div style={{ marginBottom: "10px" }}>
                <SkeltonCard />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* ////               To show home rent posts                   /////////// */}
      {/* //////////////////////////////////////////////////////////////////////// */}

      {!isLoading && (
        <div className="row ">
          {allHomeRentPosts &&
            allHomeRentPosts.map((item) => (
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                <HomeRentPostCard homerental_post={item} key={item._id} />
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default HomeRentPost;
