export const APP_STATE = 'app';
export const SET_WS_CONNECTION = `${APP_STATE}/SET_WS_CONNECTION`;


export const setWsConnection = (wsConnection) => (dispatch) => {
  dispatch({
    type: SET_WS_CONNECTION,
    wsConnection
  });
};
