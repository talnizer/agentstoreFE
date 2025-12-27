import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import { useNavigate } from "react-router-dom";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import UserStatuses from "../../constants/UserStatuses";

export default function UsersEdit(props) {
  const [validated, setValidated] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(props.showEditUserForm);
  const [userInputs, setUserInputs] = useState({});
  const [selectedUserId, setSelectedUserId] = useState();
  const adminService = useService(AdminService);

  useEffect(() => {
    setUserInputs(props.selectedUser);
    setSelectedUserId(props.selectedUser?._id);
    setShowEditUserForm(props.showEditUserForm);
  }, [props]);


  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;

    if (name !== "email" && name !== "phone") {
      setUserInputs(values => ({ ...values, [name]: value }));
    }
  };

  const updateUser = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      adminService.editUser(selectedUserId, userInputs).subscribe({
        next: response => {
          if (response.status) {
            var location = response.result;
            if (location) {
              toast.dismiss();
              toast.success("User updated!");
              setShowEditUserForm(false);
              props.resetShowEditUserForm(false);
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
      {showEditUserForm &&
        <div className="row justify-content-center">
          <div className="mb-4 mt-2 px-0 col-10 col-md-8 ">
            <Form
              validated={validated}
              onSubmit={updateUser}
              noValidate
            >
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  value={userInputs?.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={userInputs?.email || ""}
                  // onChange={handleChange}
                  required
                  disabled={true}
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  className="form-control form-control-lg"
                  placeholder="Phone"
                  value={userInputs?.phone || ""}
                  // onChange={handleChange}
                  required
                  maxLength={10}
                  minLength={10}
                  disabled={true}
                />
              </div>
              <Form.Select
                className="text-capitalize form-select form-select-lg is-1invalid"
                aria-label="Default select example"
                id="status"
                name="status"
                value={userInputs?.status || ""}
                // onChange={handleSelectChangeDriver}
                onChange={handleChange}
                required
              >
                <option disabled value={""}>
                  Status
                </option>
                {UserStatuses.statuses &&
                  Object.keys(UserStatuses.statuses).map((key, index) => {
                    return (
                      <option key={index} value={UserStatuses.statuses[key]}>
                        {UserStatuses.statuses[key]}
                      </option>
                    );
                  })}
              </Form.Select>
              <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
            </Form>
          </div>
        </div>
      }</div>
  );
}
