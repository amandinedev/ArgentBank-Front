// userSlice.js - Manages user profile state and related actions using Redux Toolkit

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { selectCurrentToken } from "./authSlice";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = selectCurrentToken(getState());

      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch profile"
        );
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ firstName, lastName }, { getState, rejectWithValue }) => {
    try {
      const token = selectCurrentToken(getState());

      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.body;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to update profile"
        );
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = "failed";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = "failed";
      });
  },
});

export const selectUserProfile = (state) => state.user.userProfile;

export default userSlice.reducer;
