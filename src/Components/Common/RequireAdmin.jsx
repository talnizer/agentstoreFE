import { Navigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";
import RolesConstants from "../../constants/RolesConstants";
import PathConstants from "../../routes/PathConstants";

export default function RequireAdmin({ children }) {
  const { user } = AuthUser();
  const prevLocation = useLocation();
  var authed = user ? true : false;
  var isAdmin = authed && user.role === RolesConstants.ADMIN ? true : false;
  return isAdmin === true ? (
    children
  ) : authed ? (
    <Navigate to={PathConstants.HOME} replace />
  ) : (
    <Navigate
      to={PathConstants.HOME}
      state={{ redirectTo: prevLocation }}
      replace
    />
  );
}
