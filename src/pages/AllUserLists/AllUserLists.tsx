import { useContext, useEffect, useState } from "react";

import style from "./AllUserLists.module.scss";
import { AllUserContext } from "../../contextapi/AllUserListsContext";
import HomePageLayout from "../../layouts/HomePageLayout";
import AllUserCard from "./AllUserCard";
import { UserProfileDetailsProps } from "../../services/DataProvider";
import SkeltonCard from "../../components/Skelton/SkeltonCard";

const AllUserLists = () => {
  // Context api for all the user lists
  const allUserLists = useContext<UserProfileDetailsProps[]>(AllUserContext);

  // To show the skelton - first check if the data i available then turn it to false else true.
  // if its true then we show the skelton

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Here we check if data is loaded from context api
  useEffect(() => {
    if (allUserLists && allUserLists.length > 0) {
      setIsLoading(false);
    }
  }, [allUserLists]);

  /**
   * To add tab title for this page
   */

  useEffect(() => {
    document.title = `All Members`;
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
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div style={{ marginTop: "10px" }}>
                  <SkeltonCard key={index} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* ////                To show all user lists                   /////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}

        {!isLoading && (
          <div className="row">
            {allUserLists &&
              allUserLists.map((user) => (
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                  <AllUserCard userInfo={user} key={user._id} />
                </div>
              ))}
          </div>
        )}
      </div>
    </HomePageLayout>
  );
};

export default AllUserLists;
