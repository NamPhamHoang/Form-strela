import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../../img/logoJar.png';
import { Modal } from '../../Modals/Modal';

const StyledFooter = styled.footer`
    display: grid;
    grid-template-columns: calc(50vw - 600px) repeat(4, 1fr) 2fr calc(50vw - 600px);
    background-color: #919191;
    color: #ffffff;
    padding: 20px 0;
    & a {
        color: #ffffff;
    }
    @media (max-width: 768px) {
        display: block;
        text-align: center;
    }
`;
const StyledImg = styled.img`
    width: 150px;
    margin-left: 20px;
`;
const Links = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
const Socials = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.5rem;
`;
const BOK = styled.div`
    @media (max-width: 768px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;
const StyledSocialIcon = styled(FontAwesomeIcon)`
    color: #ffffff;
`;
const CopyRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    & img {
        max-width: 100px;
    }
`;

const StyledLast = styled.div`
    text-align: right;
    @media (max-width: 768px) {
        text-align: center;
    }
`;

const Footer = () => {
    const [modalId, setModalId] = useState(null);
    return (
        <>
            <StyledFooter>
                <span />
                <Links>
                    <li>
                        <Link to="/regulamin">Regulamin</Link>
                    </li>
                    {/* <li>
                        <Link to="/polityka-cookies">Polityka cookies</Link>
                    </li> */}
                    <li>
                        <Link to="/polityka-prywatnosci">Polityka prywatności</Link>
                    </li>
                    <li>
                        <Link
                            to="/zamow-reklame"
                            onClick={e => {
                                e.preventDefault();
                                setModalId(1);
                            }}
                        >
                            Zamów reklamę
                        </Link>
                    </li>
                </Links>
                <Socials>
                    <a href="https://www.facebook.com/gminajarocin">
                        <StyledSocialIcon icon={faFacebookF} fixedWidth />
                    </a>
                    <a href="https://www.instagram.com/gmina.jarocin/">
                        <StyledSocialIcon icon={faInstagram} fixedWidth />
                    </a>
                    <a href="https://www.youtube.com/channel/UC2MX8NbC0ooLAnwhaAnCbag">
                        <StyledSocialIcon icon={faYoutube} fixedWidth />
                    </a>
                </Socials>
                <address />
                <BOK />

                <StyledLast>
                    <CopyRight>
                        <span>Licencja i wykonanie Jarocińska Agencja Rozwoju na zlecenie Gminy Jarocin</span>
                        <a href="http://jarjarocin.pl/" target="_blank" rel="noopener noreferrer">
                            <StyledImg src={logo} alt="logo" />
                        </a>
                    </CopyRight>
                </StyledLast>
            </StyledFooter>
            <Modal opened={modalId === 1} closeModal={() => setModalId(null)}>
                W celu zakupu miejsca reklamowego skontaktuj się z Administratorem Serwisu pod adresem e-mail{' '}
                <a href="mailto:jar@jarjarocin.pl">jar@jarjarocin.pl</a> lub telefonicznie pod:{' '}
                <a href="tel:627400295">62 740 02 95</a>
            </Modal>
        </>
    );
};

export default Footer;
