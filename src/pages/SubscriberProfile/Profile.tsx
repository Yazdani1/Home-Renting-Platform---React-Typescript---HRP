import { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";

import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import CardLayout from "../../components/CardLayout/CardLayout";
import style from "./Profile.module.scss";
import TextField from "../../components/Input/TextField";
import ModalBox from "../../components/Modal/ModalBox";
import {
  UpdateSingleUserProfileProps,
  updateSingleUserProfile,
} from "../../services/API";
import { useUserContext } from "../../contextapi/UserContextCookies";

const Profile = () => {

  // Context api cookies
  const { user, setUser } = useUserContext();

  /****************************************/
  /******  To Open Modal Box     **********/
  /****************************************/
  const [open, setOpen] = useState<boolean>(false);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  /****************************************/
  /******  To Update User Profile    ******/
  /****************************************/

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");

  const onSubmitUpdateProfile = async () => {
    try {
      const payload: UpdateSingleUserProfileProps = {
        name: name,
        email: email,
        profilepic: profilePic,
      };

      const res = await updateSingleUserProfile(user?._id!, payload);
      if (res) {
        toast.success("Successfully Updated Profile", {
          position: toast.POSITION.TOP_CENTER,
        });

        //Context api cookies to update user info after edit
        setUser(res.data?.user);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setName(user?.name!);
    setEmail(user?.email!);
    setProfilePic(user?.profilepic!);
  }, [user]);


  return (
    <SubscriberPageLayout>
      <CardLayout>
        <div className={style.profileContainer}>
          {/*  To show profile picture and if user did not add any profile picture then an avatar will be shown here */}
          <div>
            {user?.profilepic ? (
              <div className={style.profilePicture}>
                <img src={user?.profilepic} />
              </div>
            ) : (
              <div className={style.profilePictureAvatar}>
                <p className={style.profilePictureIcon}>
                  <CgProfile size={80} />
                </p>
              </div>
            )}
          </div>

          <div className={style.profileDetails}>
            <h5>Account Details</h5>
            <h6>Name: {user?._id}</h6>
            <h6>Name: {user?.name}</h6>
            <h6>E-mail: {user?.email}</h6>
            <h6>Role: {user?.role}</h6>
            <h6>Joined: {user?.date}</h6>
          </div>

          <div className={style.editIcon} onClick={onOpenModal}>
            <CiEdit size={35} color="green" />
          </div>
        </div>
      </CardLayout>

      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* ////             Modal Box to Update User Profile                /////// */}
      {/* //////////////////////////////////////////////////////////////////////// */}

      {/* To update user info - Modal Box */}

      <ModalBox
        open={open}
        onCloseModal={onCloseModal}
        onSaveButton={onSubmitUpdateProfile}
        title="Update Profile"
        showButton
      >
        <TextField
          label="Name"
          placeholder="name"
          value={name}
          setValue={setName}
        />

        <TextField
          label="E-mail"
          placeholder="name"
          value={email}
          setValue={setEmail}
        />

        <TextField
          label="Profile Picutre"
          placeholder="name"
          value={profilePic}
          setValue={setProfilePic}
        />
      </ModalBox>
    </SubscriberPageLayout>
  );
};

export default Profile;
