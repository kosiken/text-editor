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
`;

/**
 * Displays messages at the top of the app to
 * notify users of changes in the application
 * 
 */
const AppNotifier = () => {
    const message =   useSelector(selectMessage);
    const type = useSelector(selectMessageType);
   const dispatch =  useDispatch();
   const ref = useRef<number>();

   useEffect(() => {

    ref.current = window.setTimeout(() => {
        // We want to clear this notification form view
        // after 2 seconds
        dispatch(clearMessage());
    }, 2000);

    return () => window.clearTimeout(ref.current);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [message]);

   if(!message) {
    return <></>;
   }

  return (
    <StyledMessageContainer error={type === 'error'} data-test-id="app-notifier"> 
        <Text margin={0} fontWeight="bold">{message}</Text>
    </StyledMessageContainer>
  )
}

export default AppNotifier;