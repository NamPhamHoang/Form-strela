import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';

const CollapseLink = ({ title, href }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <div
                className="btn btn-primary btn-collapse"
            >
                {title}
                <div className="icon">
                    <FontAwesomeIcon icon={faAngleRight}/>
                </div>
            </div>
        </a>

    );
};

export default CollapseLink;