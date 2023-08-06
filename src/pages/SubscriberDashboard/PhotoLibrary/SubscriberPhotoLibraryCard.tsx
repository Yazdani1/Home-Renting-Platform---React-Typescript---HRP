import { FC } from "react";

import { PhotoLibraryProps } from "../../../services/DataProvider";
import style from "./SubscriberPhotoLibrary.module.scss";

interface SubscriberPhotoLibraryCardProps {
  photo: PhotoLibraryProps;
}

const SubscriberPhotoLibraryCard: FC<SubscriberPhotoLibraryCardProps> = ({
  photo,
}) => {
  return (
    <div className={style.imageCard}>
      <img src={photo.imageurl} className="img-fluid" />
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};

export default SubscriberPhotoLibraryCard;
