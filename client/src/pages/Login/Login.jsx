import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { AuthLogin } from "../../store/Auth/AuthSlice";
import {setErrorValueNull} from "../../store/Auth/AuthSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isError, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    // alert(e.target.name, e.target.value)
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(AuthLogin(creds));
  };
  useEffect(() => {
    document.title = "Login | Login Signup Flow";
    if (isError) {
      toast.error(errorMessage);
      dispatch(setErrorValueNull());
    }
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate, isError, errorMessage, dispatch]);
  return (
    <div className="signup-container">
      <div className="signup-img-container"></div>
      <div className="signup-form-container">
        {!isLoading && (
          <div className="signin-top-button-container">
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              SIGN UP
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
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
              value={creds.password}
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

export default Login;
