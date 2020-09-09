import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ReactGA from 'react-ga';
import restaurant from '../../img/mainPage/restaurant.jpg';
import { device } from '../../theme/madiaQuery';
import { RedButton } from '../Buttons/Button';
import GospodarkaImg from '../../img/mainPage/portal_jarocin_ikona_gospodarka_odpadami_bez_tla.svg';
import SpolkiImg from '../../img/mainPage/portal_jarocin_ikona_spolki_gminne_bez_tla.svg';
import PodatkiImg from '../../img/mainPage/portal_jarocin_ikona_oplaty_i_podatki_bez_tla.svg';
import DzialalnoscImg from '../../img/mainPage/portal_jarocin_ikona_dzialalnosc_gospodarcza_bez_tla.svg';
import DowodyImg from '../../img/mainPage/portal_jarocin_ikona_sprawy_meldunkowe_bez_tla.svg';
import OswiataImg from '../../img/mainPage/portal_jarocin_ikona_oswiata_bez_tla1594731942.svg';
import { BlockFunctionModal } from '../Modals/Modal';

const Wrapper = styled(Container)`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    overflow: hidden;

    @media ${device.tablet} {
        grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.laptop} {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    color: #000000;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    text-decoration: none;
    border: none;
    text-align: center;
    border-radius: 0.5rem;
    background-color: ${({ theme: { lightergray } }) => lightergray};
    padding: 15px 0 20px;
    &:hover {
        color: #ffffff;
        background-color: #3dbbed;
        text-decoration: none;
        & > * {
            color: #ffffff;
        }
    }
    img {
        width: 120px;
    }
`;

const StyledHeader = styled(RedButton)`
    text-align: center;
    margin: 0 auto;
    @media ${device.tablet} {
        grid-column: 1 / 3;
    }
    @media ${device.laptop} {
        grid-column: 1 / 5;
    }
`;

const StyledImageLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    transform: rotate(90deg);
    flex-shrink: 1;
    margin: auto;
    max-height: 450px;

    img {
        width: 100%;
    }

    @media ${device.tablet} {
        grid-column: 1/3;
    }
    @media ${device.laptop} {
        transform: rotate(0deg);
        grid-column: 4;
        grid-row: 2/4;
    }
    div {
        transition: left 0.3s, top 0.3s, right 0.3s, bottom 0.3s, opacity 0.3s;
        border-radius: 0.5rem;
        position: absolute;
        bottom: 20px;
        top: 20px;
        left: 200px;
        right: -1rem;
        color: ${({ theme: { white } }) => white};
        background-color: ${({ theme: { blue } }) => blue};
        opacity: 0.8;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-size: 40px;
        span {
            transform: rotate(-90deg);
            width: 1000%;
            display: block;
            flex-shrink: 0;
            text-align: center;
        }
    }
    &:hover {
        div {
            opacity: 0.95;
            bottom: 0;
            top: 0;
            left: 0;
            right: 0;
        }
    }
`;

export const MainShortcuts = () => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <Wrapper>
                <StyledHeader inactive>NA SKRÓTY</StyledHeader>

                <StyledLink to="/e-urzad/gospodarka-odpadami">
                    <img src={GospodarkaImg} alt="" />
                    GOSPODARKA ODPADAMI
                </StyledLink>
                <StyledLink to="/spolki-gminne">
                    <img src={SpolkiImg} alt="" />
                    SPÓŁKI GMINNE
                </StyledLink>
                <StyledLink to="/e-urzad/podatki">
                    <img src={PodatkiImg} alt="" />
                    PODATKI
                </StyledLink>
                <StyledLink to="/e-urzad/dzialalnosc-gospodarcza">
                    <img src={DzialalnoscImg} alt="" />
                    DZIAŁALNOŚĆ GOSPODARCZA
                </StyledLink>
                <StyledLink to="/e-urzad/dowody-osobiste">
                    <img src={DowodyImg} alt="" />
                    DOWODY OSOBISTE
                </StyledLink>
                <StyledLink to="/e-urzad/oswiata">
                    <img src={OswiataImg} alt="" />
                    OŚWIATA
                </StyledLink>

                <StyledImageLink
                    onClick={e => {
                        e.preventDefault();
                        setModal(true);
                        ReactGA.event({
                            category: 'Uzytkownik',
                            action: `Kliknięcie w baner Zamów jedzenie`,
                        });
                    }}
                    to="/zamow-jedzenie"
                >
                    <img src={restaurant} alt="restauracje" />
                    <div>
                        <span>ZAMÓW JEDZENIE</span>
                    </div>
                </StyledImageLink>
            </Wrapper>

            <BlockFunctionModal
                closeModal={() => {
                    setModal(false);
                }}
                opened={modal}
            />
        </>
    );
};
