import { FC, useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";

import style from "./HomeRentPostCard.module.scss";
import { HomeRentPostsProps } from "../../services/DataProvider";

interface HomeRentPostCardProps {
  homerental_post: HomeRentPostsProps;
}

const HomeRentPostCard: FC<HomeRentPostCardProps> = ({ homerental_post }) => {
  /****************************************/
  /*** Handle next and previous image  ****/
  /****************************************/

  /**
   * To handle image slider, at first one image will be avaiable and when user click on the next button
   * rest of the images will be shown one by one.
   */

  const [imageIndex, setImageIndex] = useState<number>(0);

  const handleNextImage = () => {
    setImageIndex((imageIndex + 1) % homerental_post.photo.length);
  };

  const handlePreviousImage = () => {
    setImageIndex((imageIndex - 1) % homerental_post.photo.length);
  };

  /****************************************/
  /*** To show next and previous icon ****/
  /****************************************/

  /**
   * When user hover the card next and previous button will be available
   */

  const [showIcon, setShowIcon] = useState<boolean>(false);

  const handleShowIcon = () => {
    setShowIcon(true);
  };

  const handleHideIcon = () => {
    setShowIcon(false);
  };

  return (
    <div
      className={style.homeRentCardContainer}
      onMouseEnter={handleShowIcon}
      onMouseLeave={handleHideIcon}
    >
      <span className={style.homeRentImage}>
        <img src={homerental_post.photo[imageIndex]} className="img-fluid" />
      </span>

      {showIcon && (
        <>
          <div className={style.dots}>
            {homerental_post.photo.map((_, index) => (
              <span
                key={index}
                className={index === imageIndex ? style.active : style.dot}
              ></span>
            ))}
          </div>

          <span className={style.nextIcon} onClick={handleNextImage}>
            <p>
              <MdOutlineNavigateNext size={25} />
            </p>
          </span>

          {imageIndex > 0 && (
            <span className={style.previousIcon} onClick={handlePreviousImage}>
              <p>
                <GrFormPrevious size={25} />
              </p>
            </span>
          )}
        </>
      )}

      <Link
        to={"/post-details/" + homerental_post.slug}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={style.homeRentPostItem}>
          <p>{homerental_post.city}</p>
          <p>{homerental_post.categoryBy.categoryName}</p>
          <p>{homerental_post.rentAmount}.EUR</p>
        </div>
      </Link>
    </div>
  );
};

export default HomeRentPostCard;
