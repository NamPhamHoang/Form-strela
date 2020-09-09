import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/pro-light-svg-icons';

const PaginationPrev = ({ path, disabled, number }) => {
    const className = `page-item prev ${disabled ? 'disabled' : ''}`;
    return (
        <li className={className}>
            <Link
                to={path || `?strona=${number}`}
                role="button"
                className="page-link"
            >
                <span aria-hidden="true">
                    <FontAwesomeIcon icon={faAngleDoubleLeft}/>
                </span>
                <span className="sr-only">Previous</span>
            </Link>
        </li>
    );
};

export default PaginationPrev;