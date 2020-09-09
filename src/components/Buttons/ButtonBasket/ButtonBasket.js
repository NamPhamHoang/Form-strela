import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ButtonBasket = ({ to, basketId, baskets }) => (
    <Link to={to} className="btn btn-orange btn-sm add-button">
        <FontAwesomeIcon icon={faShoppingCart}/> Koszyk - {baskets[basketId].sum}zł
    </Link>
);

const mapStateToProps = ({ baskets }) => ({ baskets });

export default connect(mapStateToProps)(ButtonBasket);
