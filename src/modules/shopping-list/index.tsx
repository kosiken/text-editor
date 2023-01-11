import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import styled, {css} from 'styled-components';
import Box from '../../design-system/components/Box';
import Skeleton from '../../design-system/components/Skeleton';
import ShoppingListItem from './components/ShoppingListItem';
import { fetchShoppingItems } from './store/actions';
import { selectShopListLoading, selectShoppingList } from './store/selectors';


const StyledShoppingList = styled.div`
    display: grid;
    grid-template-columns: 150px 150px 150px;
    max-width: 650px;
    margin: 0 auto;
    column-gap: 50px;
    row-gap: 30px;

    ${({ theme }) => {
    return css`
      @media only screen and (max-width: ${theme.breakpoints[0]}) {
    display: block;
      }
        .loading-indicator-md {
          display: block;
      width: 150px;
   
        justify-content: center;
    align-items: center;
      @media only screen and (max-width: ${theme.breakpoints[0]}) {

        display: flex;
        width: 100%;
      }
    }
        `
  }}
`



const ShoppingList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectShoppingList);
  const isLoading = useSelector(selectShopListLoading);
  useEffect(() => {
    if(list.length === 0) {
      dispatch(fetchShoppingItems.request());
    }
  }, [dispatch, list])

  const renderLoading = (count: number) => {

    const numberofSquares = new Array(count).fill(0);
    return (
      <>
      {numberofSquares.map((_, index) => {
        return (
          <Box className="loading-indicator-md" key={'loading-indicator-md-' + index}>
              <Box mb="10px">
              <Skeleton width={'150px'}  height="100px" marginBottom="10px" />
              </Box>

              <Box flex={1} paddingX="8px">
              <Skeleton width="100%"  height={'14px'} marginBottom="4px" borderRadius={'5px'}/>
              <Skeleton width="100%"  height={'14px'} borderRadius={'5px'} marginBottom={'8px'} />

              <Box display={"flex"}>
              <Skeleton height={'14px'} borderRadius={'5px'} width="40px" marginRight={"2px"} />
              <Skeleton height={'14px'} borderRadius={'5px'} width="40px"  />
              </Box>
              </Box>
             

              
          </Box>
        )
      })}

      </>
    )
  }
  return (
    <StyledShoppingList id="shopping-list">
                  <Helmet>
                <title>Shop | Catalogue</title>
            </Helmet>
        {isLoading && renderLoading(5)}

        {list.map((item, index) => {
          return (<ShoppingListItem key={'shopping-item-' + index} item={item} />)
        })}
    </StyledShoppingList>
  )
}

export default ShoppingList