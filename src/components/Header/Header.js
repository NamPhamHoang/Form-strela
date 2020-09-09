import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { faChevronRight, faFont, faSearch, faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faAdjust, faBars } from '@fortawesome/pro-regular-svg-icons';
import Button from 'react-bootstrap/Button';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/pro-light-svg-icons';
import queryString from 'query-string';
import wideButton1 from '../../img/wide-button-1.png';
import { MainButton } from '../Main/Header/MainButtons';
import logo from '../../img/logo_jarocin.png';
import wideButton2 from '../../img/wide-button-2.png';
import wideButton3 from '../../img/wide-button-3.png';
import wideButton4 from '../../img/wide-button-4.png';
import { PrimaryButton } from '../Buttons/Button';
import ButtonSquare from '../Buttons/ButtonSquare/ButtonSquare';
import bipLogo from '../../img/bip-logo.png';
import { Menu } from './Menu';
import Weather from '../Main/Header/Weather';
import Input from '../Input/Input';

const ButtonsWrapper = styled.div`
    grid-column: 1/3;
    grid-column-gap: 10px;
    grid-row-gap: 40px;
    padding: 40px 0 10px;
    display: none;
    @media screen and (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
`;

const StyledHeader = styled.header`
    background-color: #f5f5f5;
    top: 0;
    z-index: 30;
    ${({ scrolled }) =>
        scrolled &&
        css`
            position: sticky;
            ${ButtonsWrapper} {
                display: none;
            }
        `}
`;

const StyledWrapper = styled.div`
    padding: 20px 15px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 10px;
    @media screen and (max-width: 1000px) {
        ${({ scrolled }) =>
            scrolled &&
            css`
                > a {
                    display: none;
                }
            `}
    }
`;
const StyledLogoImg = styled.img`
    z-index: 1;
    position: relative;
    max-width: 150px;
    @media screen and (min-width: 1000px) {
        max-width: unset;
    }
`;
const ContentWrapper = styled.div`
    grid-row: 2;
    grid-column: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 1000px) {
        grid-column: 2;
        justify-content: flex-end;
    }
`;
const StyledLink = styled(Link)`
    grid-row: 1;
    grid-column: 1/3;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 1000px) {
        grid-row: 1/3;
        grid-column: 1;
    }
`;
const StyledA = styled.a`
    color: #919191;
    justify-self: flex-end;
    font-size: 0.8rem;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #ffffff;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
    display: flex;
    align-items: center;
    padding: 20px !important;
`;
const SocialsA = styled.a`
    color: #919191;
    display: none;
    @media screen and (min-width: 992px) {
        display: block;
    }
`;
const GrayFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #919191;
    margin-left: 3px;
    cursor: pointer;
`;
const MediumGrayFontAwesomeIcon = styled(GrayFontAwesomeIcon)`
    font-size: 0.8em;
`;
const SmallGrayFontAwesomeIcon = styled(GrayFontAwesomeIcon)`
    font-size: 0.6em;
`;

const SearchButton = styled(Button)`
    display: none;
    @media screen and (min-width: 768px) {
        display: block;
    }
`;

const StyledButtonSquare = styled(ButtonSquare)`
    flex-direction: column;
    span {
        font-size: 0.5rem;
        display: block;
        line-height: 1;
    }
`;

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .form-group {
        margin: 0;
    }
    & > form {
        border-radius: 0.5rem;
        margin: 0;
        width: 300px;
        background: #919191;
        height: 100%;
        border: none;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0 10px 10px;
        transform: scaleX(0);
        transition: transform 0.3s ease-in-out;
        transform-origin: right;
        ${({ isOpened }) =>
            isOpened &&
            css`
                transform: scaleX(1);
            `}
    }
`;

const setFontSize = size => {
    localStorage.setItem('fontSize', size);
    const { classList } = document.documentElement;
    classList.remove('version-small', 'version-normal', 'version-large');
    classList.add(size);
};

const toggleHighContrast = () => {
    let highContrast = localStorage.getItem('highContrast') || false;
    highContrast = highContrast === 'true';
    highContrast = !highContrast;
    if (highContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast);
};

