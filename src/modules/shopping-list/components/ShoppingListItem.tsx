import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Badge from '../../../design-system/components/Badge';
import Box from '../../../design-system/components/Box';
import { AppTheme } from '../../../design-system/theme';
import { to2DecimalPlaces } from '../../../helpers';
import { GiftCard } from '../../../types';

const StyledItemImage = styled.img`
    width: 150px;
`;

const StyledStandardScreenItem = styled.div<{ theme: AppTheme }>`
   display: block;
   width: 150px;
   margin-bottom: 0;
   color: black;
   &:hover, &:focus {
        box-shadow: ${({theme}) => theme.shadows['lg']};
        border: 1px solid ${({theme}) => theme.colors.primary};
   }
    ${({ theme }) => {
        return css`
            .item-label {
                height: 41.59;
                width: 100%;
                text-overflow: ellipsis;
                font-weight: bold;
            }
            @media only screen and (max-width: ${theme.breakpoints[0]}) {
                width: 100%;
                display: flex;
                margin-bottom: 20px;

                .item-label {
                    height: auto;
                }
            }
        `
    }}


`;


const ShoppingListItem: React.FC<{ item: GiftCard }> = ({ item }) => {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        if(item) {
            const p = item.maxRecipientDenomination || item.fixedRecipientDenominations[1] || item.fixedRecipientDenominations[0];
           setPrice(p);
         }
      }, [item]);

    return (
        <Link to={'/product/' + item.productId}>
            <StyledStandardScreenItem>
                <StyledItemImage alt={item.productName} src={item.img} />

                <Box flex={1} padding="2px 5px">
                <Link to={'/product/' + item.productId}>
                    <p className="item-label">
                        {item.productName}
                    </p>

                </Link>

                <Box display="flex" flexWrap="wrap">
                    <Badge marginRight={10} marginBottom={'5px'}>
                        {item.type}
                    </Badge>
                    <Badge marginRight={10} marginBottom={'5px'}>
                      {item.brand.brandName}
                    </Badge>
                    <Badge marginRight={10} marginBottom={'5px'} color={item.available ? 'success' : 'error'}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </Badge>
                    <span>
                        {item.recipientCurrencyCode +  ' ' + to2DecimalPlaces(price)}
                    </span>
                </Box>

                </Box>
            </StyledStandardScreenItem>
        </Link>
    )
}

export default ShoppingListItem