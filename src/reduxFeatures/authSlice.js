// authSlice.js - Handles authentication-related state and actions using Redux Toolkit

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      // if (response.data && response.data.body && response.data.body.token) {
      //   sessionStorage.setItem("token", response.data.body.token);
      // }
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
    token: null, 
    // Initialize based on the presence of a token
    isAuthenticated: false, 
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // clear token in redux store
      state.isAuthenticated = false; 
    },
  },
  extraReducers: (builder) => {
    builder
       .addCase(loginUser.pending, (state) => {
        state.status = "loading"; // Optionally update status to loading
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.body;
        // Ensure token is saved correctly
        state.token = action.payload.body.token; 
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
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated; 
export default authSlice.reducer;
