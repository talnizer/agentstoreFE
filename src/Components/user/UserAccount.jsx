import AuthUser from "../Common/AuthUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserProfile from "./UserProfile";
import RolesConstants from "../../constants/RolesConstants";
import UserAccountSideBar from "./UserAccountSideBar";

export default function UserAccount() {
  const PROFILE = "P";
  const { user } = AuthUser();
  const location = useLocation();
  let profile =
    location.state && location.state.user_id ? location.state : null;
  const [showElement, setShowElement] = useState(PROFILE);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadProfile = () => {
    handleClose();
    setShowElement(PROFILE);
  };

  return (
    <div className="container1" id="main">
      <UserAccountSideBar></UserAccountSideBar>
      {showElement === PROFILE &&
        <UserProfile profile={profile}></UserProfile>}
    </div>
  );
}
