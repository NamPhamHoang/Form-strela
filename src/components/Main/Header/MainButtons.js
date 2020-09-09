import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledLink = styled(Link)`
    height: 70px;
    display: flex;
    align-items: center;
    overflow: visible;
    background-color: #3dbbed;
    font-size: 1.125rem;
    color: #ffffff;
    border-radius: 0.5rem;
    &:hover {
        color: #ffffff;
        background-color: #3197c0;
        text-decoration: none;
    }
`;

const StyledLinkImg = styled.img`
    width: 100px;
    height: auto;
    flex-shrink: 0;
`;
const StyledSpan = styled.span`
    width: 100%;
    display: block;
    text-align: center;
`;

export const MainButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 20px 0;
    width: 100%;
    ${({ left }) =>
        left &&
        css`
            padding-right: 5px;
        `}
    ${({ right }) =>
        right &&
        css`
            padding-left: 5px;
        `}
`;

export const MainButton = ({ link, linkImg, children }) => {
    return (
        <StyledLink to={link}>
            <StyledLinkImg src={linkImg} alt="link" />
            <StyledSpan>{children}</StyledSpan>
        </StyledLink>
    );
};
