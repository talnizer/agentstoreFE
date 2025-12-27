import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../routes/PathConstants";
import api from "../../config/Api";
import AuthService from "../../Services/AuthService";
import useService from "../../hooks/useService";
import { throwError } from "rxjs";
import { toast } from "react-toastify";
import RolesConstants from "../../constants/RolesConstants";

export default function AuthUser() {
  const navigate = useNavigate();

  const authService = useService(AuthService);

  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      return null;
    }
    const userToken = JSON.parse(tokenString);
    // const userToken = tokenString;
    return userToken;
    // }
    // return null;
  };

  const getUser = () => {
    const userString = localStorage.getItem("user");
    const userDetail = JSON.parse(userString);
    return userDetail;
  };
  const getProfileImage = () => {
    return JSON.parse(localStorage.getItem("profileImage"));
  }
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [authed, setAuthed] = useState(false);
  const [profileImage, setProfileImage] = useState(getProfileImage());

  const saveToken = (user, token) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
    setAuthed(true);
    api.setAuthToken(token);
    // navigate(PathConstants.DASHBOARD);
  };
  const logout = () => {
    // alert("hi");
    //TODO: make api call to logout first
    toast.dismiss();
    toast.info("Logging Out...");
    let role = user?.role;
    authService.logout().subscribe({
      next: response => {
        if (response.status !== 0) {
          toast.dismiss();
          toast.success(response.message);
          localStorage.clear();

          // if (role in RolesConstants.empRolesNames) {
          //   navigate(PathConstants.EMPLOYEE_LOGIN);
          // } else {
          //   navigate(PathConstants.LOGIN);
          // }

          // window.location.reload();
        } else if (response.responseCode === 403) {
          localStorage.clear();
          toast.dismiss();
          toast.success("Logged out");
        }
      },
      error: err => {
        if (err.responseCode === 403) {
          localStorage.clear();
        } else {
          toast.dismiss();
          toast.error(err?.message);
          return throwError(() => err);
        }
      },
      complete: () => {
        // window.location.reload();
        // navigate(PathConstants.LOGIN);
        window.location.href = PathConstants.LOGIN;
      }

    });
  };

  const isAdmin = () => {
    if (user && user.role === RolesConstants.ADMIN) {
      return true;
    }
    return false;
  };
  const isStore = () => {
    if (user && user.role === RolesConstants.OPERATOR) {
      return true;
    }
    return false;
  };
  const isUser = () => {
    if (user && user.role === RolesConstants.RIDER) {
      return true;
    }
    return false;
  };
  const updateProfileImage = (image) => {
    localStorage.setItem("profileImage", JSON.stringify(image));
    setProfileImage(image);
  }

  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    logout,
    authed,
    isAdmin,
    isStore,
    isUser,
    updateProfileImage,
    profileImage
  };
}
