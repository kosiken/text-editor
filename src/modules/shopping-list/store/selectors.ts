import {createSelector} from 'reselect';
import { selectRootState } from '../../../store/selectors';

export const selectShopState = createSelector(
    [selectRootState],
    state => state.shop,
  );



export const selectShopListLoading = createSelector(
    [selectShopState],
    state => state.fetchingItems,
);


export const selectShoppingList = createSelector(
    [selectShopState],
    state => state.items,
);



export const selectShoppingItem = (id?: number) => {

    return createSelector(
        [selectShopState],
        state => {
            if(state.items.length < 1) {
                // shopping items have not been loaded yet
                return false;
            }
            // Shopping items loaded
            // returns undefined if *id* is invalid or item is not
            // found in the shopping list
           return !id ? undefined : state.items.find(item => item.productId === id)
        },
    )
}