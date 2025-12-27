import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthUser from "../Common/AuthUser";
import RolesConstants from "../../constants/RolesConstants";
import AuthService from "../../Services/AuthService";
import useService from "../../hooks/useService";
import { throwError } from "rxjs";
import "../../styles/register.css";
import Form from "react-bootstrap/Form";
import PathConstants from "../../routes/PathConstants";
import UserProfileService from "../../Services/UserProfileService";
import FiltersConstants from "../../constants/FiltersConstants";

export default function EditProfile() {
  const location = useLocation();
  let myProfile = location.state;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [otherValidation, setOtherValidation] = useState({
    isValidPhone: true,
  });
  const filtersConstants = FiltersConstants();
  const [validated, setValidated] = useState(false);
  const [profileInputs, setProfileInputs] = useState({});
  const { user } = AuthUser();
  const userProfileService = useService(UserProfileService);

  useEffect(() => {
    initMyProfile();
    setLoading(false);
  }, [myProfile]);

  const handlePhone = phoneNumber => {
    if (!isValidPhoneNumber(phoneNumber)) {
      return;
    }
    setOtherValidation(prevState => ({
      ...prevState,
      isValidPhone: true,
    }));
    console.log(otherValidation);
    // profileInputs
  };
  const initMyProfile = () => {
    console.log(myProfile);
    if (myProfile) {
      setProfileInputs(prevState => ({
        ...prevState,
        name: myProfile?.user?.name,
        email: myProfile?.user?.email,
        phone: myProfile?.user?.phone,
        gender: myProfile.gender,
        age: myProfile.age,
        current_city: myProfile.current_city,
        state: myProfile.state,
        pincode: myProfile.pincode,
        address: myProfile.address,
      }));
    }
  };

  const isValidPhoneNumber = phoneNumber => {
    var phoneRegex = /^\d{10}$/;
    if (phoneNumber && phoneNumber.match(phoneRegex)) {
      console.log("phone valid");
      return true;
    } else return false;
  };

  const updateProfile = event => {
    // ("use strict");

    const form = event.currentTarget;
    // console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      //chek phone
      console.log(profileInputs.phone);
      if (!isValidPhoneNumber(profileInputs.phone)) {
        // setOtherValidation({ isValidPhone: false });
        setOtherValidation(prevState => ({
          ...prevState,
          isValidPhone: false,
        }));
        console.log(otherValidation.isValidPhone);
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        return;
      }
      setLoading(true);
      event.preventDefault();
      userProfileService.post(myProfile.user_id, profileInputs).subscribe({
        next: response => {
          setLoading(false);
          if (response.status) {
            if (user && user.role === RolesConstants.OPERATOR) {
              navigate(PathConstants.DASHBOARD);
            } else {
              navigate(PathConstants.ACCOUNT, { state: response.result });
            }
          }
        },
        error: err => {
          setLoading(false);
        },
      });
    }
  };
  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    if (name === "phone") {
      handlePhone(value);
    } else if (name === "age") {
      value = parseInt(value);
    }
    setProfileInputs(values => ({ ...values, [name]: value }));
  };
  return (
    <section
      className="vh-100 bg-image register"
      style={{
        backgroundImage: `url(
          "https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp"
        )`,
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-5">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <Form
                    validated={validated}
                    // className="needs-validation"
                    onSubmit={updateProfile}
                    noValidate
                  >
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Full Name"
                        value={profileInputs.name || ""}
                        name="name"
                        onChange={handleChange}
                        required
                      />
                      {/* <div className="valid-feedback">Looks good!</div> */}
                      {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}

                      {/* <div className="invalid-feedback">
                        Name is required
                      </div> */}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        placeholder="Email Id"
                        value={profileInputs.email || ""}
                        name="email"
                        onChange={handleChange}
                        required
                      />
                      {/* <div className="invalid-feedback">
                        Please choose a email.
                      </div> */}
                      {/* <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label> */}
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="phone"
                        id="form3Example3cg1"
                        className="form-control form-control-lg"
                        placeholder="Phone Number"
                        value={profileInputs.phone || ""}
                        name="phone"
                        onChange={handleChange}
                        required
                      />
                      {!otherValidation.isValidPhone && (
                        <div className="small text-danger">
                          Invalid Phone Number
                        </div>
                      )}
                    </div>
                    <Form.Select
                      className="form-select form-select-lg mb-4"
                      aria-label="Default select example"
                      id="gender"
                      name="gender"
                      type="string"
                      value={profileInputs.gender || ""}
                      // onChange={handleSelectChangeDriver}
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
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Age"
                        value={profileInputs.age || ""}
                        name="age"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Address"
                        value={profileInputs.address || ""}
                        name="address"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Current City"
                        value={profileInputs.current_city || ""}
                        name="current_city"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="State"
                        value={profileInputs.state || ""}
                        name="state"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        placeholder="Pincode"
                        value={profileInputs.pincode || ""}
                        name="pincode"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        // type="button"

                        type="submit"
                        disabled={loading}
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        {!loading && <span>Submit</span>}
                        {loading && (
                          // <div>
                          <span>Loading...</span>
                        )}
                        {loading && (
                          <span className="spinner-border" role="status"></span>
                        )}
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
