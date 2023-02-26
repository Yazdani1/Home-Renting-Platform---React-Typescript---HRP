import { FC } from "react";

import { HomeRentPostsProps } from "../../services/DataProvider";
import HomeRentPostCard from "./HomeRentPostCard";
import style from "./HomeRentPost.module.scss";

interface HomeRentPostProps {
  allHomeRentPosts: HomeRentPostsProps[];
}

const HomeRentPost: FC<HomeRentPostProps> = ({ allHomeRentPosts }) => {

  return (
    <div className="row ">
      {allHomeRentPosts &&
        allHomeRentPosts.map((item) => (
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <HomeRentPostCard homerental_post={item} key={item._id} />
          </div>
        ))}
    </div>
  );
};

export default HomeRentPost;
