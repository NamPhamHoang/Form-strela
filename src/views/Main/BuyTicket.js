import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/pro-light-svg-icons';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../components/Titles/Title/Title';
import ButtonWideIcon from '../../components/Buttons/ButtonWideIcon/ButtonWideIcon';
import img from '../../img/kupbilet.png';
import Parking from '../../img/parking.svg';
import Swimming from '../../img/swimmingpool.svg';
import Event from '../../img/event_ticket.svg';
import Bus from '../../img/bus.svg';
import GrayStrap from '../../components/GrayStrap/GrayStrap';
import BlueIcon from '../../components/BlueIcon/BlueIcon';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import { BlockFunctionModal } from '../../components/Modals/Modal';

const StyledImg = styled.img`
    margin: 0 0 0 auto;
`;
const BlueSpan = styled.span`
    color: ${({ theme: { blue } }) => blue};
    font-weight: bold;
`;
const StyledUl = styled.ul`
    padding: 0;
    margin: 0;
`;
const StyledOl = styled.ol`
    padding-left: 0;
    counter-reset: item;
    > li {
        display: block;
        &::before {
            content: counter(item) '. ';
            counter-increment: item;
            color: ${({ theme: { blue } }) => blue};
        }
    }
    ul {
        list-style: none;
        margin: 0;
        padding-left: 20px;
        li {
            &:before {
                content: '-'; /* Insert content that looks like bullets */
                padding-right: 8px;
                //color: blue; /* Or a color you prefer */
            }
        }
    }
`;

const StyledH4 = styled.h4`
    text-align: center;
    color: ${({ theme: { blue } }) => blue};
    margin-top: 15px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${({ theme: { blue } }) => blue};
`;

const StyledIcon = styled.img`
    width: 50px;
`;

