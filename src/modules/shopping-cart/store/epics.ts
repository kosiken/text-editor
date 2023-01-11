import { RootEpic } from "../../../store/epics";
import { isActionOf } from "typesafe-actions";
import { filter, from, switchMap,  withLatestFrom, map} from "rxjs";
import { addRemoveFromCart, initCart, setCart } from "./actions";
import { selectCart } from "./selectors";
import { putMessage } from "../../app/store/actions";
import { fetchCartFromStorage, setCartInLocalStorage  } from "../helpers";

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
    )

const addRemoveCartEpic: RootEpic = (action$, state$, {api}) =>
    action$.pipe(
        filter(isActionOf(addRemoveFromCart)),
        withLatestFrom(state$),
        switchMap(([{payload}, state]) => {
            const cart = {...selectCart(state)};
            let message = ""

            if(payload.add) {
                if(!cart[payload.item]) {
                    cart[payload.item] = 1;
                
                }
                else {
                    cart[payload.item]++;
                }
                message = "item added successfully";
            }
            else {
                if(cart[payload.item]) {
                    if(cart[payload.item] === 1) {
                        delete cart[payload.item];
                        message = "item completely removed successfully";
                    }
                    else {
                        cart[payload.item]--;
                        message = "item removed successfully";
                    }
                }
                
            }
            return from(setCartInLocalStorage(cart))
            .pipe(
                switchMap((success) => {
                    if(success) {
                        return [setCart(cart), putMessage({type: 'info', message})];
                    }
                    else {
                        return [putMessage({type: "error", message: 'Failed to save cart'})]
                    }
                })
            )
          
        })
    )


const CartpingListEpics = [
    initCartEpic,
    addRemoveCartEpic,
]

export default CartpingListEpics;
