import React, { FC } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import style from "./AllUserCard.module.scss";
import { UserProfileDetailsProps } from "../../services/DataProvider";
import CardLayout from "../../components/CardLayout/CardLayout";

interface AllUserCardProps {
  userInfo: UserProfileDetailsProps;
}

const AllUserCard: FC<AllUserCardProps> = ({ userInfo }) => {
  return (
    <div className={style.cardContainer}>
      <CardLayout>
        <div className={style.profileInfoContainer}>
          <span className={style.profileCircale}>
            <h6>{userInfo.name.substring(0, 2).toUpperCase()}</h6>
          </span>
          <h6>{userInfo.name}</h6>

          <p>{userInfo.role}</p>
          <p>
            Joined:
            {moment(userInfo?.date).format("MMM Do YYYY")}
          </p>
          <Link
            to={"/profile/" + userInfo.slug}
            style={{ textDecoration: "none", color: "inherit" }}
            className={style.viewProfileDesign}
          >
            <span>View Profile</span>
          </Link>
        </div>
      </CardLayout>
    </div>
  );
};

export default AllUserCard;
