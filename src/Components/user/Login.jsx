import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import AIToolsService from '../../Services/AIToolsService';
import useService from '../../hooks/useService';
import { toast } from 'react-toastify';
import AuthUser from '../Common/AuthUser';
import PathConstants from '../../routes/PathConstants';
import Form from "react-bootstrap/Form";

export default function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const { setToken } = AuthUser();
    const { state: locationState } = useLocation();
    const { redirectTo } = locationState ? locationState : [];
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const aiToolsService = useService(AIToolsService);
    const submit = event => {
        setLoading(true);
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            setLoading(false);
            return;
        } else {
            aiToolsService.login(email, password).subscribe({
                next: response => {
                    if (response.access_token) {
                        const access_token = response.access_token;
                        setToken(access_token.user, access_token.token);
                        // localStorage.setItem('token', token);
                        if (redirectTo) {
                            // navigate(`${redirectTo.pathname}${redirectTo.search}`);
                            window.location.href = `${redirectTo.pathname}${redirectTo.search}`;
                        } else {
                            // navigate(PathConstants.HOME);
                            window.location.href = PathConstants.HOME;
                        }
                    }
                },
                error: e => {
                    toast.dismiss();
                    toast.error(e.message);
                },
                complete: () => {
                    setLoading(false);
                },
            });
        }
    }

    const verifyEmail = () => {
        navigate(PathConstants.EMAIL_VERIFY, {
            // state: email,
            replace: true,
        });
    };
    return (
        <>
            {
                !loginLoading
                && (
                    <section
                        className="vh-100 bg-image login1"
                        style={{
                            backgroundImage: `url(
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp"
              )`,
                        }}
                    >
                        {/* <ToastContainer /> */}
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
                                                <h2 className="text-uppercase text-center mb-5">Login</h2>

                                                <Form
                                                    validated={validated}
                                                    // className="needs-validation"
                                                    onSubmit={submit}
                                                    noValidate
                                                >
                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <input
                                                            type="email"
                                                            id="form3Example3cg"
                                                            className="form-control form-control-lg"
                                                            placeholder="Email Id"
                                                            autoComplete="username"
                                                            onChange={e => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <input
                                                            type="password"
                                                            id="form3Example4cg"
                                                            className="form-control form-control-lg"
                                                            placeholder="Password"
                                                            autoComplete="current-password"
                                                            onChange={e => setPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    {/* <div className="checkbox">
                            <label>
                              <input type="checkbox" /> Remember me
                            </label>
                          </div> */}
                                                    <div className="d-flex justify-content-center">
                                                        <button
                                                            // type="button"

                                                            type="submit"
                                                            data-mdb-button-init
                                                            data-mdb-ripple-init
                                                            disabled={loading}
                                                            className="btn btn-block btn-lg app-bg-color text-body"
                                                        >
                                                            {loading ? "Logging In..." : "Login"}
                                                            {loading && (
                                                                <span className="spinner-border" role="status"></span>
                                                            )}
                                                        </button>
                                                    </div>
                                                    <div className="px-0 col pt-3">
                                                        <Link
                                                            className=""
                                                            to={PathConstants.FORGOT_PASSWORD}
                                                        // onClick={() => setOpenBasic(!openBasic)}
                                                        >
                                                            Forgot Password?
                                                        </Link>
                                                    </div>
                                                    <div className="px-0 col pt-3">
                                                        <Link
                                                            className=""
                                                            // to={PathConstants.FORGOT_PASSWORD}
                                                            onClick={() => verifyEmail()}
                                                        >
                                                            Verify Email
                                                        </Link>
                                                    </div>
                                                    <p className="text-center text-muted mt-5 mb-0">
                                                        Do not have an account?{" "}
                                                        <a href={PathConstants.REGISTER} className="fw-bold text-body">
                                                            <u>Register here</u>
                                                        </a>
                                                    </p>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
        </>
    );
}
