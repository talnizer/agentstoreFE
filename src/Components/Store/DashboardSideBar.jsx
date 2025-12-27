import { Route, Routes } from "react-router-dom";
import AuthUser from "../Common/AuthUser";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import TabConstants from "../../routes/TabConstants";
import PathConstants from "../../routes/PathConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAnglesRight, faArrowAltCircleRight, faArrowRight, faArrowRightFromBracket, faArrowRightRotate, faNavicon } from "@fortawesome/free-solid-svg-icons";
import RolesConstants from "../../constants/RolesConstants";

export default function DashboardSideBar(props) {

  const { user } = AuthUser();
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(false);
  const [showElement, setShowElement] = useState();
  const [show, setShow] = useState(false);


  useEffect(() => {
    setShowElement(props.activeTab
      ? props.activeTab : TabConstants.DASHBOARD_OVERVIEW);
    if (user.role in RolesConstants.empRolesNames) {
      setIsEmployee(true);
    }
  }, [props])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const dashboardService = useService(DashboardService);

  const loadSideBarItem = (type) => {
    handleClose();
    setShowElement(type);
    if (type === TabConstants.DASHBOARD_OVERVIEW) {
      navigate(PathConstants.DASHBOARD_OVERVIEW);
    }
    else if (type === TabConstants.DASHBOARD_PROFILE) {
      navigate(PathConstants.DASHBOARD_PROFILE);
    }
    else if (type === TabConstants.DASHBOARD_MENU) {
      navigate(PathConstants.DASHBOARD_MENU);
    }
    else if (type === TabConstants.DASHBOARD_SETTINGS) {
      navigate(PathConstants.DASHBOARD_SETTINGS);
    } else if (type === TabConstants.DASHBOARD_FEEDBACKS) {
      navigate(PathConstants.DASHBOARD_FEEDBACKS);
    } else if (type === TabConstants.DASHBOARD_SUBSCRIPTIONS) {
      navigate(PathConstants.DASHBOARD_SUBSCRIPTIONS);
    } else if (type === TabConstants.DASHBOARD_ORDERS) {
      navigate(PathConstants.DASHBOARD_ORDERS);
    } else if (type === TabConstants.DASHBOARD_EMPLOYEES) {
      navigate(PathConstants.DASHBOARD_EMPLOYEES);
    }

  };

  function getRoleName(role) {
    if (role in RolesConstants.empRolesNames) {
      return RolesConstants.empRolesNames[role];
    } else {
      return role;
    }
  }
  return (
    <div className="container1" id="main">
      <Offcanvas className="bg-dark" show={show} onHide={handleClose}>
        <Offcanvas.Header className="text-dark app-bg-color" closeButton>
          <Offcanvas.Title className="1text-dark">Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column sticky-top pl-0 mt-3">
            <li className="nav-item">
              <a className="text-warning text-uppercase" href="#">
                {getRoleName(user.role)} {user?.uid ? " - " + user.uid : ""}
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.DASHBOARD_OVERVIEW
                    ? "nav-link text-primary"
                    : "nav-link"
                }
                onClick={() => loadSideBarItem(TabConstants.DASHBOARD_OVERVIEW)}
                href="#"
              >
                Overview
              </a>
            </li> */}
            <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.DASHBOARD_MENU ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={() => loadSideBarItem(TabConstants.DASHBOARD_MENU)}
              >
                My Menu
              </a>
            </li>
            {
              !isEmployee && <li className="nav-item">
                <a
                  className={
                    showElement === TabConstants.DASHBOARD_PROFILE ? "nav-link text-primary" : "nav-link"
                  }
                  href="#"
                  onClick={() => loadSideBarItem(TabConstants.DASHBOARD_PROFILE)}
                >
                  Profile
                </a>
              </li>
            }
            {
              !isEmployee && <li className="nav-item">
                <a
                  className={
                    showElement === TabConstants.DASHBOARD_SETTINGS ? "nav-link text-primary" : "nav-link"
                  }
                  href="#"
                  onClick={() => loadSideBarItem(TabConstants.DASHBOARD_SETTINGS)}
                >
                  Settings
                </a>
              </li>
            }
            {/* <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.DASHBOARD_SUBSCRIPTIONS ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={() => loadSideBarItem(TabConstants.DASHBOARD_SUBSCRIPTIONS)}
              >
                Subscriptions
              </a>
            </li> */}
            <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.DASHBOARD_ORDERS ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={() => loadSideBarItem(TabConstants.DASHBOARD_ORDERS)}
              >
                Orders
              </a>
            </li>
            {!isEmployee && <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.DASHBOARD_EMPLOYEES ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={() => loadSideBarItem(TabConstants.DASHBOARD_EMPLOYEES)}
              >
                Employees
              </a>
            </li>
            }
            <li className="nav-item">
              <a
                className={
                  showElement === TabConstants.DASHBOARD_FEEDBACKS ? "nav-link text-primary" : "nav-link"
                }
                href="#"
                onClick={() => loadSideBarItem(TabConstants.DASHBOARD_FEEDBACKS)}
              >
                Feedbacks
              </a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="rounded-0 btn 1btn-dark" onClick={handleShow}>
        {/* {">"} */}
        <FontAwesomeIcon size="2x" className="px-1" icon={faAngleRight} />
      </div>
    </div>
    // {/* </div> */}
  );
}
