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
    const [mainTab, setMainTab] = useState(true);
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
                <Title>Strefa mieszkańca</Title>
                        <BlueIcon icon={faIdCard} />
                        <div className="tab">
                            <Button
                                className="tabLinks"
                                onClick={e => {
                                    e.preventDefault();
                                    setMainTab(true);
                                    setFormTab(false);
                                }}
                            >
                                <strong>Mieszkaniec</strong>
                            </Button>
                            <Button
                                className="tabLinks"
                                onClick={e => {
                                    e.preventDefault();
                                    setFormTab(true);
                                    setMainTab(false);
                                }}
                            >
                                <strong>Przedsiębiorca</strong>
                            </Button>
                        </div>
                <Row>
                    <Col lg={7} xl={6} className="description">
                       
                        {formTab !== false ? (
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
                                    <strong>Załóż</strong> kartę
                                </Button>
                            </div>
                        ) : (
                            <FormStrefa />
                        )}
                    </Col>
                    {formTab !== false ? (
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
