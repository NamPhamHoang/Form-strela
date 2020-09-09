import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import logo from '../../img/logo_jarocin.png';
import { MainButton } from '../Main/Header/MainButtons';
import wideButton1 from '../../img/wide-button-1.png';
import wideButton2 from '../../img/wide-button-2.png';
import wideButton3 from '../../img/wide-button-3.png';
import wideButton4 from '../../img/wide-button-4.png';
import Gmina from '../../img/gmina.png';
import OJarocinie from '../../img/oJarocinie.png';
import { API_MENU_INDEX } from '../../api';

const CloseIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 0;
    color: ${({ theme: { blue } }) => blue};
    cursor: pointer;
`;

const ButtonsWrapper = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 40px;
    padding: 40px 0 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 992px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;
const MenuGrid = styled.div`
    display: grid;
    grid-gap: 30px;
    padding: 70px 0 10px;
    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 10px;
    }
`;

const StyledToggle = styled.div`
    font-size: 1.125rem;
    color: #ffffff;
    border-radius: 0.5rem;
    display: flex;
    height: 70px;
    align-items: center;
    flex-direction: column;
    > button {
        z-index: 1;
        height: 70px;
        position: relative;
        width: 100%;
        background-color: ${({ theme: { blue } }) => blue};
        border-radius: 0.5rem;
        border: none;
        color: #ffffff;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        span {
            margin: 0 auto;
            transform: translateX(50px);
        }
        :focus,
        :hover {
            outline: none;
            background-color: ${({ theme: { blueHover } }) => blueHover};
        }
    }
    > ul {
        transform: scaleY(0);
        transition: transform 0.3s ease-in-out;
        transform-origin: top;
        position: relative;
        top: -10px;
        padding-top: 50px;
        padding-bottom: 50px;
        width: 100%;
        background-color: ${({ theme: { blue } }) => blue};
        ${({ active }) =>
            active &&
            css`
                transform: scaleY(1);
            `}
    }
    ${({ active }) =>
        active &&
        css`
            height: auto;
        `}
`;

const StyledToggleImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    flex-shrink: 0;
    position: absolute;
`;

const MenuLink = styled(Link)`
    color: white;
    &:hover {
        color: white;
    }
`;

const MenuA = styled.a`
    color: white;
    &:hover {
        color: white;
    }
`;

const MainItem = styled.li`
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: white;
    }
`;

const MainMenu = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0 15px;
    margin: 0;
    font-size: 1rem;
    & > ${MainItem} {
        &:first-child {
            &:before {
                content: none;
            }
        }
    }
    li {
        padding: 8px 0;
        span {
            cursor: pointer;
            :focus {
                outline: none;
            }
        }
    }
`;

const ChevronFontAwesomeIcon = styled(FontAwesomeIcon)`
    transition: transform 0.3s ease-in-out;
    margin-left: 10px;
    ${({ opened }) =>
        opened &&
        css`
            transform: rotate(180deg);
        `}
`;

const StyledMenu = styled.div`
    z-index: 1000;
`;

const SubMenu = ({ name, submenu, url: link, internal_url: internalUrl }) => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            {!!submenu.length && (
                <li>
                    <span
                        role="button"
                        tabIndex="0"
                        onKeyPress={() => {
                            setOpened(!opened);
                        }}
                        onClick={() => {
                            setOpened(!opened);
                        }}
                    >
                        {name}
                        <ChevronFontAwesomeIcon icon={faChevronDown} opened={opened} />
                    </span>
                    {opened && (
                        <MainMenu>
                            {submenu.map(item => (
                                <SubMenu {...item} />
                            ))}
                        </MainMenu>
                    )}
                </li>
            )}
            {!submenu.length && (
                <li>
                    {!!internalUrl && <MenuLink to={link}>{name}</MenuLink>}
                    {!internalUrl && (
                        <MenuA href={link} rel="noopener noreferrer" target="_blank">
                            {name}
                        </MenuA>
                    )}
                </li>
            )}
        </>
    );
};

const MainList = ({ name, submenu, url: link, internal_url: internalUrl }) => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            {!!submenu.length && (
                <MainItem>
                    <span
                        role="button"
                        tabIndex="0"
                        onKeyPress={() => {
                            setOpened(!opened);
                        }}
                        onClick={() => {
                            setOpened(!opened);
                        }}
                    >
                        {name}
                        <ChevronFontAwesomeIcon icon={faChevronDown} opened={opened} />
                    </span>
                    {opened && (
                        <MainMenu>
                            {submenu.map(item => (
                                <SubMenu {...item} />
                            ))}
                        </MainMenu>
                    )}
                </MainItem>
            )}
            {!submenu.length && (
                <MainItem>
                    {!!internalUrl && <MenuLink to={link}>{name}</MenuLink>}
                    {!internalUrl && (
                        <MenuA href={link} rel="noopener noreferrer" target="_blank">
                            {name}
                        </MenuA>
                    )}
                </MainItem>
            )}
        </>
    );
};

const ToggleButton = ({ title, menu, icon }) => {
    const [active, setActive] = useState(false);
    return (
        <StyledToggle active={active}>
            <button
                type="button"
                onClick={() => {
                    setActive(!active);
                }}
            >
                <StyledToggleImg src={icon} alt="" />
                <span>{title}</span>
                <ChevronFontAwesomeIcon icon={faChevronDown} opened={active} />
            </button>
            <MainMenu>
                {menu.map(item => (
                    <>
                        <MainList {...item} />
                    </>
                ))}
            </MainMenu>
        </StyledToggle>
    );
};

export const Menu = ({ visible, setMenuOpened }) => {
    const [menu1, setMenu1] = useState([]);
    const [menu2, setMenu2] = useState([]);

    useEffect(() => {
        axios.get(API_MENU_INDEX).then(({ data }) => {
            setMenu1(data.menu1);
            setMenu2(data.menu2);
        });
    }, []);
    return (
        <CSSTransition in={visible} classNames="menu" timeout={300} unmountOnExit>
            <StyledMenu className="menu">
                <div className="container mt-3 position-relative">
                    <Link to="/">
                        <img src={logo} alt="jarocin-logo" />
                    </Link>

                    <CloseIcon
                        icon={faTimes}
                        size="2x"
                        tabIndex="0"
                        onClick={() => {
                            setMenuOpened(false);
                        }}
                        role="button"
                        onKeyPress={e => {
                            e.preventDefault();
                            setMenuOpened(false);
                        }}
                    />

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

                    <MenuGrid>
                        <ToggleButton title="GMINA" menu={menu1} icon={Gmina} />
                        <ToggleButton title="O JAROCINIE" menu={menu2} icon={OJarocinie} />
                    </MenuGrid>
                </div>
            </StyledMenu>
        </CSSTransition>
    );
};
