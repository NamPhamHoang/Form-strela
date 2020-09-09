import React, { useContext } from 'react';
import styled, { ThemeContext, css } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/mainTheme';

const StyledLink = styled(Link)`
    border-radius: 0.5rem;
    padding: 0.7rem 2.5rem;
    color: ${({ outline, color, bgColor }) => (outline ? bgColor : color)};
    background-color: ${({ outline, bgColor, theme: { white } }) => (outline ? white : bgColor)};
    border: 1px solid ${({ outline, bgColor }) => (outline ? bgColor : 'transparent')};
    text-decoration: none;
    display: inline-flex;
    text-align: center;
    justify-content: center;
    &:hover {
        background-color: ${({ bgColorHover }) => bgColorHover};
        color: ${({ color }) => color};
        text-decoration: none;
    }

    &:disabled {
        filter: grayscale(70%);
        cursor: not-allowed;
    }

    ${({ size }) => {
        switch (size) {
            case 's':
                return `font-size: ${theme.font.size.s};`;
            case 'm':
                return `font-size: ${theme.font.size.m};`;
            case 'l':
                return `font-size: ${theme.font.size.l};`;
            case 'xl':
                return `font-size: ${theme.font.size.xl};`;
            case 'xs':
                return `font-size: ${theme.font.size.xs};`;
            case 'xxl':
                return `font-size: ${theme.font.size.xxl};`;
            case 'xxs':
                return `font-size: ${theme.font.size.xxs};`;
            case 'xxxs':
                return `font-size: ${theme.font.size.xxxs};`;
            default:
                return `font-size: ${size};`;
        }
    }}
`;
const StyledA = styled.a`
    border-radius: 0.5rem;
    padding: 0.7rem 2.5rem;
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
    border: none;
    text-decoration: none;
    display: inline-flex;
    text-align: center;
    &:hover {
        background-color: ${({ bgColorHover }) => bgColorHover};
        color: ${({ color }) => color};
        text-decoration: none;
    }

    &:disabled {
        filter: grayscale(70%);
        cursor: not-allowed;
    }

    ${({ size }) => {
        switch (size) {
            case 's':
                return `font-size: ${theme.font.size.s};`;
            case 'm':
                return `font-size: ${theme.font.size.m};`;
            case 'l':
                return `font-size: ${theme.font.size.l};`;
            case 'xl':
                return `font-size: ${theme.font.size.xl};`;
            case 'xs':
                return `font-size: ${theme.font.size.xs};`;
            case 'xxl':
                return `font-size: ${theme.font.size.xxl};`;
            case 'xxs':
                return `font-size: ${theme.font.size.xxs};`;
            case 'xxxs':
                return `font-size: ${theme.font.size.xxxs};`;
            default:
                return `font-size: ${size};`;
        }
    }}
`;

const StyledButton = styled.button`
    border-radius: 0.5rem;
    padding: 0.7rem 2.5rem;
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
    border: none;
    &:hover {
        background-color: ${({ inactive, bgColor, bgColorHover }) => (inactive ? bgColor : bgColorHover)};
    }

    ${({ inactive }) =>
        inactive &&
        css`
            cursor: text !important;
        `}

    &:disabled {
        background-color: ${({ theme: { darkgray } }) => darkgray};
        filter: grayscale(70%);
        cursor: not-allowed;
    }

    ${({ size }) => {
        switch (size) {
            case 's':
                return `font-size: ${theme.font.size.s};`;
            case 'm':
                return `font-size: ${theme.font.size.m};`;
            case 'l':
                return `font-size: ${theme.font.size.l};`;
            case 'xl':
                return `font-size: ${theme.font.size.xl};`;
            case 'xs':
                return `font-size: ${theme.font.size.xs};`;
            case 'xxl':
                return `font-size: ${theme.font.size.xxl};`;
            case 'xxs':
                return `font-size: ${theme.font.size.xxs};`;
            case 'xxxs':
                return `font-size: ${theme.font.size.xxxs};`;
            default:
                return `font-size: ${size};`;
        }
    }}
`;

const Button = ({ children, to, href, ...props }) => {
    if (to) {
        return (
            <StyledLink to={to} {...props}>
                {children}
            </StyledLink>
        );
    }
    if (href) {
        return (
            <StyledA href={href} {...props}>
                {children}
            </StyledA>
        );
    }
    return <StyledButton {...props}>{children}</StyledButton>;
};

export const PrimaryButton = ({ children, ...props }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <Button {...props} bgColor={themeContext.blue} bgColorHover={themeContext.blueHover}>
            {children}
        </Button>
    );
};

export const RedButton = ({ children, size, ...props }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <Button {...props} bgColor={themeContext.red} bgColorHover={themeContext.redHover}>
            {children}
        </Button>
    );
};

Button.defaultProps = {
    outline: false,
    size: '1.25rem',
    color: '#ffffff',
};
