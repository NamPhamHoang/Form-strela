import React from 'react';
import { Link } from 'react-router-dom';

const PerPage = ({ buildQuery, perPage, className }) => {
    const items = [20, 30, 50].map(item => (
        <React.Fragment
            key={item}
        >
            &nbsp;
            <Link
                to={buildQuery('ilosc', item)}
                className={`btn btn-link ${parseInt(perPage, 10) === item ? 'active' : ''}`}
            >
                {item}
            </Link>
            {item !== 50 ? ' |' : ''}
        </React.Fragment>
    ));
    return (
        <span className={`per-page ${className}`}>
            POKAŻ<span> NA STRONIE</span>: {items} produktów
        </span>
    );
};

PerPage.defaultProps = {
    className: '',
};

export default PerPage;