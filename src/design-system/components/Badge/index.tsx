import React from 'react'
import styled from 'styled-components';
import {   SpaceProps,
    space, } from 'styled-system';
import { AppTheme} from '../../theme';
import Color from 'color';



interface BadgeBaseProps extends Omit<React.BaseHTMLAttributes<HTMLSpanElement>, 'style'>  {
    theme: AppTheme;
    color?: string;
}

export type BadgeProps = BadgeBaseProps & SpaceProps;

const Badge  = styled.span<BadgeProps>`
    display: inline-block;
    padding: 2px 4px;
    background-color: ${({color = 'primary', theme}) => {
        const theColor = theme.colors[color] || theme.colors.primary;
        const alphad = Color(theColor).alpha(0.6).rgb().string();
        return alphad;
    }};
    ${space}
`


Badge.defaultProps = {
    color: 'primary',
}
export default Badge;
