import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { filter } from "rxjs";

export default function FilterDialog(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [openGeneral, setOpenGeneral] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [filterBy, setFilterBy] = useState({});
  var filters = {
    morning: "M",
    afternoon: "A",
    evening: "E",
    night: "N",
    male: "M",
    female: "F",
    notAlone: "NA",
  };
  var timeFilter = [
    filters.morning,
    filters.afternoon,
    filters.evening,
    filters.night,
  ];
  var driverGenderFilter = [filters.male, filters.female];

  var coTravellerFilter = [filters.male, filters.female, filters.notAlone];

  const handleApply = () => {
    handleClose();
    props.filterBy(filterBy);
    setFilterBy({});
  };
  const handleCheckBox = event => {
    if (event?.target?.checked === true) {
      if (
        event.target.name === "time" &&
        timeFilter.includes(event.target.value)
      ) {
        if (!filterBy.time) {
          setFilterBy(prevState => ({
            ...prevState,
            time: [event.target.value],
          }));
        } else if (
          filterBy.time &&
          filterBy.time.indexOf(event.target.value) === -1
        ) {
          filterBy.time.push(event.target.value);
          setFilterBy(prevState => ({
            ...prevState,
            time: filterBy.time,
          }));
        }
      } else if (
        event.target.name === "driverGender" &&
        driverGenderFilter.includes(event.target.value)
      ) {
        if (!filterBy.driverGender) {
          setFilterBy(prevState => ({
            ...prevState,
            driverGender: [event.target.value],
          }));
        } else if (
          filterBy.driverGender &&
          filterBy.driverGender.indexOf(event.target.value) === -1
        ) {
          filterBy.driverGender.push(event.target.value);
          setFilterBy(prevState => ({
            ...prevState,
            driverGender: filterBy.driverGender,
          }));
        }
      } else if (
        event.target.name === "coTraveller" &&
        coTravellerFilter.includes(event.target.value)
      ) {
        if (!filterBy.coTraveller) {
          setFilterBy(prevState => ({
            ...prevState,
            coTraveller: [event.target.value],
          }));
        } else if (
          filterBy.coTraveller &&
          filterBy.coTraveller.indexOf(event.target.value) === -1
        ) {
          filterBy.coTraveller.push(event.target.value);
          setFilterBy(prevState => ({
            ...prevState,
            coTraveller: filterBy.coTraveller,
          }));
        }
      }
    }
  };

  // setFilters(prevState => ({
  //   ...prevState,
  //   isCPasswdSame: true,
  // }));
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon className="px-1" icon={faFilter} />
        Filter
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            {/* <!-- filter-group  .// --> */}
            <article className="filter-group">
              <header className="card-header">
                <div
                  className="btn text-primary d-flex justify-content-between"
                  onClick={() => setOpenGeneral(!openGeneral)}
                  aria-controls="general"
                  aria-expanded={openGeneral}
                >
                  <h6 className="title">General </h6>
                  {openGeneral && (
                    <FontAwesomeIcon className="p-2" icon={faChevronDown} />
                  )}
                  {!openGeneral && (
                    <FontAwesomeIcon className="p-2" icon={faChevronRight} />
                  )}
                </div>
              </header>
              <Collapse in={openGeneral}>
                <div id="general">
                  <div className="card-body">
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.morning}
                        name="time"
                        onClick={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">
                        Morning : 7AM-12PM
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.afternoon}
                        name="time"
                        onChange={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">
                        Noon : 12PM - 5PM
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.evening}
                        name="time"
                        onChange={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">
                        Evening : 5PM - 9PM
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.night}
                        name="time"
                        onChange={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">
                        Night : 9PM - 7AM
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.female}
                        name="driverGender"
                        onChange={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">Female Driver</div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.notAlone}
                        name="coTraveller"
                        onChange={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">Not Alone</div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        value={filters.female}
                        name="coTraveller"
                        onChange={event => handleCheckBox(event)}
                        type="checkbox"
                        className="custom-control-input"
                      />
                      <div className="custom-control-label">
                        Female Co-traveller
                      </div>
                    </label>
                  </div>
                </div>
              </Collapse>
            </article>
            {/* <!-- filter-group .// --> */}
            {/* <article className="filter-group">
              <header className="card-header">
                <div
                  className="btn text-primary d-flex justify-content-between"
                  onClick={() => setOpenPrice(!openPrice)}
                  aria-controls="price"
                  aria-expanded={openPrice}
                >
                  <h6 className="title">Price range </h6>
                  {openPrice && (
                    <FontAwesomeIcon className="p-2" icon={faChevronDown} />
                  )}
                  {!openPrice && (
                    <FontAwesomeIcon className="p-2" icon={faChevronRight} />
                  )}
                </div>
              </header>
              <Collapse in={openPrice}>
                <div id="price" className="card-body">
                  <input
                    type="range"
                    className="custom-range"
                    min="0"
                    max="100"
                    name=""
                  />
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Min</label>
                      <input
                        className="form-control"
                        placeholder="$0"
                        type="number"
                      />
                    </div>
                    <div className="form-group text-right col-md-6">
                      <label>Max</label>
                      <input
                        className="form-control"
                        placeholder="$1,0000"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </article> */}
            {/* <!-- filter-group .// --> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
