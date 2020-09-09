import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import route from '../../../../routes';
import Card from '../../../Cards/Card';

const EstateCard = props => {
    const { name, slug, bosses, city, address, postal, postal_city, phone, email } = props.estate;
    const to = route('institution.show', [slug]);
    return (
        <Col
            xs={12} md={6} lg={4} xl={3}
            className="mt-3 estate-card"
        >
            <Link to={to} className="link-clear">
                <Card>
                    {/*<a href={actUrl} className="act-file">Statut <FontAwesomeIcon icon={faFileWord} size={"lg"} /></a>*/}
                    <h6>{name}</h6>
                    <div dangerouslySetInnerHTML={{ __html: bosses }}/>
                    <address>
                        {city}, ul. {address}<br/>
                        {postal} {postal_city}
                    </address>
                    <p>
                        {phone}<br/>
                        {email}
                    </p>
                </Card>
            </Link>
        </Col>
    );
};


EstateCard.propTypes = {
    estate: PropTypes.instanceOf(Object).isRequired,
};

export default EstateCard;
