import React, { FC, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { SiGooglemaps } from "react-icons/si";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

import style from "./LocationMapCard.module.scss";
import { HomeRentPostsProps } from "../../services/DataProvider";

interface LocationMapCardProps {
  home_rental_location: HomeRentPostsProps;
}

const LocationMapCard: FC<LocationMapCardProps> = ({
  home_rental_location,
}) => {
  //////////////////////////////////////////////////////
  /////////////Select Map Marker ///////////////////////
  //////////////////////////////////////////////////////

  /**
   * To select the single marker and then show the post information in the popover
   */

  const [selectedMarker, setSelectedMarker] =
    useState<HomeRentPostsProps | null>(null);

  const handleMarkerClick = (marker: HomeRentPostsProps) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  /****************************************/
  /*** Handle next and previous image  ****/
  /****************************************/

  /**
   * To handle image slider, at first one image will be avaiable and when user click on the next button
   * rest of the images will be shown one by one.
   */

  const [imageIndex, setImageIndex] = useState<number>(0);

  const handleNextImage = () => {
    setImageIndex((imageIndex + 1) % home_rental_location.photo.length);
  };

  const handlePreviousImage = () => {
    setImageIndex((imageIndex - 1) % home_rental_location.photo.length);
  };

  /****************************************/
  /*** To show next and previous icon ****/
  /****************************************/

  /**
   * When user hover the card next and previous button will be available on the top of the image
   */

  const [showIcon, setShowIcon] = useState<boolean>(false);

  const handleShowIcon = () => {
    setShowIcon(true);
  };

  const handleHideIcon = () => {
    setShowIcon(false);
  };

  return (
    <React.Fragment>
      <Marker
        latitude={home_rental_location.latitude}
        longitude={home_rental_location.longitude}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          handleMarkerClick(home_rental_location);
        }}
      >
        <div>
          {/* To show map marker icon */}
          <p>
            <SiGooglemaps size={40} color="yellow" />
          </p>
          <p
            style={{
              background: "tomato",
              padding: "5px",
              borderRadius: "4px",
              color: "white",
            }}
          >
            ${home_rental_location.rentAmount}
          </p>

          {/* To show popover */}

          {selectedMarker && (
            <Popup
              latitude={selectedMarker.latitude}
              longitude={selectedMarker.longitude}
              onClose={handleClose}
            >
              {/* // To show the post card */}

              <div
                className={style.homeRentCardContainer}
                onMouseEnter={handleShowIcon}
                onMouseLeave={handleHideIcon}
              >
                <span className={style.homeRentImage}>
                  <img
                    src={selectedMarker.photo[imageIndex]}
                    className="img-fluid"
                  />
                </span>
                <div className={style.dots}>
                  {selectedMarker.photo.map((_: any, index: any) => (
                    <span
                      key={index}
                      className={
                        index === imageIndex ? style.active : style.dot
                      }
                    ></span>
                  ))}
                </div>
                {showIcon && (
                  <>
                    <span className={style.nextIcon} onClick={handleNextImage}>
                      <p>
                        <MdOutlineNavigateNext size={25} />
                      </p>
                    </span>

                    {imageIndex > 0 && (
                      <span
                        className={style.previousIcon}
                        onClick={handlePreviousImage}
                      >
                        <p>
                          <GrFormPrevious size={25} />
                        </p>
                      </span>
                    )}
                  </>
                )}

                <div className={style.homeRentPostItem}>
                  <h5>{selectedMarker.city}</h5>

                  <h5>{selectedMarker.rentAmount}.EUR</h5>
                </div>
              </div>

              {/* End post card */}

              <Link to={"/post-details/" + selectedMarker.slug}>
                <button className="btn btn-success">View details</button>
              </Link>
            </Popup>
          )}
        </div>
      </Marker>
    </React.Fragment>
  );
};

export default LocationMapCard;
