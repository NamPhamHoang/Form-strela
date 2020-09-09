import React from 'react';

const Card = props => {
    return (
        <div className={`card ${props.className}`}>
            {props.children}
        </div>
    );
};

Card.defaultProps = {
    className: '',
};


export default Card;