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

import HomePageLayout from "../../layouts/HomePageLayout";
import style from "./PostDetailsPage.module.scss";
import CardLayout from "../../components/CardLayout/CardLayout";
import { getSingleHomeRentPost } from "../../services/API";
import { HomeRentPostsProps } from "../../services/DataProvider";
import HomeRentPostCard from "../Home/HomeRentPostCard";

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

  const loadSinglePostDetails = async () => {
    try {
      const res = await getSingleHomeRentPost(slug!);

      if (res) {
        setHomeRentSinglePost(res.data.singleHomeRentalPost);
        setHomeRentMorePostsByCategory(res.data.morePostsByCategory);
        setHomeRentMorePostsByCity(res.data.morePostsByCity);
        setHomeRentMorePostsBySameUser(res.data.morePostsBySameUser);

        setLng(res.data.singleHomeRentalPost.longitude);
        setLat(res.data.singleHomeRentalPost.latitude);
      }
    } catch (error: any) {
      console.log(error);
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

  useEffect(() => {
    loadSinglePostDetails();
  }, [slug]);

  return (
    <HomePageLayout>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            {/* TO show post details title and des */}

            <CardLayout>
              <h5> {homeRentSinglePost?.title}</h5>
              <p>{homeRentSinglePost?.des}</p>
            </CardLayout>

            {/* TO show post details info */}

            <CardLayout>
              <h5> City:{homeRentSinglePost?.city}</h5>
              <p>Rooms:{homeRentSinglePost?.rooms}</p>
              <p>Rent:{homeRentSinglePost?.rentAmount}.Eur Per-Month</p>
            </CardLayout>

            {/* //////////////////////////////////////////////////////////////////////// */}
            {/* ////                       To show Map Marker                   /////// */}
            {/* //////////////////////////////////////////////////////////////////////// */}

            <CardLayout>
              <Map
                mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
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
            <div className="row">
              {homeRentMorePostsByCategory &&
                homeRentMorePostsByCategory.map((item) => (
                  <div className="col-xl-8 col-lg-8">
                    <HomeRentPostCard homerental_post={item} />
                  </div>
                ))}
            </div>

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
