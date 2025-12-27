import { Link, useLocation } from "react-router-dom";
import "../../styles/Header.css";
import PathConstants from "../../routes/PathConstants";
import AuthUser from "./AuthUser";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useState } from "react";
import RolesConstants from "../../constants/RolesConstants";
import AppConfig from "../../config/AppConfig";

export default function Header(props) {
  const { logout, user, profileImage } = AuthUser();
  const location = useLocation();
  const [openBasic, setOpenBasic] = useState(false);
  const [collapseNavBar, setCollapseNavBar] = useState(true);
  const logoutUser = () => {
    setCollapseNavBar(true);
    setOpenBasic(!openBasic);
    logout();
    // }
  };

  return (
    <header>
      <div className="App">
        {/* {" "} */}
        {/* <header className="App-header"> */}
        {/* <ListCabsComponent /> */}
        {/* <CreateUpdateRideComponent /> */} {/* </header>{" "} */}
        <div className="border-bottom">
          <MDBNavbar expand="md" light bgColor="1light" className="px-3 1fixed-top 1sticky-top">
            <MDBContainer fluid>
              <MDBNavbarBrand href={PathConstants.HOME} className="align-self-center font-weight-bold app-text-color"
                // className="nav-link "
                onClick={() => setCollapseNavBar(true)}
              >
                {/* {AppConfig.APP_NAME} */}
                <img src="/logo.jpg" alt="logo"
                  style={{ width: "35px", height: "35px" }}
                  className="rounded-circle" />
                {/* </Link> */}
              </MDBNavbarBrand>


              {/* <MDBNavbarToggler  */}
              <div
                className="p-2 border-0"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                // onClick={() => setOpenBasic(!openBasic)}
                onClick={() => setCollapseNavBar(!collapseNavBar)}
              >
                {/* <MDBIcon icon="bars" fas /> */}
                <span className="1navbar-toggler-icon">
                  <img
                    src={profileImage ? window.location.protocol + "//" +
                      window.location.hostname + profileImage : "/avatar.jpg"}
                    alt="avatar"
                    style={{ width: "35px", height: "35px" }}
                    className="rounded-circle"
                  />
                </span>
                {/* </MDBNavbarToggler> */}
              </div>

              <MDBCollapse navbar open={!collapseNavBar}>
                <MDBNavbarNav className="text-left mr-auto 1mb-2 mb-lg-0">
                  {!props.isGuest && user && (
                    <div className="align-self-center">
                      <div className="inactive 1d-flex text-warning 1justify-content-left">
                        {/* <img
                          src="/avatar.jpg"
                          alt=""
                          style={{ width: "35px", height: "35px" }}
                          className="rounded-circle"
                        /> */}
                        <div className="app-text-color p-0">{"Hi " + (user.name)}</div>
                      </div>
                    </div>
                  )}
                  <li
                    className={
                      location.pathname === PathConstants.HOME
                        ? "active"
                        : "inactive"
                    }
                  >
                    <Link
                      className="nav-link"
                      to={PathConstants.HOME}
                      // onClick={() => setOpenBasic(!openBasic)}
                      onClick={() => setCollapseNavBar(true)}
                    >
                      Home
                    </Link>
                  </li>
                  {props.isGuest && (
                    <li
                      className={
                        location.pathname === PathConstants.LOGIN
                          ? "active"
                          : "inactive"
                      }
                    >
                      <Link
                        className="nav-link"
                        to={PathConstants.LOGIN}
                        // onClick={() => setOpenBasic(!openBasic)}
                        onClick={() => setCollapseNavBar(true)}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                  {props.isGuest && (
                    <li
                      className={
                        location.pathname === PathConstants.REGISTER
                          ? "active"
                          : "inactive"
                      }
                    >
                      <Link
                        className="nav-link"
                        to={PathConstants.REGISTER}
                        // onClick={() => setOpenBasic(!openBasic)}
                        onClick={() => setCollapseNavBar(true)}
                      >
                        Register
                      </Link>
                    </li>
                  )}
                  {/* {!props.isGuest && user?.role !== RolesConstants.USER && (
                    <li
                      className={
                        location.pathname === PathConstants.DASHBOARD || location.pathname?.startsWith(PathConstants.DASHBOARD)
                          ? "active"
                          : "inactive"
                      }
                    >
                      <Link
                        className="nav-link"
                        to={PathConstants.DASHBOARD}
                        // onClick={() => setOpenBasic(!openBasic)}
                        onClick={() => setCollapseNavBar(true)}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )} */}
                  {!props.isGuest &&
                    // user?.role === RolesConstants.USER && 
                    (
                      <li
                        className={
                          location.pathname === PathConstants.USER_PROFILE
                            ? "active"
                            : "inactive"
                        }
                      >
                        <Link
                          className="nav-link"
                          to={PathConstants.USER_PROFILE}
                          // onClick={() => setOpenBasic(!openBasic)}
                          onClick={() => setCollapseNavBar(true)}
                        >
                          Profile
                        </Link>
                      </li>
                    )}
                  {!props.isGuest && user?.role === RolesConstants.USER && (
                    <li
                      className={
                        location.pathname === PathConstants.ACCOUNT || location.pathname?.startsWith(PathConstants.ACCOUNT)
                          ? "active"
                          : "inactive"
                      }
                    >
                      <Link
                        className="nav-link"
                        to={PathConstants.ACCOUNT}
                        // onClick={() => setOpenBasic(!openBasic)}
                        onClick={() => setCollapseNavBar(true)}
                      >
                        Account
                      </Link>
                    </li>
                  )}
                  {!props.isGuest && (
                    <li>
                      <Link className="nav-link" onClick={logoutUser}>
                        Logout
                      </Link>
                    </li>
                  )}
                  <li
                    className={
                      location.pathname === PathConstants.CONTACT
                        ? "active"
                        : "inactive"
                    }
                  >
                    <Link
                      className="nav-link"
                      to={PathConstants.CONTACT}
                      // onClick={() => setOpenBasic(!openBasic)}
                      onClick={() => setCollapseNavBar(true)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  {/* <li
                    className={
                      location.pathname === PathConstants.ABOUT
                        ? "active"
                        : "inactive"
                    }
                  >
                    <Link
                      className="nav-link"
                      to={PathConstants.ABOUT}
                      // onClick={() => setOpenBasic(!openBasic)}
                      onClick={() => setCollapseNavBar(true)}
                    >
                      About Us
                    </Link>
                  </li> */}
                  {/* <li
                    className={
                      location.pathname === PathConstants.COTRAVEL_CREATE_QUERY
                        ? "active"
                        : "inactive"
                    }
                  >
                    <Link
                      className="nav-link text-warning"
                      to={PathConstants.COTRAVEL_CREATE_QUERY}
                      onClick={() => setOpenBasic(!openBasic)}
                    >
                      Raise Travel Query
                    </Link>
                  </li>*/}
                </MDBNavbarNav>
                {/* 
                <form className="d-flex input-group w-auto">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Type query"
                    aria-label="Search"
                  />
                  <MDBBtn color="primary">Search</MDBBtn>
                </form> */}
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>
      </div>
    </header>
  );
}
