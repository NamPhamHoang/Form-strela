import React from 'react';

const Title = props => {
    const className = `title ${props.className}`;
    return (
        <h5 className={className}>
            {props.children}
        </h5>
    );
};

Title.defaultProps = {
    className: '',
};

export default Title;