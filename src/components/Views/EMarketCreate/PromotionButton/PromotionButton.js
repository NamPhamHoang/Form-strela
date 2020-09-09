import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const PromotionButton = ({ active, time, price, togglePromotion }) => {
    return (
        <Button
            onClick={() => {
                togglePromotion(time);
            }}
            className={`promotion-button ${active ? 'active' : ''}`}
        >
            <div className="circle"/>
            <div className="promotion-title">Promowanie na górze listy ogłoszeń</div>
            <div className="time">{time} dni</div>
            <div className="price">{price} zł</div>
        </Button>
    );
};

PromotionButton.propTypes = {
    active: PropTypes.bool.isRequired,
    togglePromotion: PropTypes.func.isRequired,
    price: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default PromotionButton;

