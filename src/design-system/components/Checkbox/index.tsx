import * as React from 'react';
import styled from 'styled-components';
import { variant, SpaceProps, space, color, ColorProps, SizeProps } from 'styled-system';

import {AppTheme} from '../../theme';


type CheckBoxProps = {label: string, htmlFor: string;  checked?: boolean;}  & Omit<React.HTMLAttributes<HTMLInputElement>, 'style' | 'className'>

const LabelStyled = styled.label<CheckBoxProps & {theme: AppTheme}>`
    cursor: pointer;
	text-indent: -9999px;
	width: 32px;
	height: 20px;
	background: ${({theme}) => theme.colors.darkGrey};
	display: block;
	border-radius: 15px;
	position: relative;

    &:after {
	content: '';
	position: absolute;
	top: 3px;
	left: 2px;
	width: 14px;
	height: 14px;
	background: #fff;
	border-radius: 8px;
	transition: 0.3s;

    &:active:after {
	width: 25px;
  }
}
`

const InputStyled = styled.input<CheckBoxProps & {theme: AppTheme}>`
	height: 0;
	width: 0;
	visibility: hidden;
    &:checked + label {
        background: ${({theme}) => theme.colors.primary};
    }
    &:checked + label:after {
	left: calc(100% - 3px);
	transform: translateX(-100%);
  }

`

export const CheckBox: React.FC<CheckBoxProps> = ({label,  htmlFor, ...props}) => {
    return (
        <>
        <InputStyled type="checkbox" id={htmlFor} {...(props as any)} />
        <LabelStyled htmlFor={htmlFor} {...(props as any)}> 
        {label}
        </LabelStyled>
        </>
    )
}

export default CheckBox;
