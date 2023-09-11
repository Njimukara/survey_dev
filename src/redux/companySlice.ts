import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosConfig from "axiosConfig";
import { RootState } from "./store";

export const fetchCompanyData = createAsyncThunk(
  "counter/fetchCompany", // Action type prefix
  async (
    { apiEndpoint, force }: { apiEndpoint: string; force?: boolean },
    { getState }
  ) => {
    const state = getState() as RootState; // Explicitly define the type of state
    if (!force) {
      // Check if data is already present in the store
      if (state.reduxStore.company.company) {
        return state.reduxStore.company.company; // Return the existing data from the store
      }
    }

    try {
      const response = await axiosConfig.get(apiEndpoint);
      const data = await response.data;
      return data;
    } catch (error) {
      //   throw companyError;
      return error;
    }
  }
);

export const fetchCompanyInvites = createAsyncThunk(
  "counter/fetchCompanyInvites", // Action type prefix
  async ({ force }: { force?: boolean }, { getState }) => {
    const state = getState() as RootState; // Explicitly define the type of state
    if (!force) {
      // Check if data is already present in the store
      if (state.reduxStore.company.company) {
        return state.reduxStore.company.company; // Return the existing data from the store
      }
    }

    try {
      const response = await axiosConfig.get(
        "/api/company/companymembers/invitations/"
      );
      const data = await response.data;
      return data;
    } catch (error) {
      //   throw companyError;
      return error;
    }
  }
);

export const fetchCompanyMembers = createAsyncThunk(
  "counter/fetchCompanyMembers", // Action type prefix
  async (
    { apiEndpoint, force }: { apiEndpoint: string; force?: boolean },
    { getState }
  ) => {
    const state = getState() as RootState; // Explicitly define the type of state
    if (!force) {
      // Check if data is already present in the store
      if (state.reduxStore.company.company) {
        return state.reduxStore.company.company; // Return the existing data from the store
      }
    }

    try {
      const response = await axiosConfig.get(apiEndpoint);
      const data = await response.data;

      return data;
    } catch (error) {
      //   throw companyError;
      return error;
    }
  }
);

export interface CompanyStoreState {
  value: number;
  company: any;
  companyMembers: [];
  companyInvites: any;
  companyLoading: boolean;
  membersLoading: boolean;
  membersError: string | null;
  companyError: string | null;
  invitesError: string | null;
  invitesLoading: boolean;
}

const initialState: CompanyStoreState = {
  value: 0,
  company: {},
  companyMembers: [],
  companyInvites: [],
  companyLoading: false,
  membersLoading: true,
  membersError: null,
  companyError: null,
  invitesError: null,
  invitesLoading: false,
};

export const companySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.companyLoading = true;
        state.companyError = null;
      })
      .addCase(fetchCompanyData.fulfilled, (state, action) => {
        state.companyLoading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompanyData.rejected, (state, action) => {
        state.companyLoading = false;
        state.companyError = action.error.message || "An error occurred";
      })
      .addCase(fetchCompanyMembers.pending, (state) => {
        state.membersLoading = true;
        state.membersError = null;
      })
      .addCase(fetchCompanyMembers.fulfilled, (state, action) => {
        state.membersLoading = false;
        state.companyMembers = action.payload;
      })
      .addCase(fetchCompanyMembers.rejected, (state, action) => {
        state.membersLoading = false;
        state.membersError = action.error.message || "An error occurred";
      })
      .addCase(fetchCompanyInvites.pending, (state) => {
        state.invitesLoading = true;
        state.invitesError = null;
      })
      .addCase(fetchCompanyInvites.fulfilled, (state, action) => {
        state.invitesLoading = false;
        state.companyInvites = action.payload;
      })
      .addCase(fetchCompanyInvites.rejected, (state, action) => {
        state.invitesLoading = false;
        state.invitesError = action.error.message || "An error occurred";
      });
  },
});

// Action creators are generated for each case reducer function

export default companySlice.reducer;
