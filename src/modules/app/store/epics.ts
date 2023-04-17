import { RootEpic } from "../../../store/epics";
import { isActionOf } from "typesafe-actions";
import { filter, switchMap, from, catchError, of } from "rxjs";
import {
  loadScriptAction,
  loadScriptRequestAction,
  pushRoute,
  putMessage,
} from "./actions";
import qs from "querystring";
import { ROUTES } from "../../../history";
import { navigateTo } from "../../../history";
import { MESSAGE_TYPE, loadScript, notifyUser } from "../../../helpers";

const navigateEpic: RootEpic = (actions$) =>
  actions$.pipe(
    filter(isActionOf(pushRoute)),
    switchMap(({ payload }) => {
      let extras = "";
      if (payload.extras) {
        extras += `?${qs.stringify(payload.extras)}`;
      }
      const route = payload.route + extras;

      navigateTo(route as ROUTES);
      return [];
    })
  );

const messageEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(putMessage)),
    switchMap(({ payload }) => {
      if (typeof payload === "string") {
        notifyUser(payload);
      } else {
        notifyUser(payload.message, payload.type as MESSAGE_TYPE)
      }
      return [];
    })
  );

const initLoadScriptEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(loadScriptAction)),
    switchMap(({ payload }) => {
      return [
        
        loadScriptRequestAction.request(payload),
      ];
    })
  );

const loadScriptEpic: RootEpic = (action$) =>
  action$.pipe(
    filter(isActionOf(loadScriptRequestAction.request)),
    switchMap(({ payload }) => {
      return from(loadScript(payload)).pipe(
        switchMap((res) => {
          return of(
            loadScriptRequestAction.success({
              loaded: true,
              error: false,
              script: payload,
            })
          );
        }),
        catchError((err) => {
          return of(
            loadScriptRequestAction.failure({
              loaded: false,
              error: true,
              script: payload,
            }),
          );
        })
      );
    })
  );

const loadScriptDone: RootEpic = action$ =>
    action$.pipe(
      filter(isActionOf([loadScriptRequestAction.success])),
      switchMap(({payload}) => {
        return  of(putMessage({
            type: payload.error ? 'error' : 'success',
            message: payload.error ? 'Failed to load ' + payload.script + ' script' :
            'Loaded ' + payload.script + ' script' ,
           })
        )
      })
    )
const AppEpics = [navigateEpic, initLoadScriptEpic, loadScriptEpic, messageEpic, loadScriptDone];

export default AppEpics;
