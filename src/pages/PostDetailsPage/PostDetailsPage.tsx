import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { BsPinMapFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaCity } from "react-icons/fa";
import { SiHomeadvisor } from "react-icons/si";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import moment from "moment";

import HomePageLayout from "../../layouts/HomePageLayout";
import style from "./PostDetailsPage.module.scss";
import CardLayout from "../../components/CardLayout/CardLayout";
import { getSingleHomeRentPost } from "../../services/API";
import { HomeRentPostsProps } from "../../services/DataProvider";
import HomeRentPostCard from "../Home/HomeRentPostCard";
import SkeltonCard from "../../components/Skelton/SkeltonCard";
import SkeltonMap from "../../components/Skelton/SkeltonMap";
import DropDownItem from "../../components/DropDown/DropDownItem";
import ModalBox from "../../components/Modal/ModalBox";
import { CreateWishlistProps, createWishlistPost } from "../../services/API";

const PostDetailsPage = () => {
  const { slug } = useParams();

  //////////////////////////////////////////////////////
  /////// Get Single Post Details  /////////////////////
  //////////////////////////////////////////////////////

  const [lng, setLng] = useState<number | any>(8.524671002836843);
  const [lat, setLat] = useState<number | any>(52.13172119845984);

  const [homeRentSinglePost, setHomeRentSinglePost] =
    useState<HomeRentPostsProps>();
  const [homeRentMorePostsByCategory, setHomeRentMorePostsByCategory] =
    useState<HomeRentPostsProps[]>([]);
  const [homeRentMorePostsByCity, setHomeRentMorePostsByCity] = useState<
    HomeRentPostsProps[]
  >([]);
  const [homeRentMorePostsBySameUser, setHomeRentMorePostsBySameUser] =
    useState<HomeRentPostsProps[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSinglePostDetails = async () => {
    setIsLoading(true);
    try {
      const res = await getSingleHomeRentPost(slug!);

      if (res) {
        setHomeRentSinglePost(res.data.singleHomeRentalPost);
        setHomeRentMorePostsByCategory(res.data.morePostsByCategory);
        setHomeRentMorePostsByCity(res.data.morePostsByCity);
        setHomeRentMorePostsBySameUser(res.data.morePostsBySameUser);

        setLng(res.data.singleHomeRentalPost.longitude);
        setLat(res.data.singleHomeRentalPost.latitude);

        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
    }
  };

  //////////////////////////////////////////////////////
  /////////////Select Map Marker ///////////////////////
  //////////////////////////////////////////////////////

  /**
   * To select the single marker and then show the post information in the popover
   */

  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const handleMarkerClick = (marker: number) => {
    setSelectedMarker(marker);
  };

  const handleClose = () => {
    setSelectedMarker(null);
  };

  const GERMANY_BOUNDS: [[number, number], [number, number]] = [
    [3, 40],
    [16, 56],
  ];

  // to select photo index position and show in the large single view

  const [currentImage, setCurrentImage] = useState<number>(0);

  const handleImageSelect = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    loadSinglePostDetails();
  }, [slug]);

  /**
   * This use effect is showing slug name in the browser tab one user move to the detials page
   */

  useEffect(() => {
    document.title = `${slug}`;
  }, [slug]);

  //////////////////////////////////////////////////////
  ///////  To Report Post           ////////////////////
  //////////////////////////////////////////////////////

  // To open modal box;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //////////////////////////////////////////////////////
  ///////  To Save Post to Wishlist     ////////////////
  //////////////////////////////////////////////////////

  const onSubmitCreateWishlist = async () => {
    try {
      const payload: CreateWishlistProps = {
        postOwner: homeRentSinglePost?.postedBy?._id!,
        postId: homeRentSinglePost?._id!,
      };

      const res = await createWishlistPost(payload);

      if (res) {
        toast.success("You have saved this item", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            {/* //////////////////////////////////////////////////////////////////////// */}
            {/* ////                    Photo slider                   ///////////////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}

            {isLoading && (
              <div>
                <SkeltonMap />
              </div>
            )}

            {!isLoading && (
              <CardLayout>
                <button
                  className="btn btn-danger"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
                <div className="row">
                  <div className="col-xl-2 col-lg-2">
                    {homeRentSinglePost?.photo.map((p, index: number) => (
                      <div
                        onMouseEnter={() => handleImageSelect(index)}
                        className={
                          currentImage === index
                            ? style.selectedImageDesign
                            : style.imagePreviewList
                        }
                      >
                        <img src={p} />
                      </div>
                    ))}
                  </div>

                  {/* Single image view */}

                  <div className="col-xl-10 col-lg-10">
                    <div className={style.singleImageView}>
                      <img
                        src={homeRentSinglePost?.photo[currentImage]}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </CardLayout>
            )}

            {/* //////////////////////////////////////////////////////////////////////// */}
            {/* ////  Post user profile and wishlist , repost section            /////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}

            <CardLayout>
              <div className={style.userInfoContainer}>
                <DropDownItem
                  onSaveButton={onSubmitCreateWishlist}
                  onReportButton={handleOpenModal}
                />
              </div>
              <ModalBox
                title="Report this post"
                open={openModal}
                onCloseModal={handleCloseModal}
              >
                <h6>To repost post</h6>
              </ModalBox>
            </CardLayout>

            {/* TO show post details info */}

            {!isLoading && (
              <CardLayout>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div>
                      <p>
                        <FaCity size={50} />
                      </p>
                      <h6> City</h6>
                      <p style={{ fontWeight: "bold" }}>
                        {homeRentSinglePost?.city}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div>
                      <p>
                        <SiHomeadvisor size={50} />
                      </p>
                      <h6>Rooms</h6>
                      <p style={{ fontWeight: "bold" }}>
                        {homeRentSinglePost?.rooms}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div>
                      <p>
                        <RiMoneyEuroCircleFill size={50} />
                      </p>
                      <h6>Rent</h6>
                      <p style={{ fontWeight: "bold" }}>
                        {homeRentSinglePost?.rentAmount}.Eur
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div>
                      <p>
                        <BiCategoryAlt size={50} />
                      </p>
                      <h6>Category</h6>
                      <p style={{ fontWeight: "bold" }}>
                        {homeRentSinglePost?.categoryBy.categoryName}
                      </p>
                    </div>
                  </div>
                </div>
              </CardLayout>
            )}

            {/* TO show post details title and des */}

            {!isLoading && (
              <CardLayout>
                {homeRentSinglePost?.latitude},
                <h5> {homeRentSinglePost?.title}</h5>
                <h6>
                  Published:
                  {moment(homeRentSinglePost?.date).format("MMM Do YY")}
                </h6>
                <p>{homeRentSinglePost?.des}</p>
              </CardLayout>
            )}

            {/* //////////////////////////////////////////////////////////////////////// */}
            {/* ////                       To show Map Marker                   /////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}

            <CardLayout>
              <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                // mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
                style={{
                  width: "auto",
                  height: "400px",
                  borderRadius: "15px",
                }}
                initialViewState={{
                  longitude: lng,
                  latitude: lat,
                  zoom: 1,
                  bounds: GERMANY_BOUNDS,
                }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
              >
                <Marker
                  latitude={lat}
                  longitude={lng}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handleMarkerClick(1);
                  }}
                >
                  <p>
                    <BsPinMapFill size={40} color="yellow" />
                  </p>
                </Marker>

                {/* //////////////////////////////////////////////////////////////////////// */}
                {/* ////                       To show map popover                   /////// */}
                {/* //////////////////////////////////////////////////////////////////////// */}

                {selectedMarker && (
                  <Popup latitude={lat} longitude={lng} onClose={handleClose}>
                    {/* // To show the post card */}
                    <h6>{homeRentSinglePost?.city}</h6>
                    <p>
                      {homeRentSinglePost?.latitude},
                      {homeRentSinglePost?.longitude}
                    </p>
                    <h6>{homeRentSinglePost?.rentAmount} Eur-Per Month</h6>
                    <h6>Rooms:{homeRentSinglePost?.rooms}</h6>
                  </Popup>
                )}

                <NavigationControl position="bottom-right" />
                <FullscreenControl />
                <GeolocateControl />
              </Map>
            </CardLayout>

            {/* //////////////////////////////////////////////////////////////////////// */}
            {/* ////      More posts by the same user                           /////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}

            {/* To show more posts by the same user */}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <CardLayout>
                <Link
                  to={"/profile/" + homeRentSinglePost?.postedBy.slug}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h5>More posts by: {homeRentSinglePost?.postedBy.name}</h5>
                </Link>
              </CardLayout>
            </div>

            <div className="row">
              {homeRentMorePostsBySameUser &&
                homeRentMorePostsBySameUser.map((item) => (
                  <div className="col-xl-4 col-lg-4">
                    <HomeRentPostCard homerental_post={item} />
                  </div>
                ))}
            </div>
          </div>

          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* ////      More posts based on category                      //////////// */}
          {/* //////////////////////////////////////////////////////////////////////// */}

          {/* To show posts based on the single post category */}

          <div className="col-xl-4 col-lg-4">
            {/* To show skelton  */}
            {isLoading && (
              <div className="row">
                <SkeltonCard />
              </div>
            )}

            {!isLoading && (
              <div className="row">
                {homeRentMorePostsByCategory &&
                  homeRentMorePostsByCategory.map((item) => (
                    <div className="col-xl-8 col-lg-8">
                      <HomeRentPostCard homerental_post={item} />
                    </div>
                  ))}
              </div>
            )}

            {/* <div className="row">
              {homeRentMorePostsByCity &&
                homeRentMorePostsByCity.map((item) => (
                  <div className="col-xl-8 col-lg-8">
                    <HomeRentPostCard homerental_post={item} />
                  </div>
                ))}
            </div> */}
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default PostDetailsPage;
