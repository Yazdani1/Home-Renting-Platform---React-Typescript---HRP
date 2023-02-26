import { useContext } from "react";

import HomePageLayout from "../../layouts/HomePageLayout";
import style from "./HomeRentPost.module.scss";
import HomeRentPost from "./HomeRentPost";
import LocationMap from "./LocationMap";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";

const Home = () => {
  /****************************************/
  /*********Get Home Rent Posts ***********/
  /****************************************/

  // context api

  const allHomeRentPosts = useContext(HomeRentAllPostsContext);

  return (
    <HomePageLayout>
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className={style.homeRentPostContainer}>
            <HomeRentPost allHomeRentPosts={allHomeRentPosts} />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <LocationMap homeRentalLocation={allHomeRentPosts} />
        </div>
      </div>
    </HomePageLayout>
  );
};

export default Home;
