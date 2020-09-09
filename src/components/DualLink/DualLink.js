import React from 'react';
import { Link } from 'react-router-dom';

const DualLink = ({ to, internal, children, ...rest }) => {
    if (internal) {
        return (
            <Link to={to} {...rest}>{children}</Link>
        );
    }

    return (
        <a href={to} {...rest}>{children}</a>
    );
};

export default DualLink;