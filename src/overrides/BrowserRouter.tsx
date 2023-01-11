import * as React from "react";

import { BrowserHistory } from "history";
import {

    Router,

  } from "react-router";
import { BrowserRouterProps } from "react-router-dom";
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 *
 * @see https://reactrouter.com/docs/en/v6/routers/browser-router
 */
 export function BrowserRouter({
    basename,
    children,
    navigator
  }: BrowserRouterProps & {navigator: BrowserHistory}  ) {
    let historyRef = React.useRef<BrowserHistory>(navigator);

  
    let history = historyRef.current;
    let [state, setState] = React.useState({
      action: history.action,
      location: history.location,
    });
  
    React.useLayoutEffect(() => history.listen(setState), [history]);
  
    return (
      <Router
        basename={basename}
        children={children}
        location={state.location}
        navigationType={state.action}
        navigator={history}
      />
    );
  }