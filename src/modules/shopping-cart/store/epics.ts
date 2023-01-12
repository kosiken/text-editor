import { RootEpic } from '../../../store/epics';
import { isActionOf } from 'typesafe-actions';
import { filter, from, switchMap, withLatestFrom, map, delay } from 'rxjs';
import { addRemoveFromCart, checkout, initCart, setCart } from './actions';
import { selectCart } from './selectors';
import { pushRoute, putMessage } from '../../app/store/actions';
import { clearCartFromStorage, fetchCartFromStorage, setCartInLocalStorage } from '../helpers';
import { ROUTES } from '../../../history';

const initCartEpic: RootEpic = action$ =>
    action$.pipe(
        filter(isActionOf(initCart)),
        switchMap(() => {
            return from(fetchCartFromStorage())
                .pipe(
                    map((data) => {
                        return setCart(data);
                    })
                )
        })
    );

const addRemoveCartEpic: RootEpic = (action$, state$, { api }) =>
    action$.pipe(
        filter(isActionOf(addRemoveFromCart)),
        withLatestFrom(state$),
        switchMap(([{ payload }, state]) => {
            const cart = { ...selectCart(state) };
            let message = ''

            if (payload.add) {
                if (!cart[payload.item]) {
                    cart[payload.item] = 1;

                }
                else {
                    cart[payload.item]++;
                }
                message = 'item added successfully';

            }
            else {
                if (cart[payload.item]) {
                    if (cart[payload.item] === 1) {
                        delete cart[payload.item];
                        message = 'item completely removed successfully';
                    }
                    else {
                        cart[payload.item]--;
                        message = 'item removed successfully';
                    }
                }

            }
            const count = cart[payload.item];
            if (count > 1) {
                message += `, You now have ${count} of this in your cart`
            }

            return from(setCartInLocalStorage(cart))
                .pipe(
                    switchMap((success) => {
                        if (success) {
                            return [setCart(cart), putMessage({ type: 'info', message })];
                        }
                        else {
                            return [putMessage({ type: 'error', message: 'Failed to save cart' })]
                        }
                    })
                )

        })
    );

const checkOutEpic: RootEpic = action$ =>
    action$.pipe(
        filter(isActionOf(checkout.request)),
        // simiulate checkout request wait time
        delay(1500),
        switchMap(() => {
            return from(clearCartFromStorage())
                .pipe(
                    switchMap((res) => {
                        if (res) {
                            return [setCart({}), putMessage({
                                type: 'info',
                                message: 'Checkout was successful, thanks for shopping'
                            }), checkout.success(),
                        
                        pushRoute({
                            route: ROUTES.ROOT
                        })]
                        }
                        else {
                            return [
                                putMessage({
                                    type: 'error',
                                    message: 'An error occurred'
                                }),
                                checkout.failure(),

                            ]
                        }
                    })
                )
        })
    );

const CartpingListEpics = [
    initCartEpic,
    addRemoveCartEpic,
    checkOutEpic,
];

export default CartpingListEpics;
