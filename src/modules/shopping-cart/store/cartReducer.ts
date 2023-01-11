import { createReducer } from 'typesafe-actions';
import { Actions } from '../../../store/epics';
import { CartState } from '../../../types';
import { checkout, setCart } from './actions';

const initialState: CartState = {
    cart: {},
    checkingOut: false,
}

const cartReducer = createReducer<CartState, Actions>(initialState)
.handleAction(setCart, (state, {payload})=> {
    return {
        ...state,
        cart: payload,
    }
})
.handleAction(checkout.request, (state) => {
    return {
        ...state, 
        checkingOut: true,
    }
})
.handleAction([checkout.success, checkout.failure], (state) => {
    return {
        ...state, 
        checkingOut: false,
    }
});

export default cartReducer;
