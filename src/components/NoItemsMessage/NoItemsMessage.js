import React from 'react';
import PropTypes from 'prop-types';

const NoItemsMessage = ({ condition, children, message, className, size, ...rest }) => {
    if (!condition) return (
        <p
            className={`no-items-message ${className}${size ? ` no-items-message-${size}` : null}`}
            {...rest}
        >
            {message}
        </p>
    );

    return children;
};

NoItemsMessage.defaultProps = {
    className: '',
    size: null,
};

NoItemsMessage.propTypes = {
    children: PropTypes.node.isRequired,
    condition: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg', null]),
};

export default NoItemsMessage;