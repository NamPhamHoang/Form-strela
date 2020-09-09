import React from 'react';

const Item = ({ items, day, style }) => {
    return (
        <div className="item" style={style}>
            <div className="day">{day}</div>
            <ul className="list-unstyled">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

Item.defaultProps = {
    items: [],
    style: {},
};

export default Item;