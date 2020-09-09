import React from 'react';
import { faSpinner } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = ({ className, style, size }) => {
    return (
        <div className={`loading ${className}`} style={style}>
            <FontAwesomeIcon icon={faSpinner} spin size={size}/>
        </div>
    );
};

Loading.defaultProps = {
    className: '',
    style: {},
    size: '4x',
};

export default Loading;