const BuyTicket = () => {
    const [modal, setModal] = useState(false);
    return (
        <>
            <Helmet>
                <title>Kup bilet - Oficjalny Portal Gminy Jarocin</title>
                <meta
                    name="description"
                    content="Kup bilet na event, basen, autobus. Zapłać za parkowanie w mieście!"
                />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                ]}
            />
            <LayoutCard className="buy-ticket">
                <div className="background-container">
                    <BackgroundSquare variant="light-gray" />
                </div>
                <Row className="mb-3">
                    <Col lg={6} className="description d-flex flex-column justify-content-center">
                        <Title>Kup bilet</Title>
                        <BlueIcon icon={faTicketAlt} />
                    </Col>
                    <Col lg={6} className="d-none d-lg-flex justify-content-end">
                        <StyledImg src={img} alt="Obraz ilustrujący kupowanie biletów" className="img-fluid" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6}>
                        <p className="fw-300 fw-strong-500">
                            Lubisz koncerty i festiwale? Przedstawienia teatralne czy kabarety to wydarzenia, których
                            nie możesz opuścić? Korzystasz z usług Jarocińskich Linii Autobusowych? Parkujesz w centrum
                            Jarocina?
                            <br />
                            <BlueSpan>E-bilet jest idealną propozycją dla Ciebie!</BlueSpan>
                        </p>
                        <p>
                            <strong>Kupując bilet elektroniczny na portalu jarocin.pl tylko zyskujesz!</strong>
                            <StyledUl className="fa-ul">
                                <li>
                                    <span className="fa-li">
                                        <StyledFontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                    bez wychodzenia z domu
                                </li>
                                <li>
                                    <span className="fa-li">
                                        <StyledFontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                    24 h na dobę
                                </li>
                                <li>
                                    <span className="fa-li">
                                        <StyledFontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                    nie musisz stać w kolejkach do kasy
                                </li>
                                <li>
                                    <span className="fa-li">
                                        <StyledFontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                    nie tracisz czasu i pieniędzy na dojazdy
                                </li>
                                <li>
                                    <span className="fa-li">
                                        <StyledFontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                    nie narażasz się na brak dostępności biletu, czekając aż do dnia wydarzenia
                                </li>
                            </StyledUl>
                        </p>
                        <p>
                            U nas kupisz e-bilety na wydarzenia odbywające się w Jarocinie, miejską komunikację, do
                            Aquaparku. Opłacisz także postój w strefie parkowania.
                        </p>
                    </Col>
                    <Col xs={12} md={6}>
                        <p>
                            <strong>Jak to działa?</strong>
                        </p>
                        <p>
                            <StyledOl>
                                <li>wybierz kategorię biletu: wydarzenie, Aquapark, autobus lub parkowanie</li>
                                <li>wybierz rodzaj biletu</li>
                                <li>kup bilet jako użytkownik portalu Jarocin.pl lub jako gość</li>
                                <li>opłać transakcję</li>
                                <li>
                                    otrzymujesz bilet elektroniczny:
                                    <ul>
                                        <li>
                                            jesteś użytkownikiem portalu - wszystkie bilety widnieją na Twoim koncie, a
                                            dodatkowo są przesyłane na Twój adres e-mail
                                        </li>
                                        <li>jesteś gościem portalu – otrzymujesz bilet na adres e-mail</li>
                                    </ul>
                                </li>
                                <li>przy kasie biletowej pokazujesz bilet elektroniczny z kodem QR</li>
                            </StyledOl>
                        </p>
                    </Col>
                </Row>

                <StyledH4>Jaki bilet dziś wybierasz?</StyledH4>

                <Row>
                    <Col className="ticket-type">
                        <ButtonWideIcon
                            image={<StyledIcon src={Event} alt="" />}
                            onClick={e => {
                                // setRedirect('/kup-bilet/wydarzenia');
                                e.preventDefault();
                                setModal(true);
                                ReactGA.event({
                                    category: 'Uzytkownik',
                                    action: `Chęć zakupu biletu na wydarzenie`,
                                });
                            }}
                        >
                            Bilet
                            <br />
                            <strong>eventy, wydarzenia</strong>
                        </ButtonWideIcon>
                        <ButtonWideIcon
                            image={<StyledIcon src={Swimming} alt="" />}
                            onClick={e => {
                                e.preventDefault();
                                setModal(true);
                                ReactGA.event({
                                    category: 'Uzytkownik',
                                    action: `Chęć zakupu biletu na basen`,
                                });
                            }}
                        >
                            Bilet
                            <br />
                            <strong>Na basen</strong>
                        </ButtonWideIcon>
                        <ButtonWideIcon
                            image={<StyledIcon src={Bus} alt="" />}
                            onClick={e => {
                                // setRedirect('/kup-bilet/autobus');
                                e.preventDefault();
                                setModal(true);
                                ReactGA.event({
                                    category: 'Uzytkownik',
                                    action: `Chęć zakupu biletu na autobus`,
                                });
                            }}
                        >
                            Bilet
                            <br />
                            <strong>Na autobus</strong>
                        </ButtonWideIcon>
                        <ButtonWideIcon
                            onClick={e => {
                                // setRedirect('/kup-bilet/parkowanie');
                                e.preventDefault();
                                setModal(true);
                                ReactGA.event({
                                    category: 'Uzytkownik',
                                    action: `Chęć zakupu biletu parkingowego`,
                                });
                            }}
                            image={<StyledIcon src={Parking} alt="" />}
                        >
                            <strong>Parkowanie</strong>
                        </ButtonWideIcon>
                    </Col>
                </Row>
                <GrayStrap
                    content={
                        <>
                            Jeszcze <strong>nie jesteś zalogowany!</strong>
                        </>
                    }
                />
            </LayoutCard>

            <BlockFunctionModal
                closeModal={() => {
                    setModal(false);
                }}
                opened={modal}
            />
        </>
    );
};

export default BuyTicket;

/*
redirect={redirect}
* */
