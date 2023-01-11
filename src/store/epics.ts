import {
    combineEpics,
    Epic,
    EpicMiddleware,
    createEpicMiddleware,
  } from 'redux-observable';
  import {Services, RootState} from '../types';
  import * as appActions from '../modules/app/store/actions';
  import * as shopActions from '../modules/shopping-list/store/actions';
  import * as cartActions from '../modules/shopping-cart/store/actions';
  import AppEpics from '../modules/app/store/epics';
  import ShoppingListEpics from '../modules/shopping-list/store/epics';
  import ShoppingCartEpics from '../modules/shopping-cart/store/epics';

  import {ActionType} from 'typesafe-actions';
  
  interface EpicConfiguration {
    rootEpic: RootEpic;
    epicMiddleware: EpicMiddleware<Actions, Actions, RootState, Services>;
  }
  export type Actions = ActionType<typeof appActions> | ActionType<typeof shopActions>
                        | ActionType<typeof cartActions>;
  
  
  // Redux observable is basically a library for running redux side effects
  // so whenever a redux action is dispatched and you want to take an action 
  // because of that action. redux-observable helps you do that.
  // https://redux-observable.js.org/
  export type RootEpic = Epic<Actions, Actions, RootState, Services>;
  interface EpicConfiguration {
    rootEpic: RootEpic;
    epicMiddleware: EpicMiddleware<Actions, Actions, RootState, Services>;
  }
  
  export const configureEpic = (services: Services): EpicConfiguration => {
    const rootEpic = combineEpics(    
      ...AppEpics,
      ...ShoppingListEpics,
      ...ShoppingCartEpics
    );
    const epicMiddleware = createEpicMiddleware<
      Actions,
      Actions,
      RootState,
      Services
    >({
      dependencies: services,
    });
  
    return {
      rootEpic,
      epicMiddleware,
    };
  };
  