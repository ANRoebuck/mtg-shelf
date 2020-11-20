import { APP_STATE } from './app-actions';


export const selectDeckBuilderState = (store) => store[APP_STATE];

export const selectDeckName = (store) => store[APP_STATE].wsConnection;
