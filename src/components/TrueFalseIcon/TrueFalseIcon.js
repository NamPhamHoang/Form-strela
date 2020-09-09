import React from 'react';
import { any } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';

const TrueFalseIcon = ({ condition }) => {
    if (condition) {
        return <FontAwesomeIcon icon={faCheck} className="text-success"/>;
    } else {
        return <FontAwesomeIcon icon={faTimes} className="text-danger"/>;
    }
};

TrueFalseIcon.propTypes = {
    condition: any.isRequired,
};

export default TrueFalseIcon;