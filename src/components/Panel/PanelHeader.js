import React, { useState } from 'react';
import {
    faBell,
    faBuilding,
    faCity,
    faCog,
    faCompress,
    faEnvelope,
    // faExclamationTriangle,
    faIdCard,
    faLongArrowAltLeft,
    faPhoneOffice,
    faShoppingCart,
    faSignOutAlt,
    faSlidersH,
    faStar,
    faTicketAlt,
    faTrashAlt,
    faUtensils,
} from '@fortawesome/pro-regular-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { faBars, faCamera, faCar, faInfo, faLayerGroup } from '@fortawesome/pro-light-svg-icons';
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons';
import { Field, Form } from 'react-final-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import IconStrap from '../IconStrap/IconStrap';
import { logOutAction, SET_AVATAR } from '../../actions';
import logo from '../../img/logowhite.png';
import { Menu } from '../Header/Menu';
import { Modal } from '../Modals/Modal';
import { PrimaryButton } from '../Buttons/Button';
import { gate } from '../../api';
import { createFormData } from '../../helpers';

const NavItem = ({ title, icon, to, active, onClick }) => (
    <Link to={to} onClick={onClick} className={`nav-item ${active ? 'active' : ''}`}>
        <FontAwesomeIcon icon={icon} fixedWidth /> {title}
    </Link>
);

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: #ffffff;
`;
const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    width: auto;
    button {
        border: none;
        background: transparent;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 100px;
        padding: 0;
        margin-right: 5px;
        overflow: hidden;
        img {
            height: 100%;
            width: auto;
        }
    }
    @media screen and (max-width: 1000px) {
        width: 100%;
    }
`;

