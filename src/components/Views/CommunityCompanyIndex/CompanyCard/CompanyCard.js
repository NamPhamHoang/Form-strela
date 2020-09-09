import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from '../../../Cards/Card';
import { getImage } from '../../../../helpers';

const CompanyCard = ({ image, slug, link }) => {
    return (
        <Col xs={12} md={6} lg={4} xl={3} className="mt-4 company-card">
            <Link to={`/${link}/${slug}`} className="link-clear">
                <Card>
                    <div className="image-container">
                        {!image && (
                            <img src={getImage(image)} style={{ maxHeight: 50 }} alt={`Logo spółki gminnej ${slug}`} />
                        )}
                        {image && <img src={image} alt={`Logo spółki gminnej ${slug}`} className="img-fluid" />}
                    </div>
                    <Button size="sm">
                        <strong>Dowiedz się</strong> więcej
                    </Button>
                </Card>
            </Link>
        </Col>
    );
};

CompanyCard.propTypes = {
    image: PropTypes.string,
    slug: PropTypes.string.isRequired,
    link: PropTypes.string,
};

CompanyCard.defaultProps = {
    image: '',
    link: 'spolki-gminne',
};

export default CompanyCard;
