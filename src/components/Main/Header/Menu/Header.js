import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../../Logo/LogoWhite';

const Header = props => {
    return (
        <Row className="header">
            <Col xs={10}>
                <Logo white />
            </Col>
            <Col xs={2} onClick={props.onTimesClick} className="exit">
                <FontAwesomeIcon icon={faTimes} size="2x" />
            </Col>
        </Row>
    );
};

export default Header;
