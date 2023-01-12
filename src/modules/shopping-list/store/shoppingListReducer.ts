import {createReducer} from 'typesafe-actions';
import { Actions } from '../../../store/epics';
import { fetchShoppingItems } from './actions';
import { ShopState } from "../../../types";

const initialState: ShopState = {
    fetchingItems: false,
    items: []
}

export default createReducer<ShopState, Actions>(initialState)
.handleAction(fetchShoppingItems.request, (state) => {
    return {
        ...state,
        fetchingItems: true,
    };
}).handleAction(fetchShoppingItems.failure, (state) => {
    return {
        ...state,
        fetchingItems: false,
    };
})
.handleAction(fetchShoppingItems.success, (state, {payload}) => {
    return {
        ...state, 
        items: payload,
        fetchingItems: false,
    }
})