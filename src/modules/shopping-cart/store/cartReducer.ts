import { createReducer } from 'typesafe-actions';
import { Actions } from '../../../store/epics';
import { CartState } from '../../../types';
import { setCart } from './actions';

const initialState: CartState = {
    cart: {}
}

const cartReducer = createReducer<CartState, Actions>(initialState)
.handleAction(setCart, (_, {payload})=> {
    return {
        cart: payload,
    }
});

export default cartReducer;
