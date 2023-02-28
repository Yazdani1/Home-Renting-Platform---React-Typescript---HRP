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
}

/****************************************/
/*********       Category          ******/
/****************************************/

export interface CategoryProps extends IBase {
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
  categoryBy: CategoryProps;
  postedBy: UserProfileDetailsProps;
  latitude: number;
  longitude: number;
}


/****************************************/
/*********   Select Login Tab     ******/
/****************************************/


export enum SelectLogInRegistration {

  LOGIN="LOGIN",
  CREATE_ACCOUNT="CREATE_ACCOUNT"

}


  /****************************************/
  /*********  Photo Library   *************/
  /****************************************/


  export interface PhotoLibraryProps extends IBase{
    imageurl: string,
    postedBy: UserProfileDetailsProps
  }

