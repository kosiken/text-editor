import { RootEpic } from "../../../store/epics";
import { isActionOf } from "typesafe-actions";
import { filter, from, switchMap, map, catchError, of } from "rxjs";
import {  fetchShoppingItems } from "./actions";


const fetchShoppingItemsEpic: RootEpic = (action$, _, {api}) =>
    action$.pipe(
        filter(isActionOf(fetchShoppingItems.request)),
        switchMap(() => {
            const apiKey = process.env.REACT_APP_TOKEN;
            return from(api.fetchGiftCards({countryCode: 'NG'}, {'X-API-KEY': apiKey})).pipe(
                map(res => {
                    if(res.code === 200) {
                        return fetchShoppingItems.success(res.data!.data.giftCardsRLD.content)
                    }
                    return fetchShoppingItems.failure('An error occurred');
                }),
                catchError(() => {
                    return of(fetchShoppingItems.failure('An Error ocurred'))
                })

            )
        })
    )


const ShoppingListEpics = [
    fetchShoppingItemsEpic,
]

export default ShoppingListEpics;
