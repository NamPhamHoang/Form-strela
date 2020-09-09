import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const ButtonFacebookShare = ({link}) => {
    return (
        <a className="btn btn-primary btn-social btn-social-fb"
           href={`https://www.facebook.com/sharer/sharer.php?u=${link || window.location}`}
           target="_blank"
           rel="noopener noreferrer"
        >
            <FontAwesomeIcon icon={faFacebookF}/> Facebook
        </a>
    );
};

export default ButtonFacebookShare;