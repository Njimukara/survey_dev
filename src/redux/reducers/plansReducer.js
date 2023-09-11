// plansReducer.js
const initialState = {
  plans: [],
  loading: false,
  error: null,
};

const plansReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PLANS":
      return { ...state, plans: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "ADD_PLANS":
      return {
        ...state,
        plans: [...state.plans, action.payload],
      };
    default:
      return state;
  }
};

export default plansReducer;
