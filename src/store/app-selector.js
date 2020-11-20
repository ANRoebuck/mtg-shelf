import { APP_STATE } from './app-actions';


export const selectDeckBuilderState = (store) => store[APP_STATE];

export const selectWsConnection = (store) => store[APP_STATE].wsConnection;
