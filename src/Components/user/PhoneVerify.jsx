import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PathConstants from "../../routes/PathConstants";
import { useEffect } from "react";
import useService from "../../hooks/useService";
import Form from "react-bootstrap/Form";
import "../../styles/login.css";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../config/Firebase";


export default function PhoneVerify(props) {
  const location = useLocation();
  var phoneNumber = location.state;

  const navigate = useNavigate();
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [validated, setValidated] = useState(false);
  const authService = useService(AuthService);
  const [loading, setLoading] = useState(false);
  const [showSendOtp, setShowSendOtp] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [capcha, setCapcha] = useState();

  // const setUpRecaptcha = () => {

  //   window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //     'size': 'invisible'
  //   }, auth);
  //   window.recaptchaVerifier.verify().then((token) => {
  //     console.log(token);
  //     setCapcha(token);
  //   });
  // }
  // useEffect(() => {
  //   setUpRecaptcha();
  // }, []);
  useEffect(() => {
    console.log(phoneNumber ? true : false);
    if (phoneNumber) {
      // if (data.phone) {
      console.log(phoneNumber);
      //set phone
      setPhone(phoneNumber);
      // }
    } else if (props && props.phone) {
      setPhone(props.phone);
    } else {
      setShowSendOtp(true);
    }
  }, [phoneNumber]);
  const resendOtp = event => {
    setShowSendOtp(false);
    setSendingOtp(true);
    console.log("Resending otp: " + phone);
    console.log("Capcha: " + capcha);
    authService.sendPhoneOtp(phone, capcha).subscribe({
      next: response => {
        if (response.status !== 0) {
          setLoading(false);
          toast.dismiss();
          toast.success(response.message);
          setSendingOtp(false);
        } else {
          setLoading(false);
          setSendingOtp(false);
        }
      },
      error: err => {
        console.log(err);
        // toast.error(err?.response?.data?.message);
        setLoading(false);
        setSendingOtp(false);
      },
    });
  };

  const submitOtp = event => {
    setLoading(true);
    console.log("Verifying phone: " + phone);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      setLoading(false);
      return;
    } else {
      console.log(capcha);
      authService.verifyPhone(phone, otp, capcha).subscribe({
        next: response => {
          setLoading(false);

          if (response.status === 0) {
            // toast.error(response.message);
            return;
          } else {
            toast.dismiss();
            toast.success(response.message);
            navigate(PathConstants.ACCOUNT);
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
                    Verify Phone Number
                  </h2>

                  <Form
                    validated={validated}
                    // className="needs-validation"
                    onSubmit={submitOtp}
                    noValidate
                  >
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="phone"
                        id="phone"
                        className="form-control form-control-lg"
                        // placeholder="Email Id"
                        autoComplete="username"
                        disabled={phoneNumber ? true : false}
                        value={phone ? phone : ""}
                        onChange={e => setPhone(e.target.value)}
                      // required
                      />
                      {/* {showSendOtp && (
                        <div>
                          <Link onClick={() => resendOtp()}>Send Otp</Link>
                        </div>
                      )} */}
                    </div>

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
                        minLength={6}
                      />
                    </div>
                    {/* <div id="recaptcha-container" style={{ marginBottom: "20px" }}></div> */}

                    <div className="d-flex justify-content-center">
                      <button
                        // type="button"
                        // id="sign-in-button"
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        disabled={loading}
                        className="btn btn-success btn-block btn-lg app-bg-color text-body"
                      >
                        {!loading && <span>Verify</span>}
                        {loading && (
                          // <div>
                          <span>Loading...</span>
                        )}
                        {loading && (
                          <span className="spinner-border" role="status"></span>
                        )}
                      </button>
                    </div>
                    <div>
                      {sendingOtp && (
                        // <div>
                        <span>Sending Otp...</span>
                      )}
                      {sendingOtp && (
                        <span className="spinner-border" role="status"></span>
                      )}
                    </div>
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
