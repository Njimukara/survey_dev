// rootReducer.js
import { combineReducers } from "redux";
import companySlice from "redux/companySlice";
import userReducer from "./userReducer";
import subscriptionsSlice from "../subscriptionsSlice";
import surveyHistorySlice from "redux/surveyHistorySlice";
import { Reducer } from "redux";
import surveySlice from "redux/surveySlice";

const rootReducer: Reducer = combineReducers({
  subscrptions: subscriptionsSlice,
  company: companySlice,
  user: userReducer,
  surveyHistory: surveyHistorySlice,
  surveys: surveySlice,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer; // Export the combined reducer
