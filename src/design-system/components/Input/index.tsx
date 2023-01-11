import styled from 'styled-components';
import {
    AppTheme,
} from '../../theme';

import { compose, width, height, size, SizeProps } from 'styled-system';


const properties = compose(
   size, 
   width,
   height
  );
const InputBase = styled.input<{theme: AppTheme; }>`
    background-color: ${({theme}) => theme.colors.white};
    width: 100%;
    line-height: 15px;
    padding: 7px 10px 10px 0;
    margin: 0;
    font-size: 15px;
    background: 0 0;
    color: #111;
    outline: 0;
    -webkit-appearance: none;
    box-shadow: none;
    text-indent: 8px;
    direction: ltr;
`

const Input = styled(InputBase)({}, properties);

export default Input;