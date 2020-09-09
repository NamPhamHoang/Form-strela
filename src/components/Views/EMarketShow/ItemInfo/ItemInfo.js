import React from 'react';
import Col from 'react-bootstrap/Col';

const ItemInfo = ({ title, value }) => {
    return (
        <Col xs={12} sm={6} md={4} lg={6} xl={4} className="item-info mt-2">
            <b>{title}:</b>&nbsp;<span>{value}</span>
        </Col>
    );
};

export default ItemInfo;