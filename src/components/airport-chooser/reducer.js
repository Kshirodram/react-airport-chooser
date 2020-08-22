import * as actions from "./action";

export const initialState = {
  result: [],
  isLoading: false,
  error: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_AIRPORT:
      return { ...state, isLoading: true };
    case actions.GET_AIRPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
        error: null,
      };
    case actions.GET_AIRPORT_ERROR:
      return { ...state, isLoading: false, result: [], error: action.payload };

    default:
      return { ...state };
  }
};

export default reducer;
