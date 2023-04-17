import {createReducer} from 'typesafe-actions';

import { Actions } from '../../../store/epics';
import { clearMessage, loadScriptAction, loadScriptRequestAction, putMessage} from './actions';

import { AppState, SCRIPTS_ENUM } from "../../../types";


const initialState: AppState = {
    isLoading: true,
    hasError: false,
    loading: {
        [SCRIPTS_ENUM.FACEBOOK]: false,
        [SCRIPTS_ENUM.TWITTER]: false,
    },
    loaded: {
        [SCRIPTS_ENUM.FACEBOOK]: false,
        [SCRIPTS_ENUM.TWITTER]: false,
    },
    error: {
        [SCRIPTS_ENUM.FACEBOOK]: false,
        [SCRIPTS_ENUM.TWITTER]: false,
    }
}

export default createReducer<AppState, Actions>(initialState)
.handleAction(putMessage, (state, action) => {
    return {...state, errorMessage: typeof(action.payload) === 'string' ? action.payload : action.payload.message};
  })
  .handleAction(clearMessage, (state) => {
    return {
        ...state,
        message: undefined,
        messageType: 'info'
    };
})
.handleAction(loadScriptAction, (state, action) => {
   
      return {...state, loading: {...state.loading, [action.payload]: true}}
    
  })
  .handleAction([loadScriptRequestAction.success, loadScriptRequestAction.failure], (state, action) => {
        console.log(action)
      return {...state, loading: {
        ...state.loading,
        [action.payload.script]: false
      },
      loaded: {
        ...state.loaded,
        [action.payload.script]: action.payload.loaded
      },
      error: {
        ...state.error,
        [action.payload.script]: action.payload.error,
      }
    };
    
    
  });