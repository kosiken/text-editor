import styled from 'styled-components';
import {
    AppTheme,
} from '../../theme';
import { compose, width, height, size } from 'styled-system';


const properties = compose(
   size, 
   width,
   height
  );

const SelectBase = styled.select<{theme: AppTheme; }>`
    background: #FAFAFA 0% 0% no-repeat padding-box;
    border: 1px solid #E7F1E9;
    border-radius: 4px;
    width: 100%;
    line-height: 15px;
    padding: 7px 10px 10px 0;
    margin: 0;
    font-size: 15px;
    color: #111;
    outline: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    box-shadow: none;
    text-indent: 8px;
    direction: ltr;
`
// Styled components also allows you to extend base styles.
const Select = styled(SelectBase)({}, properties);

export default Select;