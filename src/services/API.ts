import axios from "axios";

import { API_URL, headerConfig } from "./Configaration";

/****************************************/
/*********  User Auth       *************/
/****************************************/

export interface UserRegistrationProps {
  name: string;
  email: string;
  password: string;
}

export const createUserRegistration = async (props: UserRegistrationProps) => {
  const res = await axios.post(API_URL + "/registration", { ...props });
  return res;
};

export interface UserLoginProps {
  email: string;
  password: string;
}

export const createUserLogin = async (props: UserLoginProps) => {
  const res = await axios.post(API_URL + "/login", { ...props });
  return res;
};

/****************************************/
/*********  Home Rent Post  *************/
/****************************************/

export const getAllHomeRentPosts = async () => {
  const res = await axios.get(API_URL + "/getall-home-rent-post");
  return res;
};

export const getSingleHomeRentPost = async (slug: string) => {
  const res = await axios.get(API_URL + "/home-rental-details-post/" + slug);
  return res;
};

/****************************************/
/********* User Profile Page *************/
/****************************************/

export const getUserProfile = async (slug: string) => {
  const res = await axios.get(API_URL + "/user-public-profile/" + slug);
  return res;
};

export const getAllUserLists = async () => {
  const res = await axios.get(API_URL + "/alluser");
  return res;
};

/****************************************/
/*********Subscriber dashboard **********/
/****************************************/

export const getLogedInUserPosts = async () => {
  const res = await axios.get(
    API_URL + "/get-single-user-posts",
    headerConfig()
  );
  return res;
};

/****************************************/
/*********User Role For Admin Site ******/
/****************************************/

export const getUserRoleForAdmin = async () => {
  const res = await axios.get(API_URL + "/current-user-role", headerConfig());
  return res;
};
