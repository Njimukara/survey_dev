import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "axiosConfig";
import { RootState } from "./store";

export const fetchSurveyHistory = createAsyncThunk(
  "counter/fetchSurveyHistory",
  async ({ force }: { force?: boolean }, { getState }) => {
    const state = getState() as RootState;

    if (!force) {
      // Check if data is already present in the store
      if (state.reduxStore.surveyHistory.surveyHistory) {
        return state.reduxStore.surveyHistory.surveyHistory;
      }
    }

    const subscription = state.reduxStore.subscrptions.data.currentSubscription;

    try {
      const assignedSurveys = subscription?.assigned_surveys;
      const fetchPromises = assignedSurveys?.map(async (survey: any) => {
        const result = await axiosConfig.get(
          `api/surveys/${survey.code}/results/`
        );
        // console.log("individual surveyhistory", result);
        return result.data;
      });

      const results = await Promise.all(fetchPromises);
      const combinedResults = results.reduce(
        (acc, cur) => [...acc, ...cur],
        []
      );
      // console.log("individual surveyhistory", results, combinedResults);
      return { results, combinedResults };
    } catch (err) {
      // console.error("surveyhistory", err);
      return err;
    }
  }
);

export const fetchCompanySurveys = createAsyncThunk(
  "counter/fetchCompanySurveys", // Action type prefix
  async ({ force }: { force?: boolean }, { getState }) => {
    const state = getState() as RootState;
    if (!force) {
      // Check if data is already present in the store
      if (state.reduxStore.surveyHistory.companySurveys) {
        return state.reduxStore.surveyHistory.companySurveys; // Return the existing data from the store
      }
    }
    const subscription = state.reduxStore.subscrptions.data.currentSubscription;
    try {
      const assignedSurveys = subscription?.assigned_surveys;
      const surveyRequests = assignedSurveys?.map(
        async (survey: { code: any }) => {
          const result = await axiosConfig.get(
            `api/surveys/${survey.code}/company-results/`
          );
          return result.data;
        }
      );
      // console.log("company", surveyRequests);
      const results = await Promise.all(surveyRequests);
      const combinedResults = results.reduce(
        (acc: any, cur: any) => [...acc, ...cur],
        []
      );
      // console.log("company", combinedResults, results);
      return { combinedResults, results };
    } catch (err) {
      // console.error("company history", err);
      return err;
    }
  }
);

export interface surevyHistoryState {
  surveyHistory: any;
  companySurveys: any;
  mergedSurveyHistory: any;
  mergedCompanySurveys: any;
  surveyHistoryLoading: boolean;
  companySurveysLoading: boolean;
  companySurveysError: string | null;
  surveyHistoryError: string | null;
}

const initialState: surevyHistoryState = {
  surveyHistory: [],
  mergedSurveyHistory: [],
  companySurveys: [],
  mergedCompanySurveys: [],
  surveyHistoryLoading: false,
  companySurveysLoading: false,
  companySurveysError: null,
  surveyHistoryError: null,
};

export const surveyHisorySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveyHistory.pending, (state) => {
        state.surveyHistoryLoading = true;
        state.surveyHistoryError = null;
      })
      .addCase(fetchSurveyHistory.fulfilled, (state, action) => {
        state.surveyHistoryLoading = false;
        state.surveyHistory = action.payload.results;
        state.mergedSurveyHistory = action.payload.combinedResults;
      })
      .addCase(fetchSurveyHistory.rejected, (state, action) => {
        state.surveyHistoryLoading = false;
        state.surveyHistoryError = action.error.message || "An error occurred";
      })
      .addCase(fetchCompanySurveys.pending, (state) => {
        state.companySurveysLoading = true;
        state.companySurveysError = null;
      })
      .addCase(fetchCompanySurveys.fulfilled, (state, action) => {
        state.companySurveysLoading = false;
        state.companySurveys = action.payload.results;
        state.mergedCompanySurveys = action.payload.combinedResults;
      })
      .addCase(fetchCompanySurveys.rejected, (state, action) => {
        state.companySurveysLoading = false;
        state.companySurveysError = action.error.message || "An error occurred";
      });
  },
});

// Action creators are generated for each case reducer function

export default surveyHisorySlice.reducer;
