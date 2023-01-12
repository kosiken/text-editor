import React, { useEffect, useState, useDeferredValue, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '../../../design-system/components/Box';
import Text from '../../../design-system/components/Text';
import { selectCart } from '../../shopping-cart/store/selectors';
import useScrollFix from '../hooks/useScrollFix';
import Input from '../../../design-system/components/Input';
import { selectShoppingList } from '../../shopping-list/store/selectors';
import styled from 'styled-components';
import { AppTheme } from '../../../design-system/theme';
import { GiftCard } from '../../../types';

const HighlightedSpan = styled.span<{theme: AppTheme}>`
    color: ${({theme }) => theme.colors.darkOrange};
    font-weight: bold;
`;

/**
 * 
 * This component renders a list of search matches with the 
 * matching part highloghted.
 * 
 */
const SearchMatch: React.FC<{item: GiftCard; query: string; onClick: () => void}>  = ({ item, query, onClick }) => {

    const index = item.productName.toLowerCase().indexOf(query);
    if (index === -1) {
      return <></>;
    }
    return (
    <Link to={"/product/" + item.productId} onClick={onClick}>
       <Text data-test-id="search-result" fontSize="16px" marginY="5px"> 
        {/* Capture text before the match */}
        {item.productName.slice(0, index)}
        <HighlightedSpan>
            {/* Highlloght matched text */}
          {item.productName.slice(index, index + query.length)}
        </HighlightedSpan>
         {/* Capture text after the match */}
        {item.productName.slice(index + query.length)}
      </Text>
    </Link>

    );
  }



const Header = () => {
    // Keeps track of the cart state to show to the user
    const cartItems = useSelector(selectCart);
    const [itemCount, setItemCount] = useState(0);
    const [query, setQuery] = useState('');

    // https://beta.reactjs.org/reference/react/useDeferredValue This
    // This hookk lets us prioritize updating the input component first
    // Before any other component.
    const deferredQuery = useDeferredValue(query);
    const shoppingItems = useSelector(selectShoppingList);
    

    const list = useMemo(() => {
        // Usememo imporves the performance of this primitive search method
        // by only calling it when the deferredQuery changes
        if(deferredQuery === '') {
            return [];
        }
      return shoppingItems.filter(item => item.name.toLowerCase().includes(deferredQuery));
    }, [deferredQuery, shoppingItems]);

    const onChangeQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuery(e.target.value.toLowerCase() || '')
    }
    const clearSearch = () => {
        setQuery('');
    }
    useScrollFix();
    useEffect(() => {
        setItemCount(Object.keys(cartItems).reduce((a, b) => a + cartItems[b], 0));
    }, [cartItems]);

  return (
    <header>
        <Box display={"flex"} maxWidth="650px" alignItems="center" margin="0 auto" justifyContent="space-between" paddingX={"10px"}>

            {(list.length > 0  || !!deferredQuery )&&(<Box data-test-id="search-results-overlay" position="fixed" height="100vh" width="100vw" backgroundColor="black" opacity="0.5" zIndex={4} top={"55px"} left={0} onClick={clearSearch} />)}
            <Helmet>
                <title>
                    Shop app
                </title>
            </Helmet>
            <Link to="/">
            <Text fontWeight="bold" fontSize={"23px"} marginRight="10px">Shop</Text>
            </Link>
            <Box flex={1} position="relative">
                <Input data-test-id="search-input" placeholder="Search for items..." type="text" value={query} onChange={onChangeQuery} width="80%"/>
                <Box data-test-id="search-results-container" display={(list.length > 0  || !!deferredQuery ) ? 'block' : 'none'} position={"absolute"} height="400px" width="82.5%" padding="10px" backgroundColor="white" zIndex={999} overflowY="scroll">
                    {list.map(item => {
                        return (<SearchMatch item={item} key={item.productId + ""} query={deferredQuery} onClick={clearSearch} />)
                    })}
                </Box>
            </Box>
            <Link to="/cart">
                <Text color="secondary" data-test-id="cart-indicator">
                    Cart({itemCount})
                </Text>
            </Link>
        </Box>
    </header>
  )
}

export default Header;
