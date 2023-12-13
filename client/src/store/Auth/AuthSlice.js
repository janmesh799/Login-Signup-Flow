import { createSlice } from "@reduxjs/toolkit";
const authToken = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const initialState = {
  isLoggedIn: authToken === null ? false : true,
  isLoading: false,
  user: JSON.parse(user),
  authToken: authToken ? authToken : null,
  isError: false,
  errorMessage: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
