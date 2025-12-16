import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      // Save the token to local storage if the request is successful
      if (response.data && response.data.body && response.data.body.token) {
        localStorage.setItem("token", response.data.body.token);
        console.log("Token saved to local storage");
      }
      return response.data;
    } catch (error) {
      // Return custom error message from API if available
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null, // Retrieve token from localStorage if available
    isAuthenticated: Boolean(localStorage.getItem("token")), // Initialize based on the presence of a token
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Update authentication to false on logging out
      localStorage.removeItem("token"); // Remove token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.body;
        state.token = action.payload.body.token; // Ensure token is saved correctly
        localStorage.setItem("token", action.payload.body.token); // Save token to localStorage
        console.log("authToken", action.payload.body.token);
        state.isAuthenticated = true; // Set authenticated to true on successful login
        state.status = "succeeded";
        state.error = null; // Clear any previous errors on successful login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated; // Selector for authentication status

export default authSlice.reducer;
