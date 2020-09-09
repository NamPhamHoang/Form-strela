import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import { faIdCard } from '@fortawesome/pro-light-svg-icons';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../components/Titles/Title/Title';
import img from '../../img/strefamieszkanca.png';
import GrayStrap from '../../components/GrayStrap/GrayStrap';
import BlueIcon from '../../components/BlueIcon/BlueIcon';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';
import { BlockFunctionModal } from '../../components/Modals/Modal';
import FormStrefa from '../../components/FormStrefa/FormStrefa';

const CitizenZone = () => {
    const [modal, setModal] = useState(false);
    const [formTab, setFormTab] = useState(false);
    return (
        <>
            <Helmet>
                <title>Strefa mieszkańca - Oficjalny Portal Gminy Jarocin</title>
                <meta
                    name="description"
                    content="Strefa mieszkańca - zobacz jak możesz skorzystać będąc mieszkańcem gminy Jarocin."
                />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/strefa-mieszkanca', label: 'Strefa mieszkańca' },
                ]}
            />
            <LayoutCard className="citizen-card">
                <div className="background-container">
                    <BackgroundSquare />
                </div>
                <Title className="citizen-card_title">Strefa mieszkańca</Title>
                <BlueIcon icon={faIdCard} />
                <Row>
                    <Col lg={formTab ? 8 : 7} xl={formTab ? 9 : 6} className="description">
                        <div className="tab">
                            <Button
                                className={!formTab ? "tabLinks mr-3" : "tabLinks active mr-3"}
                                onClick={e => {
                                    e.preventDefault();
                                    setFormTab(false)
                                }}
                            >
                                <strong>Mieszkaniec</strong>
                            </Button>
                            <Button
                                className={formTab ? "tabLinks" : "tabLinks active"}
                                onClick={e => {
                                    e.preventDefault();
                                    setFormTab(true);
                                }}
                            >
                                <strong> Przedsiębiorca</strong>
                            </Button>
                        </div>
                        {!formTab ? (
                            <div>
                                <p className="fw-300 fw-strong-500 text-justify">
                                    <strong>Jesteś mieszkańcem Gminy Jarocin!</strong>
                                    <br />
                                    Załóż kartę mieszkańca i korzystaj z bonusów, rabatów oraz zniżek na usługi
                                    oferowane na terenie Gminy. <br />
                                    Kultura, sport, wypoczynek, posiłki w super cenach! <br />
                                    Wszystko to znajdziesz w Jarocinie! <br />
                                    Z kartą mieszkańca zapłacisz mniej, a skorzystasz więcej! <br />
                                </p>
                                <p className="fw-300 fw-strong-500 text-justify">
                                    <strong>To bardzo proste!</strong>
                                </p>
                                <Button
                                    onClick={e => {
                                        e.preventDefault();
                                        setModal(true);
                                    }}
                                    className="more-info more-info-citizen-zone"
                                >
                                    <strong>Zostan</strong> partnerem
                                </Button>
                            </div>
                        ) : (
                            <FormStrefa />
                        )}
                    </Col>
                    {!formTab ? (
                        <Col lg={4} xl={5} className="card-image">
                            <div className="photo-container" style={{ backgroundImage: `url(${img})` }}>
                                <img src={img} alt="Obraz ilustrujący kartę mieszkańca" />
                            </div>
                        </Col>
                    ) : (
                        <></>
                    )}
                </Row>
                <GrayStrap
                    content={
                        <>
                            <strong>Załóż kartę mieszkańca</strong> bezpłatnie!
                        </>
                    }
                    to="/panel/karta-mieszkanca"
                    onClick={e => {
                        e.preventDefault();
                        setModal(true);
                    }}
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

export default CitizenZone;
