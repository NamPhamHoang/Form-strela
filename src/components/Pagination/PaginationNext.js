import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/pro-light-svg-icons';

const PaginationNext = ({ path, disabled, number }) => {
    const className = `page-item next ${disabled ? 'disabled' : ''}`;
    return (
        <li className={className}>
            <Link
                to={path || `?strona=${number}`}
                role="button"
                className="page-link"
            >
                <span aria-hidden="true">
                    <FontAwesomeIcon icon={faAngleDoubleRight}/>
                </span>
                <span className="sr-only">Next</span>
            </Link>
        </li>
    );
};

export default PaginationNext;