import {createAction} from 'typesafe-actions';
import { ROUTES } from "../../../history";

export const clearMessage = createAction("SHOP_APP/APP/CLEAR_MESSAGE")();

export const putMessage = createAction("SHOP_APP/APP/PUT_MESSAGE")<
{ type: "success" | "error" | "info"; message: string;},
  any
>();



export const pushRoute = createAction("SHOP_APP/APP/NAVIGATE")<{
  route: ROUTES;
  extras?: Record<string, any>;
}>();

export const setLoading = createAction("SHOP_APP/APP/SET_LOADING")<boolean>();
