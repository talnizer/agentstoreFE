import "../styles/Page404.css";
import { Link } from "react-router-dom";

export default function Page403() {
  return (
    <div className="page-403">
      <h1 className="title">403 - Unauthorised</h1>
      <p className="not-found-message">You do not have access to this page</p>
      <Link to="/" className={"back-to-home"}>
        Back to Home
      </Link>
    </div>
  );
}
