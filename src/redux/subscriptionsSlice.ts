import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosConfig from "axiosConfig";
import { subsciptionPlan } from "../../types/data";

// Define an asynchronous action using createAsyncThunk
export const fetchSubscriptions = createAsyncThunk(
  "counter/fetchData",
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
      // console.log(data, currentSubscription);

      return { data, currentSubscription };
    } catch (error) {
      throw new Error("An error occurred while fetching subscriptions.");
    }
  }
);

export interface subsciptionState {
  data: any;
  currentSubscription: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: subsciptionState = {
  data: [],
  currentSubscription: {},
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
        state.data = action.payload.data;
        state.currentSubscription = action.payload.currentSubscription;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "An error occurred";
        state.currentSubscription = [];
        state.data = [];
      });
  },
});

// Action creators are generated for each case reducer function
export default subscriptionsSlice.reducer;
