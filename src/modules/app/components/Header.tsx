import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '../../../design-system/components/Box';
import Text from '../../../design-system/components/Text';
import { selectCart } from '../../shopping-cart/store/selectors';
import useScrollFix from '../hooks/useScrollFix';



const Header = () => {
    const cartItems = useSelector(selectCart);
    const [itemCount, setItemCount] = useState(0);
    useScrollFix();
    useEffect(() => {
        setItemCount(Object.keys(cartItems).length);
    }, [cartItems]);
  return (
    <header>
        <Box display={"flex"} maxWidth="650px" alignItems="center" margin="0 auto" justifyContent="space-between" paddingX={"10px"}>
            <Helmet>
                <title>
                    Shop app
                </title>
            </Helmet>
            <Link to="/">
            <Text fontWeight="bold" fontSize={"23px"}>Shop</Text>
            </Link>

            <Link to="/cart">
                <Text color="secondary" id="cart-indicator">
                    Cart({itemCount})
                </Text>
            </Link>
        </Box>
    </header>
  )
}

export default Header;
