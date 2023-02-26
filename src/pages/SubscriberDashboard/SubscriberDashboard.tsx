import React, { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import style from "./SubscriberDashboard.module.scss";
import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import { UserContext } from "../../contextapi/UserContext";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";
import { HomeRentPostsProps } from "../../services/DataProvider";
import { getLogedInUserPosts } from "../../services/API";
import HomeRentPostCard from "../Home/HomeRentPostCard";

const SubscriberDashboard = () => {
  // user context api
  const [state, setState] = useContext(UserContext);

  /****************************************/
  /*********Get Loged In User Posts********/
  /****************************************/

  const [userAllHomeRentPosts, setUserAllHomeRentPosts] = useState<
    HomeRentPostsProps[]
  >([]);

  const loadLogedInUserPosts = async () => {
    try {
      const res = await getLogedInUserPosts();

      if (res) {
        setUserAllHomeRentPosts(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadLogedInUserPosts();
  }, []);

  return (
    <SubscriberPageLayout>
      <div>
        <h6>{state.user.name}</h6>
        <div className="row">
          {userAllHomeRentPosts &&
            userAllHomeRentPosts.map((item) => (
              <div className="col-xl-3 col-lg-3">
                <HomeRentPostCard homerental_post={item} />
              </div>
            ))}
        </div>
      </div>
    </SubscriberPageLayout>
  );
};

export default SubscriberDashboard;
