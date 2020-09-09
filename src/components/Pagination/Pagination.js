import React from 'react';

const Pagination = ({ children }) => {
    return (
        <ul className="pagination">
            {children}
        </ul>
    );
};

export default Pagination;