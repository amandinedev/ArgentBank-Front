// authSlice.js - Handles authentication-related state and actions using Redux Toolkit

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Make a POST request to the API endpoint
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      if (response.data && response.data.body && response.data.body.token) {
        sessionStorage.setItem("token", response.data.body.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // Retrieve token from sessionStorage if available
    token: sessionStorage.getItem("token") || null, 
    // Initialize based on the presence of a token
    isAuthenticated: Boolean(sessionStorage.getItem("token")), 
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Update authentication to false on logging out
      state.isAuthenticated = false; 
      // Remove token from session storage
      sessionStorage.removeItem("token"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.body;
        // Ensure token is saved correctly
        state.token = action.payload.body.token; 
        // Save token to sessionStorage
        sessionStorage.setItem("token", action.payload.body.token); 
        console.log("authToken", action.payload.body.token);
        // Set authenticated to true on successful login
        state.isAuthenticated = true; 
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
