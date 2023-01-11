import {createSelector} from 'reselect';
import { selectRootState } from '../../../store/selectors';

export const selectCart = createSelector(
    [selectRootState],
    state => state.cart.cart,
  );


  export const selectCartItemAmount =(item: string) =>  createSelector(
    [selectCart],
    state => state[item] ? state[item] : 0,
  );

  export const selectCartItemsCount = createSelector(
    [selectCart],
    state => Object.keys(state).length,
  )