import React, { FC, useState } from "react";

import style from "./SubscriberDashboardPostCard.module.scss";
import { HomeRentPostsProps } from "../../services/DataProvider";
import DashboardCardLayout from "../../components/CardLayout/DashboardCardLayout";

interface SubscriberDashboardPostCardProps {
  homeRentalPosts: HomeRentPostsProps;
}

const SubscriberDashboardPostCard: FC<SubscriberDashboardPostCardProps> = ({
  homeRentalPosts,
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  return (
    <DashboardCardLayout>
      <div className={style.card_items}>
        <span className={style.image_design}>
          <img src={homeRentalPosts.photo[imageIndex]} alt="postimge" />
        </span>
        <p>{homeRentalPosts.title}</p>
        <p>{homeRentalPosts.city}</p>
        <p>{homeRentalPosts.rentAmount}.Euro</p>
        <p>{homeRentalPosts.categoryBy?.categoryName}</p>
        <p>{homeRentalPosts.rooms}</p>
        <p>{homeRentalPosts.visibility}</p>
        <p>{homeRentalPosts.date}</p>
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </DashboardCardLayout>
  );
};

export default SubscriberDashboardPostCard;
