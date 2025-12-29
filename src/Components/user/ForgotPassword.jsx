import { useState } from "react";
import AuthUser from "../Common/AuthUser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PathConstants from "../../routes/PathConstants";
import { useEffect } from "react";
import useService from "../../hooks/useService";
import Form from "react-bootstrap/Form";
import "../../styles/login.css";
import RolesConstants from "../../constants/RolesConstants";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const location = useLocation();
  var emailId = location.state;
  const { user } = AuthUser();

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [validated, setValidated] = useState(false);
  const authService = useService(AuthService);
  const [loading, setLoading] = useState(false);
  useEffect(() => { }, []);
  const resendOtp = event => {
    setLoading(true);
    authService.sendForgotPasswordOtpEmail(user, email).subscribe({
      next: response => {
        setLoading(false);
        if (response.status === 0) {
          // toast.error(response.message);
        } else {
          setIsOtpSent(true);
          toast.success(response.message);
        }
      },
      error: err => {
        toast.dismiss();
        toast.error(err?.response?.data?.message);
        setLoading(false);

        // navigate(PathConstants.HOME);
      },
    });
  };

  const submit = event => {
    var input = {
      email: email ? email : user.email,
      otp: otp,
      password: password,
      c_password: confirmPassword,
    };
    setLoading(true);
    // console.log("Verifying email: " + email);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      setLoading(false);
      return;
    } else {
      authService.resetForgotPasswordThroughEmail(input, user).subscribe({
        next: response => {
          setLoading(false);
          console.log(response);

          if (response.status === 0) {
            // toast.error(response.message);
            return;
          } else {
            toast.dismiss();
            toast.success(response.message);

            if (user && user.role === RolesConstants.OPERATOR) {
              //if user logged in
              navigate(PathConstants.DASHBOARD);
            } else if (user && user.role === RolesConstants.RIDER) {
              //if user logged in
              navigate(PathConstants.ACCOUNT);
            } else {
              navigate(PathConstants.LOGIN);
            }
          }
        },
        error: err => {
          toast.dismiss();
          toast.error(err?.response?.data?.message);
          setLoading(false);
          return;
          // navigate(PathConstants.HOME);
        },
      });
    }
  };

  return (
    <section
      className="vh-100 bg-image login"
      style={{
        backgroundImage: `url(
          "https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp"
        )`,
      }}
    >
      <div className="mask d-flex align-items-center h-100 webkit-gradient">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-5">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <h2 className="text-uppercase text-center mb-5">
                    Reset Password Here
                  </h2>

                  <Form
                    validated={validated}
                    // className="needs-validation"
                    onSubmit={submit}
                    noValidate
                  >
                    {!user && <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="emailId"
                        className="form-control form-control-lg"
                        // placeholder="Email Id"
                        autoComplete="username"
                        onChange={e => setEmail(e.target.value)}
                        value={email ? email : ""}
                        disabled={isOtpSent}
                        required
                      />
                    </div>}
                    {!isOtpSent && (
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          disabled={loading}
                          onClick={resendOtp}
                          className="btn btn-success btn-block btn-lg app-bg-color text-body"
                        >
                          {!loading && <span>Send Otp</span>}
                          {loading && (
                            // <div>
                            <span>Loading...</span>
                          )}
                          {loading && (
                            <span
                              className="spinner-border"
                              role="status"
                            ></span>
                          )}
                        </button>
                      </div>
                    )}
                    {isOtpSent && (
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="string"
                          id="otp"
                          className="form-control form-control-lg"
                          placeholder="Enter Otp"
                          autoComplete="current-password"
                          onChange={e => setOtp(e.target.value)}
                          required
                          maxLength={6}
                        />
                      </div>
                    )}
                    {isOtpSent && (
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          placeholder="Enter New Password"
                          autoComplete="current-password"
                          onChange={e => setPassword(e.target.value)}
                          required
                          minLength={8}
                        />
                      </div>
                    )}
                    {isOtpSent && (
                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="c_password"
                          className="form-control form-control-lg"
                          placeholder="Enter Confirm Password"
                          autoComplete="current-password"
                          onChange={e => setConfirmPassword(e.target.value)}
                          required
                          minLength={8}
                        />
                      </div>
                    )}
                    {isOtpSent && (
                      <div className="d-flex justify-content-center">
                        <button
                          // type="button"

                          type="submit"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          disabled={loading}
                          className="btn btn-success btn-block btn-lg app-bg-color text-body"
                        >
                          {!loading && <span>Submit</span>}
                          {loading && (
                            // <div>
                            <span>Loading...</span>
                          )}
                          {loading && (
                            <span
                              className="spinner-border"
                              role="status"
                            ></span>
                          )}
                        </button>
                      </div>
                    )}
                    {isOtpSent && (
                      <p className="text-center text-muted mt-5 mb-0">
                        Otp not received?{" "}
                        <Link
                          href="#"
                          onClick={resendOtp}
                          className="fw-bold text-body"
                        >
                          <u>Resend Otp</u>
                        </Link>
                      </p>
                    )}
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
