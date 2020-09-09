import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faTicketAlt } from '@fortawesome/pro-light-svg-icons';
import {
    faBell,
    faBuilding,
    faCity,
    faCog,
    faCompress,
    faEnvelope,
    faIdCard,
    faPhoneOffice,
    faShoppingCart,
    faSlidersH,
    faStar,
    faTrashAlt,
    faUtensils,
} from '@fortawesome/pro-regular-svg-icons';
import { useSelector } from 'react-redux';
import { faInfo } from '@fortawesome/pro-solid-svg-icons';
import PanelTemplate from '../../templates/PanelTemplate';
import { Modal } from '../../components/Modals/Modal';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;

    @media screen and (min-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 700px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 1300px) {
        grid-template-columns: repeat(4, 1fr);
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
`;

const TextWrapper = styled.div`
    p:first-of-type {
        color: ${({ theme: { red } }) => red};
        font-weight: 600;
    }
    text-align: center;
`;

const StyledModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StyledModalFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${({ theme: { blue } }) => blue};
    font-size: 50px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    width: 60px !important;
    height: auto;
    margin: 30px auto;
    transition: color 0.3s ease-in-out;
    color: ${({ theme: { blue } }) => blue};
`;
export const Dashboard = () => {
    const isUserCityMember = useSelector(state => state.isUserCityMember);
    const panelCompany = useSelector(state => state.panelCompany);
    const isCompany = parseInt(useSelector(state => state.role) || '', 10) === 2;
    const [modalContact, setModalContact] = useState(false);
    const [modalBlockedFunctions, setModalBlockedFunctions] = useState(false);
    const [modalBlockedFunctions2, setModalBlockedFunctions2] = useState(false);

    return (
        <>
            <PanelTemplate className="notifications" loading={false} redirect={null}>
                {!isCompany && (
                    <TextWrapper>
                        <p>Korzystasz z konta typu Standard.</p>
                        <p>
                            Dla mieszkańców Gminy Jarocin w nijbliższym czasie będzie możliwość przejścia na typ konta z
                            Kartą Mieszkańca.
                        </p>
                        <p>Powiadomimy Cię o tym.</p>
                    </TextWrapper>
                )}
                <Grid>
                    {!isCompany && (
                        <>
                            <StyledLink
                                to="/panel/kupione-bilety"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faTicketAlt} />
                                <span>Bilety - eventy wydarzenia</span>
                            </StyledLink>
                            <StyledLink
                                to="/panel/bilety/parking"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faTicketAlt} />
                                <span>Parkowanie</span>
                            </StyledLink>
                            <StyledLink
                                to="/panel/bilety/autobus"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faTicketAlt} />
                                <span>Bilety - autobus</span>
                            </StyledLink>
                            <StyledLink
                                to="/panel/moje-zamowienia"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faUtensils} />
                                <span>Moje zamówienia</span>
                            </StyledLink>

                            {isUserCityMember && (
                                <>
                                    <StyledLink
                                        to="/panel/poczta"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions2(true);
                                        }}
                                    >
                                        <StyledFontAwesomeIcon icon={faEnvelope} />
                                        <span>Poczta</span>
                                    </StyledLink>
                                    <StyledLink
                                        to="/panel/karta-mieszkanca"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions2(true);
                                        }}
                                    >
                                        <StyledFontAwesomeIcon icon={faIdCard} />
                                        <span>Karta mieszkańca</span>
                                    </StyledLink>
                                    <StyledLink
                                        to="/panel/odpady"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions2(true);
                                        }}
                                    >
                                        <StyledFontAwesomeIcon icon={faTrashAlt} />
                                        <span>Odpady</span>
                                    </StyledLink>
                                    <StyledLink to="/e-urzad">
                                        <StyledFontAwesomeIcon icon={faPhoneOffice} />
                                        <span>eUrząd</span>
                                    </StyledLink>
                                </>
                            )}
                            <StyledLink to="/panel/powiadomienia">
                                <StyledFontAwesomeIcon icon={faBell} />
                                <span>Powiadomienia</span>
                            </StyledLink>
                        </>
                    )}
                    <StyledLink to="/panel/e-targ/moj">
                        <StyledFontAwesomeIcon icon={faShoppingCart} />
                        <span>Mój eTarg</span>
                    </StyledLink>
                    <StyledLink to="/panel/e-targ/obserwowane">
                        <StyledFontAwesomeIcon icon={faStar} />
                        <span>Obserwowane ogłoszenia</span>
                    </StyledLink>
                    {isCompany && (
                        <>
                            <StyledLink to="/panel/firma/firmy">
                                <StyledFontAwesomeIcon icon={faCity} />
                                <span>{panelCompany.id === null ? 'Wybierz firmę' : 'Zmień firmę'}</span>
                            </StyledLink>

                            {panelCompany.id && (
                                <StyledLink to="/panel/firma/firmy/edytuj">
                                    <StyledFontAwesomeIcon icon={faBuilding} />
                                    <span>Edytuj firmę</span>
                                </StyledLink>
                            )}

                            <StyledLink
                                to="/panel/firma/miejsca-reklamowe"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalContact(true);
                                }}
                            >
                                <StyledFontAwesomeIcon icon={faCompress} />
                                <span>Miejsca reklamowe</span>
                            </StyledLink>
                            {panelCompany.categoryId && (
                                <>
                                    <StyledLink
                                        to="/panel/firma/restauracja/menu"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions(true);
                                        }}
                                    >
                                        <StyledFontAwesomeIcon icon={faUtensils} />
                                        <span>Menu</span>
                                    </StyledLink>
                                    <StyledLink
                                        to="/panel/firma/restauracja/ustawienia"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions(true);
                                        }}
                                    >
                                        <StyledFontAwesomeIcon icon={faSlidersH} />
                                        <span>Ustawienia restauracja</span>
                                    </StyledLink>
                                    <StyledLink
                                        to="/panel/firma/restauracja/zamowienia"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions(true);
                                        }}
                                    >
                                        <StyledFontAwesomeIcon icon={faShoppingCart} />
                                        <span>Zamówienia</span>
                                    </StyledLink>
                                </>
                            )}
                        </>
                    )}

                    <StyledLink to="/panel/ustawienia">
                        <StyledFontAwesomeIcon icon={faCog} />
                        <span>Ustawienia</span>
                    </StyledLink>

                    <StyledLink to="/e-urzad/zaloz-konto-e-urzad">
                        <StyledFontAwesomeIcon icon={faMoneyBill} />
                        <span>Podatki i opłaty</span>
                    </StyledLink>
                </Grid>
            </PanelTemplate>
            <Modal opened={modalContact} closeModal={() => setModalContact(false)}>
                <StyledModalContent>
                    <StyledModalFontAwesomeIcon icon={faInfo} />
                    <h3>W celu zakupu miejsca reklamowego</h3>

                    <p>
                        skontaktuj się z Administratorem Serwisu <br />
                        pod adresem e-mail: <a href="mailto:jar@jarjarocin.pl">jar@jarjarocin.pl</a> <br />
                        lub telefonicznie pod: <a href="tel:627400295">62 740 02 95</a>
                    </p>
                </StyledModalContent>
            </Modal>

            <Modal opened={modalBlockedFunctions} closeModal={() => setModalBlockedFunctions(false)}>
                <StyledModalContent>
                    <StyledModalFontAwesomeIcon icon={faInfo} />
                    <h3>Usługa nieaktywna</h3>

                    <p>Aktywacja nastąpi w momencie wdrożenia sprzedaży online dla tego modułu</p>
                    <p>Poinformujemy Cię o aktualizacji</p>
                </StyledModalContent>
            </Modal>

            <Modal opened={modalBlockedFunctions2} closeModal={() => setModalBlockedFunctions2(false)}>
                <StyledModalContent>
                    <StyledModalFontAwesomeIcon icon={faInfo} />
                    <h3>Usługa nieaktywna</h3>

                    <p>Aktywacja nastąpi w momencie wdrożenia całego modułu</p>
                    <p>Poinformujemy Cię o aktualizacji</p>
                </StyledModalContent>
            </Modal>
        </>
    );
};
