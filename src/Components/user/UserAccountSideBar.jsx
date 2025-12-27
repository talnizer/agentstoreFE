import AuthUser from "../Common/AuthUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import PathConstants from "../../routes/PathConstants";
import TabConstants from "../../routes/TabConstants";

export default function UserAccountSideBar(props) {
  const navigate = useNavigate();
  const [showElement, setShowElement] = useState(props.activeTab ? props.activeTab : TabConstants.PROFILE);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadProfile = () => {
    handleClose();
    setShowElement(TabConstants.PROFILE);
    navigate(PathConstants.ACCOUNT_PROFILE);
  };

  const loadOrders = () => {
    handleClose();
    setShowElement(TabConstants.USER_ORDERS);
    navigate(PathConstants.ACCOUNT_ORDERS);
  };

  const loadTravelRequests = (type) => {
    handleClose();
    setShowElement(type);
    if (type) {

    } else {

    }
  };
  return (
    <div className="container1" id="main">
      <Offcanvas className="bg-dark" show={show} onHide={handleClose}>
        <Offcanvas.Header className="text-dark bg-warning1 app-bg-color" closeButton>
          <Offcanvas.Title className="1text-dark">My Account</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column sticky-top pl-0 mt-3">
            <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.PROFILE ? "nav-link text-primary" : "nav-link"
                }
                onClick={loadProfile}
                href="#"
              >
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.USER_ORDERS ? "nav-link text-primary" : "nav-link"
                }
                onClick={loadOrders}
                href="#"
              >
                Orders
              </a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="rounded-0 btn btn-dark" onClick={handleShow}>
        {">"}
      </div>
    </div>
  );
}
