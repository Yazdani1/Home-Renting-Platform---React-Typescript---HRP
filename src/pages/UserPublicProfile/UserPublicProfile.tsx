import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import style from "./UserPublicProfile.module.scss";
import CardLayout from "../../components/CardLayout/CardLayout";
import { getUserProfile } from "../../services/API";
import {
  HomeRentPostsProps,
  UserProfileDetailsProps,
} from "../../services/DataProvider";
import HomeRentPostCard from "../Home/HomeRentPostCard";
import HomePageLayout from "../../layouts/HomePageLayout";

const UserPublicProfile = () => {
  const { slug } = useParams();

  /****************************************/
  /********* User Profile Details *********/
  /****************************************/

  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileDetailsProps>();

  const [userAllPosts, setUserAllPosts] = useState<HomeRentPostsProps[]>([]);

  const loadUserProfileDetails = async () => {
    try {
      const res = await getUserProfile(slug!);

      if (res) {
        setUserProfileDetails(res.data.userProfile);
        setUserAllPosts(res.data.userAllPosts);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserProfileDetails();
  }, []);

  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* ////                       User profile details                  /////// */}
          {/* //////////////////////////////////////////////////////////////////////// */}

          <div className="col-xl-3 col-lg-3">
            <CardLayout>
              <div className={style.profileInfoContainer}>
                <span className={style.profileCircale}>
                  <h6>
                    {userProfileDetails?.name.substring(0, 2).toUpperCase()}
                  </h6>
                </span>
                <h6>{userProfileDetails?.name}</h6>

                <p>{userProfileDetails?.role}</p>
                <p>
                  Joined:
                  {moment(userProfileDetails?.date).format("MMM Do YYYY")}
                </p>
              </div>
            </CardLayout>
          </div>

          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* ////                       User all the posts                    /////// */}
          {/* //////////////////////////////////////////////////////////////////////// */}

          <div className="col-xl-9 col-lg-9">

            {/* To show all the user posts */}

            <div className="row">
              {userAllPosts &&
                userAllPosts.map((item) => (
                  <div className="col-xl-3 col-lg-3">
                    <HomeRentPostCard homerental_post={item} key={item._id} />
                  </div>
                ))}
            </div>

            {/* To show message if user did not publish any posts yet */}

            {userAllPosts.length === 0 && (
              <CardLayout>
                <h6 style={{ textAlign: "center" }}>
                  This user didn't publish any posts yet
                </h6>
              </CardLayout>
            )}

          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default UserPublicProfile;
