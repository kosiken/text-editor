import {createAction, createAsyncAction} from 'typesafe-actions';
import { ROUTES } from "../../../history";
import { SCRIPTS_ENUM } from '../../../types';

/**
 * Clears the current message being shown
 */
export const clearMessage = createAction("EDITOR_APP/APP/CLEAR_MESSAGE")();

/**
 * Adds a message to the state to be displayed
 */
export const putMessage = createAction("EDITOR_APP/APP/PUT_MESSAGE")<
  | string
  | { type: "success" | "error" | "info"; message: string; title?: string },
  any
>();
/**
 * Used to route from inside of the react code instead of
 * based on user interraction
 */
export const pushRoute = createAction("EDITOR_APP/APP/NAVIGATE")<{
  route: ROUTES;
  extras?: Record<string, any>;
}>();


export const loadScriptAction = createAction(
  "EDITOR_APP/APP/LOAD_SCRIPT"
)<SCRIPTS_ENUM>();

export const loadScriptRequestAction = createAsyncAction(
  "EDITOR_APP/APP/LOAD_SCRIPT_REQUEST",
  "EDITOR_APP/APP/LOAD_SCRIPT_SUCCESS",
  "EDITOR_APP/APP/LOAD_SCRIPT_FAILURE"
)<
  SCRIPTS_ENUM,
  { script: SCRIPTS_ENUM, loaded: boolean; error: boolean },
  { script: SCRIPTS_ENUM, loaded: boolean; error: boolean }
>();