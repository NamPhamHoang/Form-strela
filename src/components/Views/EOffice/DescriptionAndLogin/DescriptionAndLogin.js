import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DescriptionAndLogin = ({ title, img, alt, children }) => (
    <Row className="page-container e-office-description-and-login">
        <Col lg={6}>
            <h5>{title}</h5>
            {children}
            <a
                href="https://eurzad.jarocin.pl/#/strona/pl/strona_glowna"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-white"
            >
                <strong>Wnioski i statusy</strong>
            </a>
        </Col>
        <Col lg={6} className="description-image d-none d-lg-block">
            <img src={img} alt={alt} className="img-fluid" />
        </Col>
    </Row>
);

export default DescriptionAndLogin;
