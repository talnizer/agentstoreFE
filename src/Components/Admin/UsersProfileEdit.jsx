import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import FiltersConstants from "../../constants/FiltersConstants";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function UsersProfileEdit(props) {
  const [validated, setValidated] = useState(false);
  const filtersConstants = FiltersConstants();
  const [showEditProfileForm, setShowEditProfileForm] = useState(true);
  const [profileInputs, setProfileInputs] = useState({});
  const [selectedUserId, setSelectedUserId] = useState();
  const [loading, setLoading] = useState(true);
  const adminService = useService(AdminService);

  useEffect(() => {
    fetchUserProfile();
    setSelectedUserId(props.selectedUser?._id);
    setShowEditProfileForm(true);
  }, [props]);

  const fetchUserProfile = () => {
    setLoading(true);

    adminService.getUserProfile(props.selectedUser?._id).subscribe({
      next: response => {
        setProfileInputs(response.result);
        setLoading(false);
      }
    });
  };
  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;

    if (name === "age") {
      value = parseInt(value);
    }
    setProfileInputs(values => ({ ...values, [name]: value }));
  };

  const updateUserProfile = event => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      adminService.editProfile(selectedUserId, profileInputs).subscribe({
        next: response => {
          if (response.status) {
            var profile = response.result;
            if (profile) {
              toast.dismiss();
              toast.success("User updated!");
              setShowEditProfileForm(false);
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

  return (

    <div className="container">
      {showEditProfileForm &&
        <div className="row justify-content-center">
          <div className="mb-4 mt-2 px-0 col-10 col-md-8 ">
            <div className="">
              <div>Selected User</div>
              <div>{props.selectedUser?.email} </div>
              <div>{props.selectedUser?.phone}</div>
            </div>
            <Form
              validated={validated}
              onSubmit={updateUserProfile}
              noValidate
            >
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-control form-control-lg"
                  placeholder="Age"
                  value={profileInputs?.age || ""}
                  onChange={handleChange}
                  required
                  max={100}
                  min={10}
                />
              </div>
              <Form.Select
                className="form-select form-select-lg mb-4"
                aria-label="Default select example"
                id="gender"
                name="gender"
                type="string"
                value={profileInputs.gender || ""}
                onChange={handleChange}
                required
              >
                <option disabled value={""}>
                  Gender
                </option>

                <option
                  key={filtersConstants.GenderFilters.MALE}
                  value={filtersConstants.GenderFilters.MALE}
                >
                  {filtersConstants.GenderFilters.MALE_STRING}
                </option>
                <option
                  key={filtersConstants.GenderFilters.FEMALE}
                  value={filtersConstants.GenderFilters.FEMALE}
                >
                  {filtersConstants.GenderFilters.FEMALE_STRING}
                </option>
                <option
                  key={filtersConstants.GenderFilters.TRANS}
                  value={filtersConstants.GenderFilters.TRANS}
                >
                  {filtersConstants.GenderFilters.TRANS_STRING}
                </option>
              </Form.Select>
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control form-control-lg"
                  placeholder="Address"
                  value={profileInputs?.address || ""}
                  onChange={handleChange}
                  required

                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  id="current_city"
                  name="current_city"
                  className="form-control form-control-lg"
                  placeholder="Current City"
                  value={profileInputs?.current_city || ""}
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
                  value={profileInputs?.state || ""}
                  onChange={handleChange}
                  required

                />
              </div>
              <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
            </Form>
          </div>
        </div>
      }</div>
  );
}
