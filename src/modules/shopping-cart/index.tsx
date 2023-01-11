import { useEffect, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Box from '../../design-system/components/Box';
import Skeleton from '../../design-system/components/Skeleton';

import { fetchShoppingItems } from '../shopping-list/store/actions';
import { selectShopListLoading, selectShoppingList } from '../shopping-list/store/selectors';
import CartItem from './components/CartItem';
import { addRemoveFromCart } from './store/actions';
import { selectCart } from './store/selectors';




const ShoppingCart = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, startTransition] = useTransition();
    const dispatch = useDispatch();

    const list = useSelector(selectShoppingList);
    const isLoading = useSelector(selectShopListLoading);
    const cartItems = useSelector(selectCart);

    const addOrRemove = (item: string, add: boolean) => {
        // This helps us with performance 
        startTransition(() => {
            dispatch(addRemoveFromCart({item, add}));
        })
    }

    useEffect(() => {
        if (list.length === 0) {
            dispatch(fetchShoppingItems.request());
        }
    }, [dispatch, list])

    const renderLoading = (count: number) => {

        const numberofSquares = new Array(count).fill(0);
        return (
            <>
                {numberofSquares.map((_, index) => {
                    return (
                        <Box className="loading-indicator-md" key={'loading-indicator-md-' + index} display="flex" >
                            <Box width="40%" minWidth="100px" maxWidth="300px">
                                <Skeleton width={'100%'} height="80px" marginBottom="10px" />
                            </Box>

                            <Box flex={1} paddingX="8px">
                                <Skeleton width="100%" height={'14px'} marginBottom="4px" borderRadius={'5px'} />


                                <Box display={"flex"} width="120px" justifyContent="space-between">
                                    <Skeleton height={'20px'} width="20px" marginRight={"2px"} />
                                    <Skeleton height={'14px'} borderRadius={'5px'} width="80px" />
                                    <Skeleton height={'40px'} width="20px" marginRight={"2px"} />
                                </Box>
                            </Box>



                        </Box>
                    )
                })}

            </>
        )
    }
    return (
        <Box maxWidth="650px" alignItems="center" margin="0 auto" paddingY="10px">
            {isLoading && renderLoading(5)}
            {Object.keys(cartItems).map((item, index) => {
                return (<CartItem key={'cart-item-' + item} itemId={item} shoppingListItems={list} addOrRemove={addOrRemove} />)
            })}
        </Box>
    )
}

export default ShoppingCart;