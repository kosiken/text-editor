import { createAsyncAction} from 'typesafe-actions';
import { GiftCard } from '../../../types';

export const fetchShoppingItems = createAsyncAction(
    'SHOP_APP/SHOPPING_LIST/LOAD/REQUEST',
    'SHOP_APP/SHOPPING_LIST/LOAD/SUCCESS',
    'SHOP_APP/SHOPPING_LIST/LOAD/FAILURE'
    )<void, GiftCard[],  any>();

