import { RootEpic } from "../../../store/epics";
import { isActionOf } from "typesafe-actions";
import { filter, switchMap } from "rxjs";
import {  pushRoute } from "./actions";
import qs from "querystring";
import { ROUTES } from "../../../history";
import { navigateTo } from "../../../history";

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
const AppEpics = [navigateEpic];

export default AppEpics;
