import React, { useState } from 'react';
// import api from '';
import api, { setToken } from '../../utils/api';
import AIToolsService from '../../Services/AIToolsService';
import { toast } from 'react-toastify';
import useService from '../../hooks/useService';
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import AuthService from '../../Services/AuthService';
import PathConstants from '../../routes/PathConstants';

export default function Register() {
    const aiToolsService = useService(AIToolsService);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState();
    const [cpassword, setConfirmPassword] = useState();
    const [termsCheked, setTermsCheked] = useState(false);
    const [validated, setValidated] = useState(false);
    const [otherVaidation, setOtherVaidation] = useState({
        isValidPhone: true,
        isCPasswdSame: true,
    });
    const authService = useService(AuthService);
    const register1 = (e) => {
        e.preventDefault();
        try {
            // const res = await api.post('/auth/register', { email, password, name });
            aiToolsService.register({ email, password, name }).subscribe({
                next: response => {
                    if (response.status) {
                        var location = response.result;
                        if (location) {
                            toast.dismiss();
                            //   toast.success("User updated!");
                            alert('Registered - login now');
                        }
                    }
                },
                error: e => {
                    toast.dismiss();
                    toast.error(e.message);
                },
                complete: () => { },
            });

        } catch (err) { alert(err.response?.data?.detail || err.message); }
    }

    const handlePhone = phoneNumber => {
        if (!isValidPhoneNumber(phoneNumber)) {
            return;
        }
        setOtherVaidation(prevState => ({
            // console.log(prevState);

            // let other = Object.assign({}, prevState.otherVaidation);
            // other.isValidPhone = true;
            // console.log(other);
            // return other;
            ...prevState,
            isValidPhone: true,
        }));
        // console.log(otherVaidation);
        setPhone(phoneNumber);
    };
    const handleCPassword = cpasswd => {
        setConfirmPassword(cpasswd);
        if (cpasswd !== password) {
            return;
        }
        setOtherVaidation(prevState => ({
            ...prevState,
            isCPasswdSame: true,
        }));
        // console.log(otherVaidation);
        // setConfirmPassword(cpasswd);
    };

    const isValidPhoneNumber = phoneNumber => {
        var phoneRegex = /^\d{10}$/;
        if (phoneNumber && phoneNumber.match(phoneRegex)) {
            // console.log("phone valid");
            return true;
        } else return false;
    };

    const register = event => {
        var input = {
            name: name,
            email: email,
            phone: phone,
            password: password,
            c_password: cpassword,
            // role: role,
            terms_checked: termsCheked,
        };
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
            // console.log(input.phone);
            if (!isValidPhoneNumber(input.phone)) {
                // setOtherVaidation({ isValidPhone: false });
                setOtherVaidation(prevState => ({
                    ...prevState,
                    isValidPhone: false,
                }));
                toast.dismiss();
                toast.error("Invalid Phone Number!");
                event.preventDefault();
                event.stopPropagation();
                setValidated(true);
                return;
            }
            if (password !== cpassword) {
                // setOtherVaidation({ isCPasswdSame: false });
                setOtherVaidation(prevState => ({
                    ...prevState,
                    isCPasswdSame: false,
                }));
                event.preventDefault();
                event.stopPropagation();
                setValidated(true);
                // toast.error("Confirm Password must be same!");
                return;
            } else {
                //register
                // console.log("input");
                setLoading(true);
                event.preventDefault();
                authService.register(input).subscribe({
                    next: response => {
                        // console.log(response);
                        if (response?.status === 0) {
                            toast.dismiss();
                            toast.error(response?.message);
                        } else {
                            toast.dismiss();
                            toast.success(response?.message);
                            navigate(PathConstants.EMAIL_VERIFY, {
                                state: email,
                                replace: true,
                            });
                        }
                        setLoading(false);
                        // navigate(PathConstants.LOGIN);
                    },
                    error: err => {
                        setLoading(false);
                        toast.dismiss();
                        toast.error(err?.message);
                    },
                });
            }
        }
    };

    return (
        // <form onSubmit={submit}>
        //     <h2>Register</h2>
        //     <input placeholder="name" value={name} onChange={e => setName(e.target.value)} /><br />
        //     <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        //     <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        //     <button>Register</button>
        // </form>

        <section
            className="1vh-100 bg-image register"
            style={{
                backgroundImage: `url(
              "https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp"
            )`,
            }}
        >
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="my-5 col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: 15 }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">
                                        Create an account
                                    </h2>

                                    <Form
                                        validated={validated}
                                        // className="needs-validation"
                                        onSubmit={register}
                                        noValidate
                                    >
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="form3Example1cg"
                                                className="form-control form-control-lg"
                                                placeholder="Full Name"
                                                onChange={e => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="email"
                                                id="form3Example3cg"
                                                className="form-control form-control-lg"
                                                placeholder="Email Id"
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="phone"
                                                id="form3Example3cg1"
                                                className="form-control form-control-lg"
                                                placeholder="Phone Number"
                                                onChange={e => handlePhone(e.target.value)}
                                                required
                                            />
                                            {!otherVaidation.isValidPhone && (
                                                <div className="small text-danger">
                                                    Invalid Phone Number
                                                </div>
                                            )}
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="form3Example4cg"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                                autoComplete="new-password"
                                                onChange={e => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="form3Example4cdg"
                                                className="form-control form-control-lg"
                                                placeholder="Confirm Password"
                                                autoComplete="new-password"
                                                onChange={e => handleCPassword(e.target.value)}
                                                required
                                            />
                                            {!otherVaidation.isCPasswdSame && (
                                                <div className="small text-danger">
                                                    Confirm Password must be same
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <label
                                                className="form-check-label"
                                                htmlFor="form2Example3g"
                                            >
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id="form2Example3cg"
                                                    onChange={e => setTermsCheked(state => !state)}
                                                    required
                                                />
                                                I agree all statements in{" "}
                                                <a href={PathConstants.TERMS} className="text-body">
                                                    <u>Terms of service</u>
                                                </a>
                                                {" and "}
                                                <a href={PathConstants.PRIVACY} className="text-body">
                                                    <u>Privacy Policy</u>
                                                </a>
                                            </label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button
                                                // type="button"

                                                type="submit"
                                                data-mdb-button-init
                                                data-mdb-ripple-init
                                                disabled={loading}
                                                className="btn btn-success btn-block btn-lg app-bg-color text-body"
                                            >
                                                {!loading && <span>Register</span>}
                                                {loading && (
                                                    // <div>
                                                    <span>Registering...</span>
                                                )}
                                                {loading && (
                                                    <span className="spinner-border" role="status"></span>
                                                )}
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            Have already an account?{" "}
                                            <a href={PathConstants.LOGIN} className="fw-bold text-body">
                                                <u>Login here</u>
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
    );
}
