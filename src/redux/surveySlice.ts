import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosConfig from "axiosConfig";

// Define an asynchronous action using createAsyncThunk
export const fetchSurveys = createAsyncThunk(
  "counter/fetchSurveys", // Action type prefix
  async () => {
    try {
      const response = await axiosConfig.get("/api/surveys");
      const surveys = response?.data;

      return surveys;
    } catch (error) {
      throw new Error("An error occurred while fetching surveys.");
    }
  }
);

export interface surveyState {
  surveys: any;
  lidarSurvey: any;
  multibeamSurvey: any;
  sideScanSurvey: any;
  acousticSurvey: any;
  surveyLoading: boolean;
  surveyError: string | null;
}

const initialState: surveyState = {
  surveys: [],
  surveyLoading: false,
  surveyError: null,
  lidarSurvey: {},
  multibeamSurvey: {},
  sideScanSurvey: {},
  acousticSurvey: {},
};

export const surveySlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateSurveys: (state, action) => {
      state.surveys = action.payload;
    },
    updateLidarSurvey: (state, action) => {
      // You can update state properties here based on the action payload
      state.lidarSurvey = action.payload;
    },
    updateMultibeamSurvey: (state, action) => {
      state.multibeamSurvey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveys.pending, (state) => {
        state.surveyLoading = true;
        state.surveyError = null;
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.surveyLoading = false;
        state.surveys = action.payload;
        if (Array.isArray(action.payload)) {
          action.payload.forEach((survey: any) => {
            if (survey.name.toLowerCase().includes("multibeam")) {
              state.multibeamSurvey = survey;
            } else if (survey.name.toLowerCase().includes("dynamic")) {
              state.lidarSurvey = survey;
            } else if (survey.name.toLowerCase().includes("side")) {
              state.sideScanSurvey = survey;
            } else if (survey.name.toLowerCase().includes("acoustic")) {
              state.acousticSurvey = survey;
            }
          });
        } else {
          // Handle the case where action.payload is not an array
          // You might want to set some default values or handle it differently
        }
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.surveyLoading = false;
        state.surveyError = action.error.message || "An surveyError occurred";
      });
  },
});

export const { updateLidarSurvey, updateMultibeamSurvey, updateSurveys } =
  surveySlice.actions;

// Action creators are generated for each case reducer function
export default surveySlice.reducer;
