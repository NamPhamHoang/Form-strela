import React from 'react';
import { Link } from 'react-router-dom';

const PaginationItem = ({ path, number, disabled, active }) => {
    const className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
    return (
        <li className={className}>
            <Link
                to={path || `?strona=${number}`}
                role="button"
                className="page-link"
            >
                {number}
            </Link>
        </li>
    );
};

export default PaginationItem;