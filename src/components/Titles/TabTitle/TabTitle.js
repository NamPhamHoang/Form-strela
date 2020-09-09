import React from 'react';

const TabTitle = props => {
    const className = `tab-title ${props.variant ? `tab-title-${props.variant}` : ''} ${props.className ? props.className : ''}`;
    return (
        <h4 className={className}>
            {props.children}
        </h4>
    );
};

export default TabTitle;