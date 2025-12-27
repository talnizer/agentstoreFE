import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faFilter } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import SortByConstants from "../../constants/SortByConstants";

export default function SortDialog(props) {
  const [show, setShow] = useState(false);
  const [sortBy, setSortBy] = useState("PL");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleApply = sortByVal => {
    setSortBy(sortByVal);
    handleClose();
    props.sortBy(sortByVal);
  };
  return (
    <>
      {/* <FontAwesomeIcon icon={faCheckSquare} /> */}
      {/* <FontAwesomeIcon icon={faFacebook} /> */}
      {/* <FontAwesomeIcon icon={faTwitter} /> */}
      <Button className="btn btn-sm" variant="dark" onClick={handleShow}>
        <FontAwesomeIcon className="px-1" icon={faSort} />
        Sort
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sort</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container" id="general">
            <div
              className="row btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              {/* <div className="col"> */}
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
              // checked
              />
              <label
                onClick={event => handleApply(SortByConstants.PRICE_LOW)}
                className={
                  props?.currentSortBy === SortByConstants.PRICE_LOW
                    ? "mr-2 btn btn-dark"
                    : "mr-2 btn btn-outline-dark"
                }
                htmlFor="btnradio1"
              >
                Price - Lowest First
              </label>
              {/* </div> */}
              {/* <div className="col"> */}
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
              />
              <label
                onClick={event => handleApply(SortByConstants.FASTEST_FIRST)}
                className={
                  props?.currentSortBy === SortByConstants.FASTEST_FIRST
                    ? "mr-2 btn btn-dark"
                    : "mr-2 btn btn-outline-dark"
                }
                htmlFor="btnradio2"
              >
                Fastest First
              </label>
              {/* </div> */}
              {/* <div className="col"> */}
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
              />
              <label
                onClick={event => handleApply(SortByConstants.EARLIEST_FIRST)}
                className={
                  props?.currentSortBy === SortByConstants.EARLIEST_FIRST
                    ? "mr-2 btn btn-dark"
                    : "mr-2 btn btn-outline-dark"
                }
                htmlFor="btnradio3"
              >
                Earliest First
              </label>
              {/* </div> */}
            </div>
          </div>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
