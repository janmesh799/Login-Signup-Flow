import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./AuthService";
const authToken = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const initialState = {
  isLoggedIn: authToken === null ? false : true,
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  authToken: authToken ? authToken : null,
  isError: false,
  errorMessage: null,
};

export const AuthSignup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      // console.log(userData);
      const response = await AuthService.signup(userData);
      if (response.success) return response;
      else {
        throw new Error(response.error.message || response.error.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AuthLogin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      // console.log(userData);
      const response = await AuthService.login(userData);
      if (response.success) return response;
      else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.user = null;
      state.authToken = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    setErrorValueNull: (state) => {
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AuthSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AuthSignup.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.authToken = action.payload.authToken;
          localStorage.setItem("authToken", state.authToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(AuthSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.errorMessage = "error: " + action.payload;
      })
      .addCase(AuthLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AuthLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.authToken = action.payload.authToken;
          localStorage.setItem("authToken", state.authToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(AuthLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.errorMessage = "error: " + action.payload;
      });
  },
});

export const { logout, setErrorValueNull } = AuthSlice.actions;
export default AuthSlice.reducer;
