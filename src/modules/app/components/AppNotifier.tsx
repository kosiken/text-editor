import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Text from '../../../design-system/components/Text';
import { AppTheme } from '../../../design-system/theme';
import { clearMessage } from '../store/actions';
import { selectMessage, selectMessageType } from '../store/selectors';

const StyledMessageContainer = styled.div<{theme: AppTheme; error?: boolean}>`
    background-color: ${({theme, error = false}) => error ? theme.colors.error : theme.colors.primary};
    padding:10px;
    width: 100%;
    color:  ${({theme}) => theme.colors.blaxk};
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 999;
`

const AppNotifier = () => {
    const message =   useSelector(selectMessage);
    const type = useSelector(selectMessageType);
   const dispatch =  useDispatch();
   const ref = useRef<number>()

   useEffect(() => {

    ref.current = window.setTimeout(() => {
        dispatch(clearMessage());
    }, 2000);

    return () => window.clearTimeout(ref.current);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [message])
   if(!message) {
    return <></>;
   }
  return (
    <StyledMessageContainer error={type === 'error'}> 
        <Text margin={0} fontWeight="bold">{message}</Text>
    </StyledMessageContainer>
  )
}

export default AppNotifier