import { createAction} from 'typesafe-actions';

export const addRemoveFromCart = createAction('SHOP_APP/SHOPPING_CART/ADD_OR_REMOVE_CART')<{item: string, add: boolean}>();


export const setCart = createAction('SHOP_APP/SHOPPING_CART/SET_CART')<Record<string, number>>();

export const initCart = createAction('SHOP_APP/SHOPPING_CART/INIT')<void>();
