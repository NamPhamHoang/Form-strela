import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Card from '../../../Cards/Card';

const PharmacyCard = props => {
    const { name, address, phone, active, addressContinued } = props.pharmacy;
    return (
        <Col
            xs={12} md={6} lg={4} xl={3}
            className="mt-3 pharmacy-card"
        >
            <Card>
                <h6>"{name}"</h6>
                <address>
                    {address}<br/>
                    {addressContinued}<br/>
                    Tel.:&nbsp;{phone}
                </address>
                <p>
                    czynna: <br/>
                    {active}
                </p>
            </Card>
        </Col>
    );
};


PharmacyCard.propTypes = {
    pharmacy: PropTypes.instanceOf(Object).isRequired,
};

export default PharmacyCard;
