// actionTypes.js
export const ADD_TODO = "ADD_TODO";
export const ADD_PLANS = "ADD_PLANS";
export const SET_PLANS = "SET_PLANS";
export const NETWORK_ERROR = "NETWORK_ERROR";
export const SERVER_ERROR = "SERVER_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export const fetchInvitationsRequest = () => ({
  type: "FETCH_INVITATIONS_REQUEST",
});

export const fetchInvitationsSuccess = (invitations) => ({
  type: "FETCH_INVITATIONS_SUCCESS",
  payload: invitations,
});

export const fetchInvitationsFailure = (error) => ({
  type: "FETCH_INVITATIONS_FAILURE",
  payload: error,
});
