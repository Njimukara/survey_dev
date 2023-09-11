// reduxUtils.js

import { useSelector } from "react-redux";

export function selectDataFromReduxStore(state) {
  return state.reduxStore.todos; // Replace with your Redux state and selector
}
