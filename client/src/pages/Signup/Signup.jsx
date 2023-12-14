import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {setErrorValueNull} from "../../store/Auth/AuthSlice";
import { AuthSignup } from "../../store/Auth/AuthSlice";
import { toast } from "react-toastify";
import checkStrongPass from "../../utils/checkStrongPass";
import ValidateEmail from "../../utils/validateEmail";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [creds, setCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    cPassword: "",
  });
  const onChangeHandler = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    for (const key in creds) {
      if (creds.hasOwnProperty(key) && !creds[key]) {
        toast.warn(` ${key} should not be empty`);
        return;
      }
    }
    if (creds.password !== creds.cPassword) {
      toast.warn("password and confirm password should be same");
      return;
    }
    if (ValidateEmail(creds.email) === false) {
      toast.warn("use valid email");
      return;
    }
    if (checkStrongPass(creds.password) === false) {
      toast.warn("password should be strong");
      return;
    }
    dispatch(AuthSignup(creds));
  };
  useEffect(() => {
    document.title = "Signup | Login Signup Flow";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(setErrorValueNull());
    }
  }, [isError, errorMessage,dispatch]);
  return (
    <div className="signup-container">
      <div className="signup-img-container"></div>
      <div className="signup-form-container">
        {!isLoading && (
          <div className="signin-top-button-container">
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              SIGN IN
            </button>
          </div>
        )}
        <div className="heading-text">
          <h1> Explore & Experience</h1>
          <h3> Get onto most comfortable journey. All the way up</h3>
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",

              margin: "5 rem 0rem 0rem 0rem",
            }}
          >
            <div style={{ opacity: "0.4" }}>
              <RotatingLines
                strokeColor="#4127d4"
                strokeWidth="3"
                animationDuration="1.5"
                width="70"
                visible={true}
              />
            </div>
            <h5
              style={{
                color: "#000",
                margin: "1.75rem 0rem 0rem 0rem",
                textAlign: "center",
                position: "absolute",
              }}
            >
              Please wait
            </h5>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler}>
            <div>
              <input
                className="input-field"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={onChangeHandler}
                value={creds.firstName}
              />
              <input
                className="input-field"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={onChangeHandler}
                value={creds.lastName}
              />
            </div>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChangeHandler}
              value={creds.email}
            />
            <input
              className="input-field"
              type="text"
              name="username"
              placeholder="Username"
              onChange={onChangeHandler}
              value={creds.username}
            />
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
              value={creds.password}
            />
            <input
              className="input-field"
              type="password"
              name="cPassword"
              placeholder="Confirm Password"
              onChange={onChangeHandler}
              value={creds.cPassword}
            />
            <div className="signup-submit-button">
              <button
                onClick={onSubmitHandler}
                type="submit"
                className="signup-submit-button"
              >
                GET STARTED
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="side-box-container">
        <h1>Altitude Air</h1>
        <hr />
        <p>
          We promise to ensure that your well-being is taken care of while
          traveling with us. Boasting top in class fleet inventory and a 5 start
          approval for our in-flight experience. You know you're getting the
          best from Altitude with no attitude.
        </p>
      </div>
    </div>
  );
};

export default Signup;
