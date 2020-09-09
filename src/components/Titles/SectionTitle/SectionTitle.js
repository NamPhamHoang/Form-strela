import React from 'react';

const SectionTitle = props => {
    const className = `section-title ${props.className ? props.className : ''}`;
    return (
        <h4 className={className}>
            {props.children}
        </h4>
    );
}

export default SectionTitle;