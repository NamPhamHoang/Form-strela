import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCity,
    faFlag,
    faGavel,
    faMap,
    faMapMarkerTimes,
    faMusic,
    faShoppingCart,
    faTrashAlt,
    faWheelchair,
    faWindow,
} from '@fortawesome/pro-light-svg-icons';
import { faFileChartLine } from '@fortawesome/pro-light-svg-icons/faFileChartLine';
import { faTreeAlt } from '@fortawesome/pro-light-svg-icons/faTreeAlt';
import { Link } from 'react-router-dom';
import SectionTitle from '../Titles/SectionTitle/SectionTitle';

const LCol = props => (
    <Col xs={6} sm={4} md={3} lg={3} xl={2}>
        {props.children}
    </Col>
);

const Item = props => (
    <Link to={props.to} className="item">
        <FontAwesomeIcon icon={props.icon} size="2x" />
        <span className="text">{props.children}</span>
    </Link>
);

const Shortcuts = props => {
    const className = `shortcuts shortcuts-${props.variation} ${props.className}`;
    return (
        <div className={className}>
            <SectionTitle className="text-center mb-4">Na skróty - przydatne informacje</SectionTitle>
            <Row>
                <LCol>
                    <Item to="/spolki-gminne" icon={faCity}>
                        Jednoski i Spółki Gminne
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/" icon={faWindow}>
                        ePUAP
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/projekty-unijne" icon={faFileChartLine}>
                        Projekty unijne
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/mapa-inwestycji" icon={faMapMarkerTimes}>
                        Mapa inwestycji
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/gospodarka-odpadami" icon={faTrashAlt}>
                        Gospodarka odpadami
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/rewitalizacja" icon={faTreeAlt}>
                        Rewitalizacja
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/jarocin-festiwal" icon={faMusic}>
                        Jarocin Festiwal
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/powstanie-wielkopolskie" icon={faFlag}>
                        Powstanie Wielkopolskie
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/niepelnosprawni" icon={faWheelchair}>
                        Niepełnosprawni
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/nieodplatna-pomoc-prawna" icon={faGavel}>
                        Nieodpłatna pomoc prawna
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/system-informacji-przestrzennej" icon={faMap}>
                        System informacji przestrzennej
                    </Item>
                </LCol>
                <LCol>
                    <Item to="/e-targ" icon={faShoppingCart}>
                        Ogłoszenia eTarg
                    </Item>
                </LCol>
            </Row>
        </div>
    );
};

Shortcuts.propTypes = {
    variation: PropTypes.string.isRequired,
};

export default Shortcuts;
