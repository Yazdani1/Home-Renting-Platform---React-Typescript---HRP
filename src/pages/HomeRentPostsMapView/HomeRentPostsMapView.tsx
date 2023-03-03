import { useContext } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


import HomePageLayout from "../../layouts/HomePageLayout";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";
import { HomeRentPostsProps } from "../../services/DataProvider";
import LocationMapCard from "../Home/LocationMapCard";

const HomeRentPostsMapView = () => {
  const allHomeRentPosts = useContext<HomeRentPostsProps[]>(
    HomeRentAllPostsContext
  );

  const GERMANY_BOUNDS: [[number, number], [number, number]] = [
    [3, 40],
    [16, 56],
  ];

  return (
    <HomePageLayout>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{
          height: "90vh",
          borderRadius: "10px",
        }}
        initialViewState={{
          longitude: 7.056497376136575,
          latitude: 51.83708176405757,
          zoom: 15,
          bounds: GERMANY_BOUNDS,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {allHomeRentPosts &&
          allHomeRentPosts.map((item) => (
            <LocationMapCard home_rental_location={item} key={item._id} />
          ))}

        <NavigationControl position="bottom-right" />
        <FullscreenControl />
        <GeolocateControl />
      </Map>
    </HomePageLayout>
  );
};

export default HomeRentPostsMapView;
