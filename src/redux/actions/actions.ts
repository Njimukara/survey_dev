// import { networkError, serverError } from './actionTypes';
// actions.js
import axiosConfig from "axiosConfig";
import {
  ADD_TODO,
  NETWORK_ERROR,
  SERVER_ERROR,
  SET_PLANS,
  CLEAR_ERROR,
} from "./actionTypes";

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    text, // The text of the new todo
    id: Date.now(), // Generate a unique ID for the todo
    completed: false, // You can set any initial values for your todos
  },
});

// actions.js
export const networkError = (message: string) => ({
  type: NETWORK_ERROR,
  payload: message,
});

export const serverError = (message: string) => ({
  type: SERVER_ERROR,
  payload: message,
});

export const fetchDataSuccess = (data: any) => ({
  type: SET_PLANS,
  payload: data,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

// actions.js

export const fetchPlans = () => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    try {
      console.log("trying plans fetch");
      const response = await axiosConfig("/api/plans/list-with-price");
      if (!response) {
        // Handle server errors
        const errorMessage = await response.data;
        dispatch(serverError(errorMessage));
        return;
      }

      const data = await response.data;
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      console.log(error);
      // Handle network errors
      // dispatch(networkError(error));
    }
  };
};
