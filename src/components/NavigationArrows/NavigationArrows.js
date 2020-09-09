import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NavigationArrows = ({ prev, next }) => {
    return (
        <Row className="navigation-arrows">
            <Col xs="auto">
                {prev.disabled && (
                    <span className="disabled">
                        <FontAwesomeIcon icon={faArrowLeft}/> {prev.label}
                    </span>
                )}
                {!prev.disabled && (
                    <Link
                        to={prev.link}
                    >
                        <FontAwesomeIcon icon={faArrowLeft}/> {prev.label}
                    </Link>
                )}
            </Col>
            <Col xs="auto">
                {next.disabled && (
                    <span className="disabled">
                        {next.label} <FontAwesomeIcon icon={faArrowRight}/>
                    </span>
                )}
                {!next.disabled && (
                    <Link
                        to={next.link}
                    >
                        {next.label} <FontAwesomeIcon icon={faArrowRight}/>
                    </Link>
                )}
            </Col>
        </Row>
    );
};

export default NavigationArrows;