const LabelButton = styled.label`
    background-color: ${({ theme: { blue } }) => blue};
    border-radius: 0.5rem;
    padding: 0.7rem 2.5rem;
    color: ${({ theme: { white } }) => white};
    display: inline-flex;
    text-align: center;
    border: none;
    input {
        width: 0;
        height: 0;
        display: none;
    }
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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

const PanelHeader = ({ logout, headerVisible, toggleHeader, location, panelCompany, avatar }) => {
    const isUserCityMember = useSelector(state => state.isUserCityMember);
    const daysLeftToActivate = useSelector(state => state.daysLeftToActivate);
    const isCompany = parseInt(useSelector(state => state.role) || '', 10) === 2;
    const [opened, setOpened] = useState(false);
    const [avatarModal, setAvatarModal] = useState(false);
    const dispatch = useDispatch();
    const [modalContact, setModalContact] = useState(false);
    const [modalBlockedFunctions, setModalBlockedFunctions] = useState(false);
    const [modalBlockedFunctions2, setModalBlockedFunctions2] = useState(false);

    return (
        <>
            <Menu visible={opened} setMenuOpened={setOpened} />
            <header className={`panel-header ${headerVisible ? '' : 'hidden'}`}>
                <div className="collapse-button">
                    <Button onClick={toggleHeader}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Button>
                </div>
                <div className="logo">
                    <img src={logo} alt="Logo" className="img-fluid" />
                </div>

                {isCompany && (
                    <p className="logged-as-company">
                        Jesteś zalogowany jak firma
                        <br />
                        Wybrana: <strong className="company-name">{panelCompany.name}</strong>
                    </p>
                )}
                <nav>
                    <AvatarWrapper>
                        <button
                            type="button"
                            onClick={() => {
                                setAvatarModal(true);
                            }}
                        >
                            {!avatar ? (
                                <StyledFontAwesomeIcon icon={faCamera} size="4x" />
                            ) : (
                                <img src={avatar} alt="" />
                            )}
                        </button>

                        <div>
                            Witaj, <br />w serwisie Jarocin.pl
                        </div>
                    </AvatarWrapper>
                    <NavItem
                        title="Dashboard"
                        icon={faLayerGroup}
                        to="/panel"
                        active={location.pathname === '/panel'}
                    />

                    {!isCompany && (
                        <>
                            <NavItem
                                title="Bilety - eventy,wydarzenia"
                                icon={faTicketAlt}
                                to="/panel/kupione-bilety"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                                active={location.pathname === '/panel/kupione-bilety'}
                            />
                            <NavItem
                                title="Parkowanie"
                                icon={faCar}
                                to="/panel/bilety/parking"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                                active={location.pathname === '/panel/bilety/parking'}
                            />
                            <NavItem
                                title="Bilety - autobus"
                                icon={faCar}
                                to="/panel/bilety/autobus"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                                active={location.pathname === '/panel/bilety/autobus'}
                            />
                            <NavItem
                                title="Moje zamówienia"
                                icon={faUtensils}
                                to="/panel/moje-zamowienia"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalBlockedFunctions(true);
                                }}
                                active={location.pathname === '/panel/moje-zamowienia'}
                            />

                            {isUserCityMember && (
                                <>
                                    <NavItem
                                        title="Poczta"
                                        icon={faEnvelope}
                                        to="/panel/poczta"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions2(true);
                                        }}
                                        active={location.pathname === '/panel/poczta'}
                                    />

                                    <NavItem
                                        title="Karta mieszkańca"
                                        icon={faIdCard}
                                        to="/panel/karta-mieszkanca"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions2(true);
                                        }}
                                        active={location.pathname === '/panel/karta-mieszkanca'}
                                    />
                                    <NavItem
                                        title="Odpady"
                                        icon={faTrashAlt}
                                        to="/odpady"
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions2(true);
                                        }}
                                        active={location.pathname === '/panel/odpady'}
                                    />
                                    <NavItem
                                        title="eUrząd"
                                        icon={faPhoneOffice}
                                        to="/e-urzad"
                                        active={location.pathname === '/e-urzad'}
                                    />
                                    {/* <NavItem
                                        title="Zgłoś problem"
                                        icon={faExclamationTriangle}
                                        to="/panel/zglos-problem"
                                        active={location.pathname === '/panel/zglos-problem'}
                                    /> */}
                                </>
                            )}

                            <NavItem
                                title="Powiadomienia"
                                icon={faBell}
                                to="/panel/powiadomienia"
                                active={location.pathname === '/panel/powiadomienia'}
                            />
                        </>
                    )}

                    <NavItem
                        title="Mój eTarg"
                        icon={faShoppingCart}
                        to="/panel/e-targ/moj"
                        active={location.pathname === '/panel/e-targ/moj'}
                    />
                    <NavItem
                        title="Obserwowane ogłoszenia"
                        icon={faStar}
                        to="/panel/e-targ/obserwowane"
                        active={location.pathname === '/panel/e-targ/obserwowane'}
                    />
                    {isCompany && (
                        <>
                            <NavItem
                                title={panelCompany.id === null ? 'Wybierz firmę' : 'Zmień firmę'}
                                icon={faCity}
                                to="/panel/firma/firmy"
                                active={location.pathname === '/panel/firma/firmy'}
                            />
                            {panelCompany.id !== null && (
                                <NavItem
                                    title="Edytuj firmę"
                                    icon={faBuilding}
                                    to="/panel/firma/firmy/edytuj"
                                    active={location.pathname === '/panel/firma/firmy/edytuj'}
                                />
                            )}
                            <NavItem
                                title="Miejsca reklamowe"
                                icon={faCompress}
                                to="/panel/firma/miejsca-reklamowe"
                                onClick={e => {
                                    e.preventDefault();
                                    setModalContact(true);
                                }}
                                active={location.pathname === '/panel/firma/miejsca-reklamowe'}
                            />
                            {panelCompany.categoryId === 4 && (
                                <>
                                    <NavItem
                                        title="Menu"
                                        icon={faUtensils}
                                        to="/panel/firma/restauracja/menu"
                                        active={location.pathname === '/panel/firma/restauracja/menu'}
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions(true);
                                        }}
                                    />
                                    <NavItem
                                        title="Ustawienia restauracja"
                                        icon={faSlidersH}
                                        to="/panel/firma/restauracja/ustawienia"
                                        active={location.pathname === '/panel/firma/restauracja/ustawienia'}
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions(true);
                                        }}
                                    />
                                    <NavItem
                                        title="Zamówienia"
                                        icon={faShoppingCart}
                                        to="/panel/firma/restauracja/zamowienia"
                                        active={location.pathname === '/panel/firma/restauracja/zamowienia'}
                                        onClick={e => {
                                            e.preventDefault();
                                            setModalBlockedFunctions(true);
                                        }}
                                    />
                                </>
                            )}
                        </>
                    )}
                    <NavItem
                        title="Ustawienia"
                        icon={faCog}
                        to="/panel/ustawienia"
                        active={location.pathname === '/panel/ustawienia'}
                    />
                    <NavItem to="/" onClick={logout} icon={faSignOutAlt} title="Wyloguj" />

                    {daysLeftToActivate > 0 && (
                        <>
                            <p>
                                Proszę aktywować swoje konto, klikając w link aktywacyjny na e-mail.
                                <br />
                                Pozostało Ci {daysLeftToActivate} dni
                            </p>
                        </>
                    )}
                </nav>
            </header>
            <header className={`panel-strap-header ${headerVisible ? '' : 'hidden'}`}>
                <Link to="/" className="home-link">
                    <FontAwesomeIcon icon={faLongArrowAltLeft} size="lg" /> Strona główna jarocin.pl
                </Link>
                <IconStrap background="primary" />
                <Button
                    className="menu-button"
                    variant="link"
                    onClick={() => {
                        setOpened(true);
                    }}
                >
                    <FontAwesomeIcon icon={faBars} />
                </Button>
            </header>
            <Modal opened={avatarModal} closeModal={() => setAvatarModal(false)}>
                {avatarModal && (
                    <Form
                        onSubmit={values => {
                            const fd = new FormData();
                            Object.keys(values).forEach(value => {
                                createFormData(fd, value, values[value]);
                            });
                            axios
                                .post(`${gate}/auth/avatar`, fd)
                                .then(({ data: { url } }) => {
                                    setAvatarModal(false);
                                    NotificationManager.success('Zmieniono zdjęcie');
                                    dispatch({
                                        type: SET_AVATAR,
                                        payload: {
                                            avatar: url,
                                        },
                                    });
                                })
                                .catch(() => {
                                    setAvatarModal(false);
                                    NotificationManager.error('Błąd spróbuj ponownie');
                                });
                        }}
                        render={({ handleSubmit, form, values }) => (
                            <StyledForm onSubmit={handleSubmit}>
                                <Field
                                    name="photoUrl"
                                    type="file"
                                    render={({ input }) => (
                                        <>
                                            <LabelButton>
                                                {values.img ? values.img.name : 'Wybierz plik'}
                                                <input
                                                    {...input}
                                                    onChange={e => {
                                                        form.change('img', e.target.files[0]);
                                                    }}
                                                />
                                            </LabelButton>
                                        </>
                                    )}
                                />
                                <PrimaryButton>Zapisz</PrimaryButton>
                            </StyledForm>
                        )}
                    />
                )}
            </Modal>

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

PanelHeader.defaultProps = {
    restaurant: false,
};

const mapStateToProps = ({ panelCompany, avatar }) => ({ panelCompany, avatar });

export default withRouter(
    connect(mapStateToProps, {
        logout: logOutAction,
    })(PanelHeader),
);
