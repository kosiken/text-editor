import { useEffect, useMemo, useTransition, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Box from '../../design-system/components/Box';
import { Button } from '../../design-system/components/Button';
import Skeleton from '../../design-system/components/Skeleton';
import Text from '../../design-system/components/Text';
import { to2DecimalPlaces } from '../../helpers';
import { fetchShoppingItems } from '../shopping-list/store/actions';
import { selectShopListLoading, selectShoppingList } from '../shopping-list/store/selectors';
import CheckoutItem from './components/CheckoutItem';
import { addRemoveFromCart, checkout } from './store/actions';
import { selectCart } from './store/selectors';

const CheckoutPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, startTransition] = useTransition();
    const dispatch = useDispatch();

    const list = useSelector(selectShoppingList);
    const isLoading = useSelector(selectShopListLoading);
    const cartItems = useSelector(selectCart);
    const [checkOutWarning, setCheckOutWarning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const ref = useRef<number>();

    const onToggleCheckOut = () => {
        setCheckOutWarning(!checkOutWarning);
    }
    useEffect(() => {
        if(checkOutWarning) {
   
            ref.current = window.setInterval(() => {
                setTimeLeft(t=> t - 1);
            }, 1000);
        }
        else {
            if(ref.current) {
                window.clearTimeout(ref.current!);
            }
            setTimeLeft(10)
        }
        return () => {
            if(ref.current) {
                window.clearTimeout(ref.current!);
            }
        }
    }, [checkOutWarning]);

    useEffect(() => {
        if(timeLeft === 0) {
            window.clearTimeout(ref.current!)
            ref.current = undefined;
            dispatch(checkout.request());
            setCheckOutWarning(false);
            
        }
    }, [dispatch, timeLeft]);




    const total = useMemo(() => {
        const data = Object.keys(cartItems).map(item => {
            const shoppingItem = list.find(shopItem => shopItem.productId.toString() === item);
            if(!shoppingItem) {
                return 0;
            }
            return cartItems[item] * (shoppingItem.maxRecipientDenomination || shoppingItem.fixedRecipientDenominations[1] || shoppingItem.fixedRecipientDenominations[0])
        });

        return data.reduce((a, b) => a + b, 0);
    }, [list, cartItems])

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
                           
                                <Skeleton width="80px" height="60px" marginBottom="10px" />


                            <Box flex={1} paddingX="8px">
                                <Skeleton width="100%" height={'14px'} marginBottom="4px" borderRadius={'5px'} />

                                <Skeleton width="100px" height={'14px'} marginBottom="4px" borderRadius={'5px'} />
                                <Skeleton width="80px" height={'14px'} marginBottom="4px" borderRadius={'5px'} />

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
        <Box maxWidth="650px" alignItems="center" margin="0 auto" paddingTop="50px" paddingBottom="10px" id="shopping-cart" position="relative">
            <Helmet>
                <title>
                    {checkOutWarning ? 'Checking out...' : 'Shop | Check out now'}
                </title>
            </Helmet>
            <Box position="absolute" top={0} display="flex" width="100%" justifyContent="space-between">
                <Text fontSize={'18px'} fontWeight="bold"> {`Total USD ${to2DecimalPlaces(total, true)}`}</Text>
                <Button id="checkout-button" bgColor={checkOutWarning ? 'error' : 'success'} size="inline" disabled={timeLeft === 0 || total === 0} onClick={onToggleCheckOut}> 
                    {checkOutWarning ? `Cancel(${timeLeft})` : 'Checkout'}
                </Button>
            </Box>
            {isLoading && renderLoading(5)}
            {Object.keys(cartItems).map((item, index) => {
                return (<CheckoutItem key={'cart-item-' + item} itemId={item} shoppingListItems={list} addOrRemove={addOrRemove} />)
            })}
        </Box>
    )
}

export default CheckoutPage;