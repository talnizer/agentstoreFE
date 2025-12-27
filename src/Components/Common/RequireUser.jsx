import { Navigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";
import RolesConstants from "../../constants/RolesConstants";
import PathConstants from "../../routes/PathConstants";

export default function RequireUser({ children }) {
  const { user } = AuthUser();
  const prevLocation = useLocation();
  var authed = user ? true : false;
  var isUser = authed
    // && user.role === RolesConstants.USER 
    ? true : false;
  return isUser === true ? (
    children
  ) : authed ? (
    <Navigate to={PathConstants.HOME} replace />
  ) : (
    <Navigate
      to={PathConstants.LOGIN}
      state={{ redirectTo: prevLocation }}
      replace
    />
  );
}
