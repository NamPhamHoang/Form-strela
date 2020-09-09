import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const ButtonTwitterShare = ({ link }) => {
    return (
        <a className="btn btn-primary btn-social btn-social-tw"
           href={`https://twitter.com/intent/tweet?url=${link || window.location}`}
           target="_blank"
           rel="noopener noreferrer"
        >
            <FontAwesomeIcon icon={faTwitter}/> Twitter
        </a>
    );
};

export default ButtonTwitterShare;