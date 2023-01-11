import * as React from 'react';
import styled, { css } from 'styled-components';
import { variant, SpaceProps, space } from 'styled-system';
import Color from 'color';
import {AppTheme} from '../../theme';

export interface ButtonProps extends SpaceProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'> {
    variant?: 'rounded' | 'elevated' | 'plain';
    bgColor?: string;
    size?: 'full' | 'inline';
}

const ButtonStyled = styled.button<ButtonProps & { theme: AppTheme; }>`
  cursor: pointer;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  border: none;
  white-space: nowrap;
  min-width: fit-content;
  user-select: none;
  text-align: center;
  max-width: 205px;
  padding: 6px;
  ${space}

  ${({ theme }) => {
    // What is happening here now is that, The variant function from the styled-system library allows you to apply styles
    // based on what value you pass to the variant prop (or any other defined prop)
        return variant({
            variants: {
                rounded: {
                    borderRadius: 20,
                    boxShadow: theme.shadows.sm,
                },
                elevated: {
                    background: 'linear-gradient(to bottom,#f7f8fa,#e7e9ec)',
                    boxShadow: '0 2px 5px 0 rgb(213 217 217 / 50%)',
                    border: '1px solid',
                    borderColor: '#adb1b8 #a2a6ac',
                    borderRadius: 3,
                },
                plain: {
                    backgroundColor: 'none',
                }
            }
        });
    }}

  ${() => {
        return variant({
            prop: 'size',
            variants: {
                full: {
                    display: 'block',
                    width: '100%',
                },
                inline: {
                    display: 'inline-block',
                }
            }
        });
    }}

${({ bgColor = 'primary', theme, variant}) => {

        if(variant === 'rounded'){
        // only allow theme colors for buttons
        const color = theme.colors[bgColor] || theme.colors.primary;

        const darkened = Color(color).darken(0.4).rgb().string();
        return css`
            background-color: ${color};
            &:hover,&:focus {
                cursor: pointer;
                outline: none;
                background-color: ${darkened};
                color: ${theme.colors.white};
                &:disabled {
                cursor: not-allowed;
                }
            }
    `}
    return css`
                &:hover, &:focus {
                cursor: pointer;
                outline: none;
                border: 1px solid ${theme.colors.secondary};
                &:disabled {
                cursor: not-allowed;
                }
            }
            `
    }}
`;


export const Button: React.FC<ButtonProps> = ({
    size,
    color,
    variant,
    children,
    ...props
}) => {
    return (
        <ButtonStyled size={size} color={color} variant={variant} {...props}>
            {children}
        </ButtonStyled>
    );
};

Button.defaultProps = {
    color: 'primary',
    variant: 'rounded',
    size: 'full',
};
