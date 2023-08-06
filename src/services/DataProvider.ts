interface IBase {
  _id: string;
  slug: string;
  date: string;
}

/****************************************/
/*********       User             *******/
/****************************************/

export interface UserProfileDetailsProps extends IBase {
  name: string;
  role: string;
  profilepic: string;
  email: string;
  lastlogintime: string;
}

/****************************************/
/*********       Category          ******/
/****************************************/

export interface Category extends IBase {
  categoryName: string;
  postedBy: UserProfileDetailsProps;
}

/****************************************/
/*********  Home Rent Posts        ******/
/****************************************/

export enum VisibilityTypes {
  Public = "Public",
  Private = "Private",
}

export interface HomeRentPostsProps extends IBase {
  title: string;
  des: string;
  rentAmount: number;
  photo: [];
  city: string;
  rooms: number;
  visibility: string;
  rented: boolean;
  categoryBy: Category;
  postedBy: UserProfileDetailsProps;
  latitude: number;
  longitude: number;
}

/****************************************/
/*********   Select Login Tab     ******/
/****************************************/

export enum SelectLogInRegistration {
  LOGIN = "LOGIN",
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
}

/****************************************/
/*********  Photo Library   *************/
/****************************************/

export interface PhotoLibraryProps extends IBase {
  imageurl: string;
  postedBy: UserProfileDetailsProps;
}
