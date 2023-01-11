import { useMemo } from "react"
import { GiftCard } from "../../../types"


const useSelectCartItem = (itemId: string, shoppingListItems: GiftCard[]) => {
    // Because this can become an expensive operationm if the shoppingList
    // is very large we use useMemo here to make it a value that is re-evaluated 
    // only sparingly. 
    const item = useMemo(() => {
        return shoppingListItems.find(item => (item.productId.toString()) === itemId );
    }, [itemId, shoppingListItems]); 
    return item;
};

export default useSelectCartItem;
