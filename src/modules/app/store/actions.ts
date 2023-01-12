import {createAction} from 'typesafe-actions';
import { ROUTES } from "../../../history";

/**
 * Clears the current message being shown
 */
export const clearMessage = createAction("SHOP_APP/APP/CLEAR_MESSAGE")();

/**
 * Adds a message to the state to be displayed
 */
export const putMessage = createAction("SHOP_APP/APP/PUT_MESSAGE")<
{ type: "success" | "error" | "info"; message: string;},
  any
>();

/**
 * Used to route from inside of the react code instead of
 * based on user interraction
 */
export const pushRoute = createAction("SHOP_APP/APP/NAVIGATE")<{
  route: ROUTES;
  extras?: Record<string, any>;
}>();
