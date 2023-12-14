import axios from "axios";
import { baseUrl } from "../../ConstantVariables";

//register user
const signup = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      baseUrl + "api/auth/signup",
      userData,
      config
    );

    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};
//login user
const login = async (userData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      baseUrl + "api/auth/login",
      userData,
      config
    );

    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};

const AuthService = { signup,login };
export default AuthService;
