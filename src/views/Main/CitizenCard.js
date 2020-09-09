import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import { faIdCard, faSwimmer, faUtensilsAlt } from '@fortawesome/pro-light-svg-icons';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilmAlt } from '@fortawesome/pro-light-svg-icons/faFilmAlt';
import { Helmet } from 'react-helmet';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Title from '../../components/Titles/Title/Title';
import img from '../../img/image2.png';
import GrayStrap from '../../components/GrayStrap/GrayStrap';
import BlueIcon from '../../components/BlueIcon/BlueIcon';
import BackgroundSquare from '../../components/BackgroundSquare/BackgroundSquare';

const DescribedIcon = ({ icon, description }) => {
    return (
        <div className="described-icon">
            <FontAwesomeIcon icon={icon} size="lg" />
            <span>{description}</span>
        </div>
    );
};

class CitizenCard extends Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Karta mieszkańca - Oficjalny Portal Gminy Jarocin</title>
                    <meta name="description" content="Skorzystaj z przywilejów bycia mieszkańcem Gminy Jarocin!" />
                </Helmet>
                <Path
                    items={[
                        { url: '/', label: 'Strona główna' },
                        { url: '/karta-mieszkanca', label: 'Karta mieszkańca' },
                    ]}
                />
                <LayoutCard className="citizen-card">
                    <div className="background-container">
                        <BackgroundSquare />
                    </div>
                    <Row>
                        <Col lg={5} xl={4} className="description">
                            <SectionTitle>Dla mieszkańców</SectionTitle>
                            <Title>Karta mieszkańca</Title>
                            <BlueIcon icon={faIdCard} />
                            <p className="fw-300 fw-strong-500 text-justify">
                                <strong>Jesteś mieszkańcem Gminy Jarocin!</strong> Załóż kartę mieszkańca i korzystaj z
                                rabatów na wejścia na basen, do kina, restauracji i wielu innych miejsc. Zadbaj o domowy
                                budżet - wszystkie zniżki będą widoczne w Twoim koncie - zobaczysz ile oszczędziłeś/aś!
                            </p>
                            <p className="fw-300 fw-strong-500 text-justify">
                                Kultura, sport, wypoczynek, posiłki w Jarocinie w super cenach dla Ciebie i Twojej
                                rodziny!
                            </p>
                            <Button className="more-info">
                                <strong>Dowiedz się</strong> więcej
                            </Button>
                        </Col>
                        <Col lg={4} xl={5} className="card-image">
                            <div className="photo-container" style={{ backgroundImage: `url(${img})` }}>
                                <img src={img} alt="Obraz ilustrujący kartę mieszkańca" />
                            </div>
                        </Col>
                        <Col lg={3} className="icons">
                            <DescribedIcon icon={faUtensilsAlt} description="Zniżki do restauracji" />
                            <DescribedIcon icon={faFilmAlt} description="Zniżki do kina" />
                            <DescribedIcon icon={faSwimmer} description="Zniżki na basen" />
                        </Col>
                    </Row>
                    <GrayStrap
                        content={
                            <>
                                <strong>Załóż kartę mieszkańca</strong> bezpłatnie!
                            </>
                        }
                        to="/panel/karta-mieszkanca"
                    />
                </LayoutCard>
            </>
        );
    }
}

export default CitizenCard;
