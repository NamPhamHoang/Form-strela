import React from 'react';

const BackgroundSquare = ({ variant, className }) => {
    return (
        <div className={`background-square background-square-${variant} ${className}`}/>
    );
};

BackgroundSquare.defaultProps = {
    variant: 'primary',
    className: '',
};

export default BackgroundSquare;