import { useEffect, useState } from "react";



import useService from "../../hooks/useService";
import UserProfileService from "../../Services/UserProfileService";
import { useNavigate, useParams } from "react-router-dom";
import PathConstants from "../../routes/PathConstants";
import FiltersConstants from "../../constants/FiltersConstants";
// import { useHistory } from "react-router-dom";

export default function UserProfile(props) {
  const navigate = useNavigate();
  var { id } = useParams();
  const filtersConstants = FiltersConstants();
  // const location = useLocation();
  // let profile = location.state ? location.state : null;
  const [userProfile, setUserProfile] = useState();
  const [activeTab, setActiveTab] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const userProfileService = useService(UserProfileService);

  // let history = useHistory();
  // console.log(id);
  useEffect(() => {
    if (props.profile) {
      // console.log(props);
      setUserProfile(props.profile);
      setLoading(false);
    } else if (id) {
      getProfile(id);
      // if(StringUtils.isEmail(id)) {

      //   getProfile();
      // }
    } else {
      getMyProfile();
    }
  }, [reload]);

  // useEffect(() => {
  //   if (id) {
  //     getProfile(id);
  //   } else {
  //     getMyProfile();
  //   }
  // }, [reload]);

  const getProfile = (id) => {
    setLoading(true);
    userProfileService.getUserProfile(id).subscribe(res => {
      // console.log(res.result);
      setUserProfile(res.result);
      setLoading(false);
    });
  };

  const getMyProfile = () => {
    setLoading(true);
    userProfileService.myprofile().subscribe(res => {
      // console.log(res.result);
      setUserProfile(res.result);
      setLoading(false);
    });
  };
  const changePassword = () => {
    navigate(PathConstants.FORGOT_PASSWORD);
    // <div className="px-0 col pt-3">
    //   <Link
    //     className=""
    //     to={PathConstants.FORGOT_PASSWORD}
    //     // onClick={() => setOpenBasic(!openBasic)}
    //   >
    //     Forgot Password?
    //   </Link>
    // </div>;
  };
  const reloadUserProfile = () => {
    // setLoading(true);
    setUserProfile();
    setReload(!reload); //above use effect will run on change of reload value
  };

  const navigateToVerifyEmail = email => {
    navigate(PathConstants.EMAIL_VERIFY, { state: email, replace: true });
  };
  const navigateToEditProfile = () => {
    navigate(PathConstants.EDIT_PROFILE, { state: userProfile, replace: true });
  };
  const socialShare = () => {
    // render(<ShareService link={window.location.protocol + "//" + 
    //   window.location.hostname + "/share/profile/" + userProfile.user_id}></ShareService>);
    // shareService.show();
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="mt-2 px-0 col-10 col-md-8 ">
          <button
            className="m-2 btn btn-outline-dark"
            onClick={reloadUserProfile}
          >
            Reload
          </button>
          <button
            className="m-2 btn btn-outline-dark"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {!id && <button
            className="m-2 btn btn-outline-dark"
            onClick={() => changePassword()}
          >
            Change Password
          </button>}
          {/* <div className="btn btn-outline-dark" onClick={socialShare}>Share Profile</div> */}
          {loading && (
            <div className="my-5 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {!loading && userProfile && (
            <div className="mt-4 card text-center">
              <div className="card-header bg-dark text-white">Profile</div>
              <div className="card-body app-bg-color px-0">
                {/* //////////// */}
                <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Name</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.user?.name}</div>
                  </div>
                </div>
                <hr className="mx-4" />
                {/* //////////// */}
                {!id && <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Email</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.user?.email}</div>
                    {!id && !userProfile?.user?.email_verified_at && (
                      <div
                        // onClick={e => setShowEmailVerifyForm(true)}
                        onClick={e =>
                          navigateToVerifyEmail(userProfile?.user?.email)
                        }
                        className="btn btn-sm btn-outline-warning"
                      >
                        Verify
                      </div>
                    )}
                  </div>
                </div>}
                {!id && <hr className="mx-4" />}
                {/* //////////// */}
                {!id && <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Phone</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.user?.phone}</div>
                  </div>
                </div>}
                {!id && <hr className="mx-4" />}
                {/* //////////// */}
                <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Gender</div>
                  </div>
                  <div className="col">
                    {/* <div>{userProfile?.gender}</div> */}
                    <div>
                      {filtersConstants.getGenderString(userProfile?.gender)}
                    </div>
                  </div>
                </div>
                <hr className="mx-4" />
                {/* //////////// */}
                <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Age</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.age}</div>
                  </div>
                </div>
                <hr className="mx-4" />
                {/* //////////// */}
                <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Current City</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.current_city}</div>
                  </div>
                </div>
                <hr className="mx-4" />
                {/* //////////// */}
                <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Current State</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.state}</div>
                  </div>
                </div>
                <hr className="mx-4" />
                {/* //////////// */}
                <div className="row px-2">
                  <div className="col-4">
                    <div className="text-muted">Pin Code</div>
                  </div>
                  <div className="col">
                    <div>{userProfile?.pincode}</div>
                  </div>
                </div>
                <hr className="mx-4" />
              </div>
              {!id && <div className="app-bg-color card-body px-5">
                <div
                  onClick={navigateToEditProfile}
                  className="1app-bg-color btn btn-dark border-dark btn-block"
                >
                  Edit
                </div>
              </div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
