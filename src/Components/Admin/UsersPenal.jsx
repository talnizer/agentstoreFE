import { useEffect, useState } from "react";

import useService from "../../hooks/useService";
import AdminService from "../../Services/AdminService";
import UsersEdit from "./UsersEdit";
import UsersProfileEdit from "./UsersProfileEdit";
import Pagination from "../Common/Pagination";
import UserStatuses from "../../constants/UserStatuses";
import UsersPermissionsEdit from "./UsersPermissionsEdit";

export default function UsersPenal() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [showProfileEditUserForm, setShowProfileEditUserForm] = useState(false);
  const [showUserPermissionsEditForm, setShowUserPermissionsEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [length, setLength] = useState(0);
  const [result, setResult] = useState({});
  const adminService = useService(AdminService);
  const FIRST_PAGE = 1;
  useEffect(() => {
    fetchUsers(FIRST_PAGE);
  }, [reload]);

  const fetchUsers = (selectedPage) => {
    setLoading(true);
    setShowEditUserForm(false);
    setShowProfileEditUserForm(false);

    adminService.fetchUsers(
      {
        page: selectedPage,
      }
    ).subscribe({
      next: response => {

        setResult(response.result);
        setLength(((response.result.current_page - 1) * response.result.per_page) + 0);
        console.log((response.result.current_page - 1) * response.result.per_page);
        setUserList(response.result?.data);
        setLoading(false);
      }
    });
  };

  const editUser = (user) => {
    setSelectedUser(user);
    reinitShowFlags();
    setShowEditUserForm(true);
  }

  const reinitShowFlags = () => {
    setShowEditUserForm(false);
    setShowProfileEditUserForm(false);
    setShowUserPermissionsEditForm(false);
  }
  const editUserProfile = (user) => {
    setSelectedUser(user);
    reinitShowFlags();
    setShowProfileEditUserForm(true);
  }

  const editUserPermissions = (user) => {
    setSelectedUser(user);
    reinitShowFlags();
    setShowUserPermissionsEditForm(true);
  }

  function handleResponseFromChild(currentPage) {
    setCurrentPage(currentPage);
    fetchUsers(currentPage);
  }
  function handleResetShowEditUserForm(value) {
    fetchUsers(currentPage);
    setShowEditUserForm(value);
  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => fetchUsers(FIRST_PAGE)}
          >
            Reload
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
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userList && userList.map((user, len = 0) => {
                    return (

                      <tr key={user._id}>
                        <th scope="row">{len + 1 + length}</th>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{new Date(
                          parseInt(user.created_at)
                        ).toDateString()}
                        </td>
                        <td>
                          {user.status ? user.status : UserStatuses.statuses.ACTIVE}
                          {<div className="btn btn-sm btn-primary my-1" onClick={() => editUser(user)}>Edit</div>}
                          {<div className="btn btn-sm btn-primary" onClick={() => editUserProfile(user)}>Edit Profile</div>}
                          {<div className="btn btn-sm btn-primary" onClick={() => editUserPermissions(user)}>Edit Permissions</div>}
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

      {showEditUserForm &&
        <UsersEdit showEditUserForm={showEditUserForm}
          resetShowEditUserForm={handleResetShowEditUserForm} selectedUser={selectedUser}></UsersEdit>
      }
      {showProfileEditUserForm &&
        <UsersProfileEdit reload={!reload} selectedUser={selectedUser}></UsersProfileEdit>
      }
      {showUserPermissionsEditForm &&
        <UsersPermissionsEdit reload={!reload} selectedUser={selectedUser} />
      }
    </div>
  );
}
