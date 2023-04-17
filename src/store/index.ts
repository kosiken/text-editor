import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import thunk from 'redux-thunk';
import api from '../services/api';
import { RootState, Services } from '../types';
import { Actions, configureEpic } from './epics';
import { logger } from './middleware';
import appReducer from '../modules/app/store/appReducer';




// we use this global store variable so that we can keep a reference 
// to the redux store retrieve this later on for example
// in the (redux-observable) https://redux-observable.js.org/  epics
let AppStore:  ToolkitStore<RootState, Actions, any[]>;



const initialzeStore = () => {

  const rootReducer = combineReducers<RootState, Actions>({
    app: appReducer,
  });

  const services: Services = {
    api,
    getStore: () => AppStore,
  };
  const { rootEpic, epicMiddleware } = configureEpic(services);

  const baseMiddleWare = [thunk, logger, epicMiddleware];

  let store = configureStore<RootState, Actions, any[]>({
    reducer: rootReducer,
    middleware: baseMiddleWare,
    devTools: process.env.NODE_ENV !== 'production',

  });
  epicMiddleware.run(rootEpic);
 
  
  /**
   *  ideally you'd want to do something like
   * let persistor = persistStore(store); 
   * so that local storage logic is handled for you
   */
  AppStore = store;
  return store;
};

export {AppStore};

export default initialzeStore
