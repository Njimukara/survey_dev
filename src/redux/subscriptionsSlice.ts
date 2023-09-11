import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosConfig from "axiosConfig";
import { subsciptionPlan } from "../../types/data";

// Define an asynchronous action using createAsyncThunk
export const fetchSubscriptions = createAsyncThunk(
  "counter/fetchData", // Action type prefix
  async (apiEndpoint: string) => {
    let currentSubscription = null;
    try {
      const response = await axiosConfig.get(apiEndpoint);
      const data = await response.data;
      if (data.length > 0) {
        const latestSubscriptionId = data[data.length - 1]?.id;

        try {
          const currentSubscriptionResponse = await axiosConfig.get(
            `/api/plans/subscription/${latestSubscriptionId}/`
          );
          currentSubscription = currentSubscriptionResponse.data;
        } catch (err) {
          currentSubscription = null;
        }
      }
      return { data, currentSubscription };
    } catch (error) {
      throw error;
    }
  }
);

export interface subsciptionState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: subsciptionState = {
  data: {},
  isLoading: false,
  error: null,
};

export const subscriptionsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

// Action creators are generated for each case reducer function
export default subscriptionsSlice.reducer;
