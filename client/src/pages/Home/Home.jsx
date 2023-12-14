import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Auth/AuthSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Logged In user details</h1>
        <ul
          style={{
            justifySelf: "center",
            listStyle: "none",
            textAlign: "center",
          }}
        >
          <li>
            <strong>Id: </strong> {user._id}
          </li>
          <li>
            <strong>Name: </strong> {user.firstName + " " + user.lastName}
          </li>
          <li>
            <strong>Email: </strong> {user.email}
          </li>
          <li>
            <strong>Username: </strong> {user.username}
          </li>
        </ul>
        <div className="signup-submit-button ">
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>No user Logged In</h1>
        <h3>Redirecting to the login page</h3>
      </div>
    );
  }
};

export default Home;
