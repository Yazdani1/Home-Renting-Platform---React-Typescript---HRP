import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
//Context API
import { HomeRentAllPostsProvider } from "./contextapi/HomeRentAllPostsContext";
import { AllUserListsProvider } from "./contextapi/AllUserListsContext";
import { CategoryProvider } from "./contextapi/CategoryContext";

import Home from "./pages/Home/Home";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import UserPublicProfile from "./pages/UserPublicProfile/UserPublicProfile";
import HomeRentListView from "./pages/HomeRentListView/HomeRentListView";
import HomeRentPostsMapView from "./pages/HomeRentPostsMapView/HomeRentPostsMapView";
import SecureLayout from "./layouts/SecureLayout";
import SubscriberDashboard from "./pages/SubscriberDashboard/SubscriberDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminSecureLayout from "./layouts/AdminSecureLayout";
import SubscriberPhotoLibrary from "./pages/SubscriberDashboard/PhotoLibrary/SubscriberPhotoLibrary";
import AllUserLists from "./pages/AllUserLists/AllUserLists";
import About from "./pages/About/About";
import Profile from "./pages/SubscriberProfile/Profile";
import { UserContextCookieProvider } from "./contextapi/UserContextCookies";

const App = () => {
  return (
    <UserContextCookieProvider>
      <CategoryProvider>
        <AllUserListsProvider>
          <HomeRentAllPostsProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/post-details/:slug"
                    element={<PostDetailsPage />}
                  />
                  <Route
                    path="/profile/:slug"
                    element={<UserPublicProfile />}
                  />
                  <Route path="/listview" element={<HomeRentListView />} />
                  <Route path="/mapview" element={<HomeRentPostsMapView />} />
                  <Route path="/alluser-lists" element={<AllUserLists />} />
                  <Route path="/about" element={<About />} />

                  {/* Protected route for subscriber*/}
                  <Route
                    path="/dashboard"
                    element={
                      <SecureLayout>
                        <SubscriberDashboard />
                      </SecureLayout>
                    }
                  />

                  <Route
                    path="/photo-library"
                    element={
                      <SecureLayout>
                        <SubscriberPhotoLibrary />
                      </SecureLayout>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <SecureLayout>
                        <Profile />
                      </SecureLayout>
                    }
                  />

                  {/* Protected route for Admin*/}

                  <Route
                    path="/admin-dashboard"
                    element={
                      <AdminSecureLayout>
                        <AdminDashboard />
                      </AdminSecureLayout>
                    }
                  />
                </Routes>
                <ToastContainer autoClose={8000} />
              </BrowserRouter>
          </HomeRentAllPostsProvider>
        </AllUserListsProvider>
      </CategoryProvider>
    </UserContextCookieProvider>
  );
};

export default App;
