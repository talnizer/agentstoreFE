import { Route, Routes } from "react-router-dom";
import AuthUser from "../Common/AuthUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import DashboardRide from "./DashboardRide";
import DashboardBooking from "./DashboardBooking";
import DashboardOverview from "./DashboardOverview";
import DashboardDriver from "./DashboardDriver";
import DashboardVehicle from "./DashboardVehicle";
import StoreProfile from "./StoreProfile";

export default function Dashboard() {
  const OVERVIEW = "O";
  const RIDE = "R";
  const BOOKING = "B";
  const DRIVER = "D";
  const VEHICLE = "V";
  const PROFILE = "P";
  const { user } = AuthUser();

  const [showElement, setShowElement] = useState(OVERVIEW);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const dashboardService = useService(DashboardService);

  const loadOverview = () => {
    handleClose();
    setShowElement(OVERVIEW);
  };

  const loadRideDashboard = () => {
    handleClose();
    setShowElement(RIDE);
  };
  const loadBookingDashboard = () => {
    handleClose();
    setShowElement(BOOKING);
  };
  const loadDriverDashboard = () => {
    handleClose();
    setShowElement(DRIVER);
  };
  const loadVehicleDashboard = () => {
    handleClose();
    setShowElement(VEHICLE);
  };
  const loadStoreProfile = () => {
    handleClose();
    setShowElement(PROFILE);
  };
  return (
    <div className="container1" id="main">
      <Offcanvas className="bg-dark" show={show} onHide={handleClose}>
        <Offcanvas.Header className="text-dark app-bg-color" closeButton>
          <Offcanvas.Title className="1text-dark">Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column sticky-top pl-0 mt-3">
            <li className="nav-item">
              <a className={"text-warning"} href="#">
                {user?.role}
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  showElement === OVERVIEW
                    ? "nav-link text-primary"
                    : "nav-link"
                }
                onClick={loadOverview}
                href="#"
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  showElement === RIDE ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={loadRideDashboard}
              >
                Rides
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  showElement === BOOKING ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={loadBookingDashboard}
              >
                Bookings
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  showElement === DRIVER ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={loadDriverDashboard}
              >
                Drivers
              </a>
            </li>

            <li className="nav-item">
              <a
                className={
                  showElement === VEHICLE ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={loadVehicleDashboard}
              >
                Vehicles
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  showElement === PROFILE ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={loadStoreProfile}
              >
                Profile
              </a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      {/* /////////////// */}
      {/* <div className="row1"> */}
      {/* {!show && ( */}
      <div className="rounded-0 btn btn-dark" onClick={handleShow}>
        {/* <FontAwesomeIcon
            className="h-25 text-white px-1"
            icon={faArrowRight}
          /> */}
        {">"}
      </div>
      {/* )} */}
      {/* <div className="col" id="main"> */}
      {showElement === OVERVIEW && <DashboardOverview></DashboardOverview>}
      {showElement === RIDE && <DashboardRide></DashboardRide>}
      {showElement === BOOKING && <DashboardBooking></DashboardBooking>}
      {showElement === DRIVER && <DashboardDriver></DashboardDriver>}
      {showElement === VEHICLE && <DashboardVehicle></DashboardVehicle>}
      {showElement === PROFILE && <StoreProfile></StoreProfile>}
      {/* </div> */}
    </div>
    // {/* </div> */}
  );
}
