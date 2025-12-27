import { Navigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";

export default function RequireAuth({ children }) {
  const { getToken } = AuthUser();
  const prevLocation = useLocation();

  var authed = getToken() ? true : false;
  var navigateTo = "/login";
  return authed === true ? (
    children
  ) : (
    <Navigate to={navigateTo} state={{ redirectTo: prevLocation }} replace />
  );
}
