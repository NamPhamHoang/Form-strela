import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';

const CameraView = ({ img, alt, to, title }) => {
    return (
        <Col xs={12} md={6} className="camera-view">
            <a href={to} className="link-clear" target="_blank" rel="noopener noreferrer">
                <figure>
                    <img src={img} alt={alt}/>
                    <figcaption>{title}</figcaption>
                </figure>
            </a>
        </Col>
    );
};

CameraView.propTypes = {
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.instanceOf(Object).isRequired,
    to: PropTypes.string.isRequired,
};

export default CameraView;
