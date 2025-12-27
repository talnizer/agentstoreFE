import { Navigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";
import RolesConstants from "../../constants/RolesConstants";
import PathConstants from "../../routes/PathConstants";

export default function RerouteLoggedin({ children }) {
  const { user } = AuthUser();
  const prevLocation = useLocation();
  var authed = user ? true : false;
  var isUser = authed && user.role === RolesConstants.RIDER ? true : false;
  return isUser === true ? (
    <Navigate to={PathConstants.HOME} replace />
  ) : authed ? (
    <Navigate to={PathConstants.DASHBOARD} replace />
  ) : (
    children
  );
}
