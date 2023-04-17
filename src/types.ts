/**
 * ts definition file for all the possible types we can have in 
 * the application
 */

import { MainApi } from './services/api';
import { Store } from 'redux';


export interface AppState {
   isLoading: boolean;
   hasError: boolean;
   errorMessage?: string;
   loading: Record<SCRIPTS_ENUM, boolean>,
   loaded: Record<SCRIPTS_ENUM, boolean>,
   error:  Record<SCRIPTS_ENUM, boolean>,

}


export interface RootState {
  app: AppState;

}
export interface EDITOR_APPResponse<T> {
    status: boolean;
    message: string;
    data: T;
  }
  export interface Services {
    api:  MainApi,
    getStore: () => Store<{
      app: AppState;
    }>;
  }



export enum SCRIPTS_ENUM {
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
};
