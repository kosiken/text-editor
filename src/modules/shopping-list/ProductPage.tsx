import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router';
import { fetchShoppingItems } from './store/actions';
import { selectShoppingItem } from './store/selectors';
import Skeleton from '../../design-system/components/Skeleton';
import Box from '../../design-system/components/Box';
import Badge from '../../design-system/components/Badge';
import { to2DecimalPlaces } from '../../helpers';
import Text from '../../design-system/components/Text';
import { Button } from '../../design-system/components/Button';
import { addRemoveFromCart } from '../shopping-cart/store/actions';
import ProductImage from '../app/components/ProductImage';
import { Helmet } from 'react-helmet';


const ProductPage = () => {
  const dispatch = useDispatch();

  let { id } = useParams<{ id: string }>();
  const product = useSelector(selectShoppingItem(!id ? undefined : parseInt(id)));
  const addToCart = () => {
    if(id) dispatch(addRemoveFromCart({item: id, add: true}))
  }
  useEffect(() => {
    if (typeof product === 'boolean') {
      dispatch(fetchShoppingItems.request());
    }

  }, [product, dispatch])

  const renderLoading = () => {

    if (typeof product === 'boolean') {
      return (
        <>
          <Skeleton width="100%" height="200px" marginBottom="20px" />
          <Skeleton width="80%" height={'14px'} borderRadius={'5px'} marginBottom={'8px'} />

          <Skeleton width="100%" height="150px" />
        </>
      )
      
    }
    return <></>
  }

  const renderItem = () => {
    if(product) {
      return (
        <>
        <Box textAlign="center">
          <Helmet>
            <title>
              {product.productName}
            </title>
          </Helmet>
        <ProductImage alt={product.productName} src={product.img} />

        </Box>

        <Box marginTop="20px">
          <Text fontWeight="bold">
            {product.productName}
          </Text>
          <Box display="flex" flexWrap="wrap" marginBottom="20px">
                    <Badge marginRight={10} marginBottom={'5px'}>
                        {product.type}
                    </Badge>
                    <Badge marginRight={10} marginBottom={'5px'}>
                      {product.brand.brandName}
                    </Badge>
                    <Badge marginRight={10} marginBottom={'5px'} color={product.available ? 'success' : 'error'}>
                      {product.available ? 'Available' : 'Unavailable'}
                    </Badge>
                    <span>
                        {product.recipientCurrencyCode +  to2DecimalPlaces(product.minRecipientDenomination, true)} - {product.recipientCurrencyCode +  to2DecimalPlaces(product.maxRecipientDenomination, true)}
                    </span>
                </Box>

          <Box>
            <Text>
              {product.redeemInstruction.concise}
            </Text>
            <Text>
              This is just some dummy text here to add like a product description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ea minima ullam, aperiam corporis temporibus dignissimos odio est accusamus alias doloremque ab provident at saepe! Ut facilis dolor ducimus dolorum?
              Quos nostrum, doloribus soluta ex vero est pariatur eos iusto repudiandae eveniet, possimus iste, deleniti maiores. Ab harum, alias cum asperiores ratione tempore ex ducimus! Cum porro nesciunt qui sapiente!
              In dolorum possimus veritatis, quae, non ullam explicabo animi adipisci aut obcaecati omnis quia voluptatum est, blanditiis nobis laboriosam quasi vitae repudiandae quo repellendus accusamus odio qui. Provident, enim ratione.
              Corrupti dolorem quibusdam molestias atque enim perspiciatis sed quisquam repudiandae doloribus ratione nostrum porro, veniam laudantium vitae impedit commodi aut suscipit et incidunt quidem voluptatibus quasi dolorum, vero ex? Inventore.
              Porro inventore eum minima unde, perferendis laboriosam aliquid reiciendis, magnam consequatur nam eligendi dicta. Sequi, rem molestias animi culpa repudiandae magni obcaecati repellat eligendi nihil doloribus eos illo distinctio. Fuga!
            </Text>

          <Button id="submit-btn" onClick={addToCart}>Add to cart</Button>

          </Box>
        </Box>
        </>
      )
    }
    return <></>
  }

  return (
    <Box paddingX="20px" paddingBottom="20px">
      {renderLoading()}
      {renderItem()}

    </Box>
  )
}

export default ProductPage