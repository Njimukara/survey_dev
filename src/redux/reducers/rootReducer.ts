// rootReducer.js
import { combineReducers } from "redux";
import companySlice from "redux/companySlice";
import userReducer from "./userReducer";
import subscriptionsSlice from "../subscriptionsSlice";
import surveyHistorySlice from "redux/surveyHistorySlice";
import { Reducer } from "redux";
import surveySlice from "redux/surveySlice";
import planSlice from "redux/planSlice";
import { resetAllStates } from "./resetAllState";

// const rootReducer: Reducer = (state, action) => {
//   if (action.type === resetAllStates.type) {
//     state = undefined; // Reset all slices to their initial state
//   }
//   return combineReducers({
//     subscrptions: subscriptionsSlice,
//     company: companySlice,
//     user: userReducer,
//     surveyHistory: surveyHistorySlice,
//     surveys: surveySlice,
//     plans: planSlice,
//   });
// };

const rootReducer: Reducer = combineReducers({
  subscrptions: subscriptionsSlice,
  company: companySlice,
  user: userReducer,
  surveyHistory: surveyHistorySlice,
  surveys: surveySlice,
  plans: planSlice,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer; // Export the combined reducer
