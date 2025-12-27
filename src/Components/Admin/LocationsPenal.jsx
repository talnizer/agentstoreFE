import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Pagination from "../Common/Pagination";

export default function LocationsPenal() {
  const [openNewLocationDialog, setOpenNewLocationDialog] = useState(false);
  const [validated, setValidated] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditLocationForm, setShowEditLocationForm] = useState(false);
  const [locationInputs, setLocationInputs] = useState({});
  const [selectedLocationId, setSelectedLocationId] = useState();
  const adminService = useService(AdminService);
  const [result, setResult] = useState({});
  const [length, setLength] = useState(0);
  const FIRST_PAGE = 1;
  useEffect(() => {
    fetchLocations(FIRST_PAGE);
  });

  const fetchLocations = (selectedPage) => {
    setLoading(true);
    adminService.fetchAllLocations({
      page: selectedPage
    }).subscribe(response => {
      setResult(response.result);
      setLength(((response.result.current_page - 1) * response.result.per_page) + 0);
      setLocationList(response.result?.data);
      setLoading(false);
    });
  };

  const approveLocation = (location) => {
    setLoading(true);
    adminService.approveLocation(location._id).subscribe(res => {
      if (res.result)
        location = res.result;
      setLoading(false);
    });
  }
  const editLocation = (location) => {
    setSelectedLocationId(location._id);
    setShowEditLocationForm(true);
    setLocationInputs(location);
  }
  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;

    if (name === "pincode") {
      value = parseInt(value);
    }
    setLocationInputs(values => ({ ...values, [name]: value }));
  };
  const updateLocation = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      adminService.editLocation(selectedLocationId, locationInputs).subscribe({
        next: response => {
          if (response.status) {
            var location = response.result;
            if (location) {
              toast.dismiss();
              toast.success("Location updated!");
              setShowEditLocationForm(false);
            }
          }
        },
        error: e => {
          toast.dismiss();
          toast.error(e.message);
        },
        complete: () => { },
      });
    }
  };

  const createLocationDialog = () => {
    setOpenNewLocationDialog(true);
  };
  function handleConfirmationFromChild(confirmation) {
    setOpenNewLocationDialog(false);
  }
  function handleResponseFromChild(currentPage) {
    fetchLocations(currentPage);
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => fetchLocations(FIRST_PAGE)}
          >
            Reload
          </button>
          <button
            className="m-2 btn btn-outline-dark"
            onClick={createLocationDialog}
          >
            Add Location
          </button>
          {loading && (
            <div className="my-5 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {!loading &&
            <div className="table-responsive">

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Created At</th>

                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {locationList.map((location, len = 0) => {
                    return (

                      <tr key={location._id}>
                        <th scope="row">{len + length + 1}</th>
                        <td>{location.city}</td>
                        <td>{location.state}</td>
                        <td>{location.landmark}</td>
                        <td>{new Date(
                          parseInt(location.created_at)
                        ).toDateString()}
                        </td>
                        <td>
                          {location.status ? location.status : "Pending"}
                          {!location.status && <div className="btn btn-sm btn-primary" onClick={() => approveLocation(location)}>Approve</div>}
                          {<div className="btn btn-sm btn-primary" onClick={() => editLocation(location)}>Edit</div>}
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
              {/* Pagination Here*/}
              <Pagination
                result={result}
                getData={handleResponseFromChild}
              ></Pagination>
              {/* End pagination */}
            </div>
          }
        </div>
      </div>

      {showEditLocationForm && <div className="row justify-content-center">
        <div className="mb-4 mt-2 px-0">
          <Form
            validated={validated}
            onSubmit={updateLocation}
            noValidate
          >
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="city"
                name="city"
                className="form-control form-control-lg"
                placeholder="City"
                value={locationInputs.city || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="state"
                name="state"
                className="form-control form-control-lg"
                placeholder="State"
                value={locationInputs.state || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="landmark"
                name="landmark"
                className="form-control form-control-lg"
                placeholder="Landmark"
                value={locationInputs.landmark || ""}
                onChange={handleChange}
                maxLength={50}
              />
              <small className="text-muted">Max: 50 Characters</small>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                id="pincode"
                name="pincode"
                className="form-control form-control-lg"
                placeholder="Pincode"
                value={locationInputs.pincode || ""}
                onChange={handleChange}
              />
              <small className="text-muted">optional</small>
            </div>
            <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
          </Form>
        </div>
      </div>
      }
    </div>
  );
}
