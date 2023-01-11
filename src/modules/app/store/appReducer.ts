import {createReducer} from 'typesafe-actions';

import { Actions } from '../../../store/epics';
import { clearMessage, putMessage} from './actions';

import { AppState } from "../../../types";


const initialState: AppState = {
    isLoading: true,
    messageType: 'info',
}

export default createReducer<AppState, Actions>(initialState)
.handleAction(putMessage, (state, {payload}) => {
    return {
        ...state,
        message: payload.message,
        messageType: payload.type
    };
}).handleAction(clearMessage, (state) => {
    return {
        ...state,
        message: undefined,
        messageType: 'info'
    };
})