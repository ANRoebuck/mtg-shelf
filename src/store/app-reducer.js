import Immutable from 'seamless-immutable';
import { SET_WS_CONNECTION } from "./app-actions";


export const defaultState = Immutable.from({
  wsConnection: null,
});

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET_WS_CONNECTION:
      return state.set('wsConnection', action.wsConnection);
    default:
      return state;
  }
};
