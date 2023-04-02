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
import SkeltonCard from "../../components/Skelton/SkeltonCard";

const UserPublicProfile = () => {
  const { slug } = useParams();

  /****************************************/
  /********* User Profile Details *********/
  /****************************************/

  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileDetailsProps>();

  const [userAllPosts, setUserAllPosts] = useState<HomeRentPostsProps[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUserProfileDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getUserProfile(slug!);

      if (res) {
        setUserProfileDetails(res.data.userProfile);
        setUserAllPosts(res.data.userAllPosts);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfileDetails();
  }, []);

  /**
   * This use effect and function is showing slug name in the browser tab when user move to 
   * user public profile
   */

  const toPascalCase = (str: string | any) => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, (match: any) => match.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "");
  };

  useEffect(() => {
    document.title = `${toPascalCase(slug)}`;
  }, [slug]);

  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* ////                       User profile details                  /////// */}
          {/* //////////////////////////////////////////////////////////////////////// */}

          <div className="col-xl-3 col-lg-3">
            {/* To show skelton */}
            {isLoading && (
              <div className="row">
                <SkeltonCard />
              </div>
            )}

            {!isLoading && (
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
            )}
          </div>

          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* ////                       User all the posts                    /////// */}
          {/* //////////////////////////////////////////////////////////////////////// */}

          <div className="col-xl-9 col-lg-9">
            {/* To show skelton */}
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

            {/* To show all the user posts */}

            {!isLoading && (
              <div className="row">
                {userAllPosts &&
                  userAllPosts.map((item) => (
                    <div className="col-xl-3 col-lg-3">
                      <HomeRentPostCard homerental_post={item} key={item._id} />
                    </div>
                  ))}
              </div>
            )}

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
