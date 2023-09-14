import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosConfig from "axiosConfig";
import { RootState } from "./store";

export const fetchPlans = createAsyncThunk("counter/fetchPlans", async () => {
  try {
    const response = await axiosConfig.get("/api/plans/list-with-price");
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export interface CompanyStoreState {
  plans: any;
  plansLoading: boolean;
  plansError: string | null;
}

const initialState: CompanyStoreState = {
  plans: [],
  plansLoading: false,
  plansError: null,
};

export const planSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.plansLoading = true;
        state.plansError = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.plansLoading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.plansLoading = false;
        state.plansError = action.error.message || "An error occurred";
      });
  },
});

// Action creators are generated for each case reducer function

export default planSlice.reducer;
