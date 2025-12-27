import React from "react";
import PathConstants from "./PathConstants";
import RequireAuth from "../Components/Common/RequireAuth";
import Page403 from "../pages/Page403";
import UserAccount from "../Components/user/UserAccount";
import EmailVerify from "../Components/user/EmailVerify";
import EditProfile from "../Components/user/EditProfile";
import ForgotPassword from "../Components/user/ForgotPassword";
import RequireUser from "../Components/Common/RequireUser";
import ContactUs from "../pages/ContactUs";
import RequireAdmin from "../Components/Common/RequireAdmin";
import AdminPenal from "../Components/Admin/AdminPenal";
import UserProfile from "../Components/user/UserProfile";
import UserAccountSideBar from "../Components/user/UserAccountSideBar";
import TabConstants from "./TabConstants";
import AboutRestaurant from "../pages/AboutRestaurant";
import PhoneVerify from "../Components/user/PhoneVerify";
import Page404 from "../pages/Page404";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Register from "../Components/SocialPosting/Register";
import Login from "../Components/user/Login";
import SocialConnect from "../Components/SocialPosting/SocialConnect";
import Home from "../Components/SocialPosting/Home";

// const Home = React.lazy(() => import("../pages/Home"));
// const Team = React.lazy(() => import("../pages/Team"));
// const Portfolio = React.lazy(() => import("../pages/Portfolio"));
const About = React.lazy(() => import("../pages/About"));
// const requestConstants = RequestConstants();
const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.LOGIN, element: <Login /> },
  { path: PathConstants.REGISTER, element: <Register /> },
  // { path: PathConstants.DASHBOARD, element: <Home /> },
  { path: PathConstants.PRIVACY, element: <SocialConnect /> },


  {
    path: PathConstants.ACCOUNT,
    element: (
      <RequireUser>
        <UserAccount />
      </RequireUser>
    ),
  },
  {
    path: PathConstants.USER_PROFILE,
    element: (
      <RequireUser>
        {/* <UserAccountSideBar activeTab={TabConstants.USER_PROFILE} /> */}
        <UserProfile />
      </RequireUser>
    ),
  },
  {
    path: PathConstants.ACCOUNT_PROFILE + "/:id",
    element: (
      <RequireAuth>
        <UserProfile />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.USER_PROFILE + "/:id",
    element: (
      <RequireAuth>
        <UserProfile />
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.EMAIL_VERIFY,
    element: (
      <EmailVerify />
    ),
  },
  {
    path: PathConstants.PHONE_VERIFY,
    element: (
      <PhoneVerify />
    ),
  },
  {
    path: PathConstants.EDIT_PROFILE,
    element: (
      <RequireAuth>
        {" "}
        <EditProfile />{" "}
      </RequireAuth>
    ),
  },
  {
    path: PathConstants.ADMIN_PENAL,
    element: (
      <RequireAdmin>
        {" "}
        <AdminPenal />{" "}
      </RequireAdmin>
    ),
  },
  //////Employee stuffs///////
  {
    path: PathConstants.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },

  { path: PathConstants.ABOUT, element: <About /> },
  { path: PathConstants.ABOUT_RESTAURANT, element: <AboutRestaurant /> },
  { path: PathConstants.CONTACT, element: <ContactUs /> },
  { path: PathConstants.PAGE403, element: <Page403 /> },
  { path: PathConstants.PAGE404, element: <Page404 /> },

  // AI Pages Start //
  //   // AI Pages End

];
export default routes;
