import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [creds, setCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    cPassword: "",
  });
  const onChangeHandler = (e) => {
    // alert(e.target.name, e.target.value)
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  return (
    <div className="signup-container">
      <div className="signup-img-container"></div>
      <div className="signup-form-container">
        <div className="signin-top-button-container">
          <button>SIGN IN</button>
        </div>
        <div className="heading-text">
          <h1> Explore & Experience</h1>
          <h3> Get onto most comfortable journey. All the way up</h3>
        </div>
        <form>
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
            <button type="submit" className="signup-submit-button">
              GET STARTED
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