export const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const token = useSelector(state => state.token);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [search, setSearch] = useState('');
    const [searchOpened, setSearchOpened] = useState(false);

    const listinerFunction = () => {
        if (window.scrollY > 180) {
            setScrolled(true);
        } else if (window.scrollY < 60) {
            setScrolled(false);
        }
    };

    useEffect(() => {
        setMenuOpened(false);
        setSearchOpened(false);
        const parsed = queryString.parse(location.search);
        setSearch(parsed.q !== '' ? '' : '');
        document.addEventListener('scroll', listinerFunction);
        return () => {
            document.removeEventListener('scroll', listinerFunction);
        };
    }, [location]);

    return (
        <>
            <Menu visible={menuOpened} setMenuOpened={setMenuOpened} />
            <StyledHeader scrolled={scrolled}>
                <StyledWrapper className="container" scrolled={scrolled}>
                    <StyledLink to="/">
                        <StyledLogoImg src={logo} alt="jarocin-logo" />
                    </StyledLink>
                    <StyledA href="http://archiwum.jarocin.pl" target="_blank">
                        ARCHIWUM <FontAwesomeIcon icon={faChevronRight} />
                    </StyledA>
                    <ContentWrapper>
                        <Weather />
                        <div className="mr-3 d-flex align-items-baseline">
                            <GrayFontAwesomeIcon
                                role="button"
                                tabIndex="0"
                                onKeyPress={() => {}}
                                icon={faAdjust}
                                fixedWidth
                                className="mr-3"
                                onClick={toggleHighContrast}
                            />
                            <SmallGrayFontAwesomeIcon
                                role="button"
                                tabIndex="0"
                                onKeyPress={() => {}}
                                icon={faFont}
                                onClick={() => setFontSize('version-small')}
                            />
                            <MediumGrayFontAwesomeIcon
                                role="button"
                                tabIndex="0"
                                onKeyPress={() => {}}
                                icon={faFont}
                                onClick={() => setFontSize('version-normal')}
                            />
                            <GrayFontAwesomeIcon
                                role="button"
                                tabIndex="0"
                                onKeyPress={() => {}}
                                icon={faFont}
                                onClick={() => setFontSize('version-large')}
                            />
                        </div>
                        <SocialsA
                            href="https://www.facebook.com/gminajarocin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-3"
                        >
                            <FontAwesomeIcon icon={faFacebookF} size="1x" />
                        </SocialsA>
                        <SocialsA
                            href="https://www.instagram.com/gmina.jarocin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-3"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="1x" />
                        </SocialsA>
                        <SocialsA
                            href="https://www.youtube.com/channel/UC2MX8NbC0ooLAnwhaAnCbag"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-3"
                        >
                            <FontAwesomeIcon icon={faYoutube} size="1x" />
                        </SocialsA>

                        <SearchWrapper isOpened={searchOpened}>
                            <form
                                action="/wyniki-wyszukiwania/aktualnosci"
                                onSubmit={e => {
                                    if (!search) {
                                        e.preventDefault();
                                    }
                                    setSearchOpened(false);
                                }}
                            >
                                <Input name="q" onChange={e => setSearch(e.target.value)} value={search} />
                                <ButtonSquare type="submit" variant="secondary">
                                    <FontAwesomeIcon icon={faSearch} size="lg" />
                                </ButtonSquare>
                            </form>
                            <SearchButton
                                className="btn-square search-button"
                                onClick={() => {
                                    setSearchOpened(true);
                                }}
                                variant="secondary"
                            >
                                <FontAwesomeIcon icon={faSearch} size="lg" />
                            </SearchButton>
                        </SearchWrapper>
                        <ButtonSquare
                            red
                            href="http://bip2.wokiss.pl/jarocin/"
                            variant="secondary"
                            className="ml-1 btn--bip"
                        >
                            <img src={bipLogo} alt="bip-logo" className="img-fluid" />
                        </ButtonSquare>
                        <ButtonSquare blue href="/kontakt" className="ml-1" target="">
                            <FontAwesomeIcon icon={faPhone} size="lg" />
                        </ButtonSquare>
                        <StyledButtonSquare
                            className="ml-1"
                            onClick={() => {
                                setMenuOpened(true);
                            }}
                            blue
                        >
                            <span>MENU</span>
                            <StyledFontAwesomeIcon icon={faBars} size="lg" />
                        </StyledButtonSquare>
                        <StyledPrimaryButton to={token ? '/panel' : '/logowanie'} className="ml-1">
                            <FontAwesomeIcon icon={faUser} fixedWidth />
                        </StyledPrimaryButton>
                    </ContentWrapper>
                    <ButtonsWrapper>
                        <MainButton link="/e-urzad" linkImg={wideButton1}>
                            <b>e</b>Urząd
                        </MainButton>
                        <MainButton link="/strefa-mieszkanca" linkImg={wideButton2}>
                            <b>Strefa</b> mieszkańca
                        </MainButton>
                        <MainButton link="/kup-bilet" linkImg={wideButton3}>
                            <b>Kup</b> bilet
                        </MainButton>
                        <MainButton link="/e-targ" linkImg={wideButton4}>
                            <b>e</b>Targ
                        </MainButton>
                    </ButtonsWrapper>
                </StyledWrapper>
            </StyledHeader>
        </>
    );
};
