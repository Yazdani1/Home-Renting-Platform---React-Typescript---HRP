import { useContext } from "react";

import style from "./AllUserLists.module.scss";
import { AllUserContext } from "../../contextapi/AllUserListsContext";
import HomePageLayout from "../../layouts/HomePageLayout";
import AllUserCard from "./AllUserCard";
import { UserProfileDetailsProps } from "../../services/DataProvider";

const AllUserLists = () => {

  // Context api for all the user lists
  const allHomeRentPosts =
    useContext<UserProfileDetailsProps[]>(AllUserContext);

  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          {allHomeRentPosts &&
            allHomeRentPosts.map((user) => (
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <AllUserCard userInfo={user} key={user._id}/>
              </div>
            ))}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default AllUserLists;
