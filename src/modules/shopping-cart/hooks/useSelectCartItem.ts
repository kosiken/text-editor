import { useMemo } from "react"
import { GiftCard } from "../../../types"


const useSelectCartItem = (itemId: string, shoppingListItems: GiftCard[]) => {
    const item = useMemo(() => {
        return shoppingListItems.find(item => (item.productId.toString()) === itemId );
    }, [itemId, shoppingListItems]); 
    return item;
};

export default useSelectCartItem;
