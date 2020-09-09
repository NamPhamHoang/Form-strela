// @flow
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.h4`
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 0;
    font-size: ${({ big }) => (big ? '2rem' : '1rem')};
    pointer-events: none;
    background: ${({ isRed, theme: { blueOpacity, redOpacity } }) => (isRed ? redOpacity : blueOpacity)};
    text-align: left;
    padding: 10px 20px;
    z-index: 10;
    margin: 0;
    font-weight: 600;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    span {
        font-size: 1rem;
        display: block;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    height: ${({ big }) => (big ? '350px' : '220px')};
    overflow: hidden;
    position: relative;
    color: #ffffff;
    border-radius: 0.5rem;
    &:hover {
        color: #ffffff;
    }
`;

const ImageWrapper = styled.div`
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
    & > img {
        display: none;
    }
`;

export const NewsItem = ({ link, img, slug, title, big, date, red, ...props }) => {
    return (
        <StyledLink to={link} big={!!big} {...props}>
            <ImageWrapper style={{ backgroundImage: `url(${img})` }}>
                <img src={img} alt={`Zdjęcie artykułu ${slug}`} />
            </ImageWrapper>
            <StyledHeader big={!!big} isRed={red}>
                <span>{date}</span>
                {title}
            </StyledHeader>
        </StyledLink>
    );
};
