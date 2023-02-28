import { FC } from "react";
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";

import { HomeRentPostsProps } from "../../services/DataProvider";
import LocationMapCard from "./LocationMapCard";

interface LocationMapProps {
  homeRentalLocation: HomeRentPostsProps[];
}

const LocationMap: FC<LocationMapProps> = ({ homeRentalLocation }) => {
  const GERMANY_BOUNDS: [[number, number], [number, number]] = [
    [3, 40],
    [16, 56],
  ];

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoieWF6ZGFuaTExIiwiYSI6ImNsZHhpM2lhbDBnemIzcW52ejg0ejJ2bjAifQ.2NW_EeCxlel8wvBzyjybVQ"
      style={{
        height: "750px",
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
      {homeRentalLocation &&
        homeRentalLocation.map((item) => (
          <LocationMapCard home_rental_location={item} key={item._id} />
        ))}

      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <GeolocateControl />
    </Map>
  );
};

export default LocationMap;
