import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '../../../design-system/components/Box';
import { Button } from '../../../design-system/components/Button';
import Text from '../../../design-system/components/Text';
import { to2DecimalPlaces } from '../../../helpers';
import { GiftCard } from '../../../types';
import ProductImage from '../../app/components/ProductImage';
import useSelectCartItem from '../hooks/useSelectCartItem';
import { selectCartItemAmount } from '../store/selectors';

interface CheckoutItemProps {
    itemId: string;
    shoppingListItems: GiftCard[];
    addOrRemove: (item: string, add: boolean) => void;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
    itemId,
    shoppingListItems,
    addOrRemove
}) => {
    const item = useSelectCartItem(itemId, shoppingListItems);
    const count = useSelector(selectCartItemAmount(itemId));
    const [price, setPrice] = useState(0);
    useEffect(() => {
        if (item) {
            const p = item.maxRecipientDenomination || item.fixedRecipientDenominations[1] || item.fixedRecipientDenominations[0];
            setPrice(p);
        }
    }, [item]);


    if (!item) {
        return <></>;
    }
    const onAddOrRemove = (add: boolean) => {
        addOrRemove(itemId, add);
    }

    return (
        <Box display="flex" marginBottom={4} data-test-id="checkout-item">
            <Box>
                <Box width="80px" marginBottom="10px">
                    <ProductImage alt={item.productName} src={item.img} />
                </Box>
                <Box display="flex" width="80px" justifyContent="space-between">
                    <Button data-test-id="btn-add" size="inline" padding="10px" onClick={onAddOrRemove.bind(null, true)} variant="elevated">
                        +
                    </Button >
                    <Text fontWeight="bold" data-test-id="text-count">
                        {count}
                    </Text>
                    <Button data-test-id="btn-remove" variant="elevated" size="inline" padding="10px" onClick={onAddOrRemove.bind(null, false)} >
                        -
                    </Button>
                </Box>
            </Box>

            <Box flex={1} paddingLeft="15px" paddingRight="8px" >
                <Text data-test={'cart-item-' + itemId} className="item-label" margin={0} marginBottom="10px" >
                    {item.productName}
                </Text>
                <Box>
                    <Text mb="10px" marginTop={"2px"}>
                        {`${item.recipientCurrencyCode + ' ' + price} * ${count + (count > 1 ? ' items' : 'item')}`}
                    </Text>
                    <Text fontWeight="bold" margin={0} >
                        {item.recipientCurrencyCode + ' ' + to2DecimalPlaces(price * count, true)}
                    </Text>
                </Box>
            </Box>

        </Box>
    )
}

export default CheckoutItem;