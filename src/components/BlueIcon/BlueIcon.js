import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlueIcon = ({ icon }) => {
    return (
        <div className="blue-icon">
            <FontAwesomeIcon icon={icon} size="lg"/>
        </div>
    );
};

export default BlueIcon;