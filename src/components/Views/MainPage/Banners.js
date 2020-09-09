import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import ReactGA from 'react-ga';
import { gate } from '../../../api';

const StyledContainer = styled(Container)`
    display: grid;
    grid-gap: 20px;
    @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
        margin: 20px auto;
    }
`;
const StyledLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 0.5rem;
    img {
        width: 100%;
        height: auto;
    }
`;
export const Banners = ({ type }) => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        axios.get(`${gate}/homepage-banner/${type}`).then(({ data }) => {
            setBanners(data.banners);
        });
    }, [type]);
    return (
        <StyledContainer>
            {banners.map(({ id, link, imageUrl }) => (
                <StyledLink
                    key={id}
                    onClick={() => {
                        ReactGA.event({
                            category: 'Uzytkownik',
                            action: `Kliknięcie w baner nr ${id} - ${link}`,
                        });
                    }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={imageUrl} alt="" />
                </StyledLink>
            ))}
        </StyledContainer>
    );
};
