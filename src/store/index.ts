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


import shoppingListReducer from '../modules/shopping-list/store/shoppingListReducer';
import cartReducer from '../modules/shopping-cart/store/cartReducer';
import { initCart } from '../modules/shopping-cart/store/actions';


// we use this global store variable so that we can keep a reference 
// to the redux store retrieve this later on for example
// in the (redux-observable) https://redux-observable.js.org/  epics
let s:  ToolkitStore<RootState, Actions, any[]>;



const initialzeStore = () => {

  const rootReducer = combineReducers<RootState, Actions>({
    app: appReducer,
    shop: shoppingListReducer,
    cart: cartReducer,
  });

  const services: Services = {
    api,
    getStore: () => s,
  };
  const { rootEpic, epicMiddleware } = configureEpic(services);

  const baseMiddleWare = [thunk, logger, epicMiddleware];

  let store = configureStore<RootState, Actions, any[]>({
    reducer: rootReducer,
    middleware: baseMiddleWare,
    devTools: process.env.NODE_ENV !== 'production',

  });
  epicMiddleware.run(rootEpic);

  // we want to load all the cart items before the app fully initializes
  store.dispatch(initCart());
  
  /**
   *  ideally you'd want to do something like
   * let persistor = persistStore(store); 
   * so that local storage logic is handled for you
   */
  s = store;
  return store;
};



export default initialzeStore
