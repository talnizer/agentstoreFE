import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import FiltersConstants from "../../constants/FiltersConstants";
import AdminService from "../../Services/AdminService";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default function UsersPermissionsEdit(props) {
  const [validated, setValidated] = useState(false);
  const filtersConstants = FiltersConstants();
  const [showEditPermissionsForm, setShowEditPermissionsForm] = useState(true);
  const [userPermissions, setUserPermissions] = useState({});
  const [allPermissions, setAllPermissions] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState();
  const [loading, setLoading] = useState(true);
  const adminService = useService(AdminService);
  const BOOLEAN = 1, NUMBER = 2;
  useEffect(() => {
    setSelectedUserId(props.selectedUser?._id);
    fetchUserPermissions();
    setShowEditPermissionsForm(true);
    fetchAllPermissions();
  }, [props]);

  const fetchUserPermissions = () => {
    setLoading(true);

    adminService.getUserPermissions(props.selectedUser?._id).subscribe({
      next: response => {
        setUserPermissions(response.result);
        setLoading(false);
      }
    });
  };
  const fetchAllPermissions = () => {
    setLoading(true);

    adminService.getAllPermissions().subscribe({
      next: response => {
        setAllPermissions(response.result);
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
    setUserPermissions(values => ({ ...values, [name]: value }));
  };

  const updateUserPermissions = event => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    } else {
      adminService.editProfile(selectedUserId, userPermissions).subscribe({
        next: response => {
          if (response.status) {
            var profile = response.result;
            if (profile) {
              toast.dismiss();
              toast.success("User updated!");
              setShowEditPermissionsForm(false);
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

  function getPermissionType(permission) {
    console.log(permission);
    return "boolean";
  }
  return (

    <div className="container">
      {showEditPermissionsForm &&
        <div className="row justify-content-center">
          <div className="mb-4 mt-2 px-0 col-10 col-md-8 ">
            <div className="">
              <div>Selected User</div>
              <div>{props.selectedUser?.name} </div>
              <div>{props.selectedUser?.email} </div>
              <div>{props.selectedUser?.phone}</div>
            </div>
            <Form
              validated={validated}
              onSubmit={updateUserPermissions}
              noValidate
            >
              {allPermissions?.map((permission, index) => {
                var type = getPermissionType(permission);
                return (
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type={type === 'boolean' ? 'checkbox' : 'number'}
                      id={permission.name}
                      name={permission.name}
                      className={type === 'boolean' ? "form-check-input" : "form-control form-control-lg"}
                      // placeholder="Age"
                      value={userPermissions[permission.name] || ""}
                      onChange={handleChange}
                      required
                    // max={100}
                    // min={10}
                    />
                  </div>
                )
              })}

              {/* <div className="form-group mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={userPermissions}
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={userPermissions === 1}
                    onChange={e => setHideCategory(e.target.checked ? 1 : 0)}
                  />

                </div>
              </div> */}

              <input className="bg-dark text-white mt-3 col btn btn-primary" type="submit" />
            </Form>
          </div>
        </div>
      }</div>
  );
}
