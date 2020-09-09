import React from 'react';
import Loading from '../Loading';

const LoadingGrayCard = props => {
    return (
        <div className="loading-gray-card" {...props}>
            <Loading/>
        </div>
    );
};

export default LoadingGrayCard;