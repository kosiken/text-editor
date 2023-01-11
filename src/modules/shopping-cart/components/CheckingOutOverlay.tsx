import React from 'react'
import { useSelector } from 'react-redux'
import Box from '../../../design-system/components/Box'
import LoadingIndicator from '../../../design-system/components/LoadingIndicator'
import Text from '../../../design-system/components/Text'
import { selectCheckingOut } from '../store/selectors'

const CheckingOutOverlay: React.FC = () => {

    const show = useSelector(selectCheckingOut);
  
  return (
    <Box width="100vw"  backgroundColor="white" opacity={0.8} id="checkout" height="100vh" position="fixed" display={show ? 'flex' : 'none'} justifyContent="center" alignItems="center" zIndex={999} top={0}>
        <Box>
            <LoadingIndicator />
            <Text>
                Completing checkout
            </Text>

        </Box>
    </Box>
  )
}

export default CheckingOutOverlay;
