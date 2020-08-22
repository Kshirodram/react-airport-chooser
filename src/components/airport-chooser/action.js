export const GET_AIRPORT = "GET_AIRPORT";
export const GET_AIRPORT_SUCCESS = "GET_AIRPORT_SUCCESS";
export const GET_AIRPORT_ERROR = "GET_AIRPORT_ERROR";

export const getAirportAction = () => ({
  type: GET_AIRPORT,
});

export const getAirportSuccessAction = (payload) => ({
  type: GET_AIRPORT_SUCCESS,
  payload,
});
export const getAirportErrorAction = (payload) => ({
  type: GET_AIRPORT_ERROR,
  payload,
});

export const callToAPI = async (dispatch) => {
  dispatch(getAirportAction());
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json"
    );
    if (response.ok) {
      // if HTTP-status is 200-299
      const data = await response.json();
      dispatch(getAirportSuccessAction(data));
    } else {
      throw new Error({
        status: response.status,
        message: "Error during api call.",
      });
    }
  } catch (e) {
    dispatch(getAirportErrorAction(e));
  }
};
