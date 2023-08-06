import React, { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

import style from "./SubscriberDashboard.module.scss";
import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";
import { CategoryContext } from "../../contextapi/CategoryContext";

import {
  HomeRentPostsProps,
  VisibilityTypes,
} from "../../services/DataProvider";
import { getLogedInUserPosts } from "../../services/API";
import HomeRentPostCard from "../Home/HomeRentPostCard";
import CardLayout from "../../components/CardLayout/CardLayout";
import ModalBox from "../../components/Modal/ModalBox";
import TextField from "../../components/Input/TextField";
import {
  CreateHomeRentalPostsProps,
  createHomeRentalPosts,
} from "../../services/API";
import SubscriberDashboardPostCard from "./SubscriberDashboardPostCard";
import DashboardCardLayout from "../../components/CardLayout/DashboardCardLayout";
import DropDownSelector from "../../components/Input/DropDownSelector";
import DropdownCategory from "../../components/Input/DropdownCategory";
import { useUserContext } from "../../contextapi/UserContextCookies";



const SubscriberDashboard = () => {

  // user context api
  const allCategory = useContext(CategoryContext);
  
  // Context api cookies
  const { user, setUser } = useUserContext();

  /****************************************/
  /*********Get Loged In User Posts********/
  /****************************************/

  const [userAllHomeRentPosts, setUserAllHomeRentPosts] = useState<
    HomeRentPostsProps[]
  >([]);

  const loadLogedInUserPosts = async () => {
    try {
      const res = await getLogedInUserPosts();

      if (res) {
        setUserAllHomeRentPosts(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ///////  To open modal box         ///////////////////
  //////////////////////////////////////////////////////

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  /****************************************/
  /********* To create a new add   ********/
  /****************************************/

  const [title, setTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [rentAmount, setRentAmount] = useState<string>("");
  const [photo, setPhoto] = useState<string[]>([
    "https://images.pexels.com/photos/909819/pexels-photo-909819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/4734932/pexels-photo-4734932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/5869159/pexels-photo-5869159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ]);
  const [city, setCity] = useState<string>("");
  const [rooms, setRooms] = useState<string>("");
  const [visibility, setVisibility] = useState<VisibilityTypes>(
    VisibilityTypes.Public
  );
  const [rented, setRented] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  useEffect(() => {
    if (allCategory.length > 0) {
      setCategory(allCategory[0]._id);
    }
  }, [allCategory]);

  const onSubmitCreateAdd = async () => {
    try {
      const payload: CreateHomeRentalPostsProps = {
        title: title,
        des: des,
        rentAmount: parseInt(rentAmount),
        photo: photo,
        city: city,
        rooms: parseInt(rooms),
        visibility: visibility,
        rented: rented,
        categoryBy: category,
        latitude: parseFloat(latitude!),
        longitude: parseFloat(longitude!),
      };

      const res = await createHomeRentalPosts(payload);

      if (res) {
        loadLogedInUserPosts();
        toast.success("Created successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadLogedInUserPosts();
  }, []);

  return (
    <SubscriberPageLayout>
      <div className="container-fluid">
        <DashboardCardLayout>

          <h6>
            Last loged in:
            {moment(user?.lastlogintime).format(
              "MMM Do YY, h:mm:ss a"
            )}
          </h6>
          <h6>
            Date:
            {moment(user?.date).format("MMM Do YY")}
          </h6>
        </DashboardCardLayout>

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* ////                   To add new posts                ///////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}

        <DashboardCardLayout
          title="Create add"
          showAddIcon={true}
          openModal={handleOpenModal}
        >
          <ModalBox
            title="Create a new add"
            open={openModal}
            onCloseModal={handleCloseModal}
            showButton
            onSaveButton={onSubmitCreateAdd}
          >
            <TextField
              label="Title"
              placeholder="title..."
              value={title}
              setValue={setTitle}
            />

            <div className={style.city_room_raw}>
              <TextField
                label="City"
                placeholder="city..."
                value={city}
                setValue={setCity}
              />
              <TextField
                label="Rooms"
                placeholder="rooms..."
                value={rooms}
                setValue={setRooms}
              />

              <TextField
                label="Rent amount"
                placeholder="amount..."
                value={rentAmount}
                setValue={setRentAmount}
              />
            </div>

            <div className={style.lat_long_row}>
              <TextField
                label="Latitude"
                placeholder="latitude..."
                value={latitude}
                setValue={setLatitude}
              />
              <TextField
                label="Longitude"
                placeholder="longitude..."
                value={longitude}
                setValue={setLongitude}
              />
            </div>

            <DropDownSelector
              label="Visibility"
              value={visibility}
              setValue={setVisibility}
              data={Object.values(VisibilityTypes)}
            />
            <DropdownCategory
              label="Category"
              value={category}
              setValue={setCategory}
              data={allCategory}
            />

            <TextField
              label="Description"
              placeholder="description..."
              value={des}
              setValue={setDes}
            />
          </ModalBox>
        </DashboardCardLayout>

        <DashboardCardLayout>
          <HomeRentalPostsListRow />
        </DashboardCardLayout>
        {/* To show all the posts */}

        {userAllHomeRentPosts &&
          userAllHomeRentPosts.map((item) => (
            <SubscriberDashboardPostCard homeRentalPosts={item} />
          ))}
      </div>
    </SubscriberPageLayout>
  );
};

export default SubscriberDashboard;

const HomeRentalPostsListRow = () => {
  return (
    <div className={style.header_row_items}>
      <p>Photos</p>

      <p>Title</p>
      <p>City</p>
      <p>Rent Amount</p>
      <p>Category</p>
      <p>Rooms</p>
      <p>Visibility</p>
      <p>Published on</p>
    </div>
  );
};
