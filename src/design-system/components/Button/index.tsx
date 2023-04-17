import * as React from 'react';
import styled, { css } from 'styled-components';
import { variant, SpaceProps, space, color, ColorProps } from 'styled-system';
import Color from 'color';
import {AppTheme} from '../../theme';


export type ButtonProps = SpaceProps & ColorProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'> & {
    variant?: 'main' | 'outlined' | 'plain';
    bgColor?: string;
    size?: 'full' | 'inline';
}

const ButtonStyled = styled.button<ButtonProps & { theme: AppTheme; }>`
  cursor: pointer;
  letter-spacing: 1px;
  outline: none;
  position: relative;
  border: none;
  white-space: nowrap;
  border-radius: 4px;
  min-width: fit-content;
  user-select: none;
  text-align: center;
  max-width: 205px;
  padding: 8px 16px;
  ${color}
  ${space}
  ${() => {
    // What is happening here now is that, The variant function from the styled-system library allows you to apply styles
    // based on what value you pass to the variant prop (or any other defined prop)
        return variant({
            variants: {
                main: {
                    border: 'none',
                },
                outlined: {
                    background: 'none',
                    border: '1px solid #CEE3D4',              
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

${({ bgColor = 'primary', variant, theme}) => {

      
        // only allow theme colors for buttons
        let color = theme.colors[bgColor] || theme.colors.primary;
        if(variant  === 'outlined') 
        {
            color = '#CEE3D4';
        }
        
        const darkened = Color(color).darken(0.4).rgb().string();
        if(variant === 'outlined') {
            return css`
            border: 1px solid ${color};
            &:hover,&:focus {
                cursor: pointer;
                outline: none;
                border: 1px solid ${darkened};
                
                &:disabled {
                cursor: not-allowed;
                }
            }
    `
        }
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
    variant: 'main',
    size: 'full',
    color: 'white'
};
