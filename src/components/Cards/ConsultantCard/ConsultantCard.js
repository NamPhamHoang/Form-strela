import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/pro-light-svg-icons';

const ConsultantCard = ({ img, alt, name, position, phone, email, className }) => (
    <div className={`consultant-card ${className}`}>
        {img && <img src={img} alt={alt} className="consultant-avatar"/>}
        {name && <h5>{name}</h5>}
        {position && <h6>{position}</h6>}
        {phone && (
            <span className="phone">
                <FontAwesomeIcon icon={faPhone}/>&nbsp;{phone}
            </span>
        )}
        {email && (
            <span className="phone">
                <FontAwesomeIcon icon={faEnvelope}/>&nbsp;{email}
            </span>
        )}
    </div>
);

ConsultantCard.propTypes = {
    className: PropTypes.string,
    img: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};

ConsultantCard.defaultProps = {
    className: '',
};

export default ConsultantCard;
