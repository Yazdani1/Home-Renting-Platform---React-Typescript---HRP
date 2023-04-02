import { useContext, useState, useEffect } from "react";

import HomePageLayout from "../../layouts/HomePageLayout";
import style from "./HomeRentPost.module.scss";
import HomeRentPost from "./HomeRentPost";
import LocationMap from "./LocationMap";
import { HomeRentAllPostsContext } from "../../contextapi/HomeRentAllPostsContext";
import { CategoryContext } from "../../contextapi/CategoryContext";

import { searchHomeRentPosts, getAllHomeRentPosts } from "../../services/API";
import CardLayout from "../../components/CardLayout/CardLayout";
import { HomeRentPostsProps, CategoryProps } from "../../services/DataProvider";
import SkeltonMap from "../../components/Skelton/SkeltonMap";

const Home = () => {
  /****************************************/
  /*********Get Home Rent Posts ***********/
  /****************************************/

  // context api

  const allHomeRentPosts = useContext(HomeRentAllPostsContext);
  const allCategory = useContext<CategoryProps[]>(CategoryContext);

  /****************************************/
  /*********Search Posts       ************/
  /****************************************/

  // To select and deselect category from checkbox

  // To select and deselect category from checkbox to search

  const [categoryId, setCategoryId] = useState<any>([]);

  const selectCatId = (catid: string) => {
    const selectedCateogryID = [...categoryId];
    const index = selectedCateogryID.indexOf(catid);
    if (index === -1) {
      selectedCateogryID.push(catid);
    } else {
      selectedCateogryID.splice(index, 1);
    }
    setCategoryId(selectedCateogryID);
  };

  const selectCategorySearch = () => {
    setShowCategory(false);
    searhPosts();
  };

  // To store search result in the empty array state
  const [searchedValueHomeRent, setSearchedValueHomeRent] = useState<
    HomeRentPostsProps[]
  >([]);

  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("99999");
  const [rooms, setRooms] = useState<string>("");

  const searhPosts = async () => {
    try {
      const res = await searchHomeRentPosts(min, max, categoryId, rooms);

      if (res) {
        setSearchedValueHomeRent(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // To show category list for search when user click on the button a dropdown will show with category option

  const [showCategory, setShowCategory] = useState<boolean>(false);

  const handleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  // To show the search result without button click need to use useEffect

  useEffect(() => {
    searhPosts();
  }, [min, max, rooms]);

  // To show the loading skelton if data is not loaded yet

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (allHomeRentPosts && allHomeRentPosts.length > 0) {
      setIsLoading(false);
    }
  }, [allHomeRentPosts]);

  /**
   * To add tab title for this page
   */

  useEffect(() => {
    document.title = `Home Rental Platform`;
  }, []);

  return (
    <HomePageLayout>
      {/* //////////////////////////////////////////////////////////////////////// */}
      {/* ////                       To add search option                  /////// */}
      {/* //////////////////////////////////////////////////////////////////////// */}

      <div className="container">
        {/* <CardLayout>

          <div className={style.searchContainer}>
            <div className={style.searchInput}>
              <input
                type="number"
                value={min}
                placeholder="min amount"
                onChange={(e) => setMin(e.target.value)}
              />
            </div>
            <div className={style.searchInput}>
              <input
                type="number"
                value={max}
                placeholder="max amount"
                onChange={(e) => setMax(e.target.value)}
              />
            </div>

            <div className={style.searchInput}>
              <input
                type="number"
                value={rooms}
                placeholder="rooms"
                onChange={(e) => setRooms(e.target.value)}
              />
            </div>

            <div className={style.searchInput}>
              <input
                type="number"
                value={rooms}
                placeholder="city"
                onChange={(e) => setRooms(e.target.value)}
              />
            </div>

            <div className={style.dropdown}>
              <button className="btn btn-primary" onClick={handleShowCategory}>
                Select Category {categoryId.length > 0 && categoryId.length}
              </button>

              {showCategory && (
                <div className={style.dropdownContent}>
                  <CardLayout>
                    {allCategory &&
                      allCategory.map((item) => (
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => selectCatId(item._id)}
                            />
                            {item.categoryName}
                          </label>
                        </div>
                      ))}

                    <button
                      className="btn btn-primary"
                      onClick={selectCategorySearch}
                    >
                      Select {categoryId.length}
                    </button>
                  </CardLayout>
                </div>
              )}
            </div>

            <button className="btn btn-success" onClick={searhPosts}>
              Search
            </button>
          </div>

        </CardLayout>
         */}
      </div>

      <div className="row">
        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* ////                       To show home rent posts               /////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          <div className={style.homeRentPostContainer}>
            {/* Here i am sending the data - if user searched the any data then searched value will be show else 
            all the result from context api */}
            <HomeRentPost
              allHomeRentPosts={
                searchedValueHomeRent.length > 0
                  ? searchedValueHomeRent
                  : allHomeRentPosts
              }
            />
          </div>
        </div>

        {/* //////////////////////////////////////////////////////////////////////// */}
        {/* ////                       To show map posts              ////////////// */}
        {/* //////////////////////////////////////////////////////////////////////// */}

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
          {/* //////////////////////////////////////////////////////////////////////// */}
          {/* ////                       To show skelton                   /////////// */}
          {/* //////////////////////////////////////////////////////////////////////// */}

          {isLoading && (
            <div>
              <SkeltonMap />
            </div>
          )}

          {!isLoading && (
            <LocationMap
              homeRentalLocation={
                searchedValueHomeRent.length > 0
                  ? searchedValueHomeRent
                  : allHomeRentPosts
              }
            />
          )}
        </div>
      </div>
    </HomePageLayout>
  );
};

export default Home;
