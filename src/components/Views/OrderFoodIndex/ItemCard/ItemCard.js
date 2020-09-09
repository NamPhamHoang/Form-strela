import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faClock, faShoppingCart, faUtensils } from '@fortawesome/pro-light-svg-icons';
import { getImage } from '../../../../helpers';

const ShipData = ({ icon, data, available }) => {
    if (!available) {
        return <div/>;
    }
    return (
        <div className="ship-item">
            <FontAwesomeIcon icon={icon}/> {data}
        </div>
    );
};

const ItemCard = ({ logo, name, phone, waiting_time, delivery_price, minimal_shipping_value, cuisine_type, postal, city, street, number, website, slug }) => {
    const logoStyle = {};
    if (!logo) {
        logoStyle.maxHeight = 100;
        logoStyle.width = 'auto';
    }
    return (
        <div className="item-card">
            <div className="logo">
                <img src={getImage(logo)} style={logoStyle} alt={`Logo firmy ${name}`}
                     className="img-fluid"/>
            </div>
            <div className="content-container">
                <div className="content">
                    <div className="data">
                        <h6>{name}</h6>
                        <div className="primary-container">
                            <div className="data-container">
                                <div>{street} {number}</div>
                                <div>tel: {phone}</div>
                                <div>{postal} {city}</div>
                                <div>{website}</div>
                            </div>
                        </div>
                    </div>
                    <div className="cousine">
                        <div>
                            <header>
                                <FontAwesomeIcon icon={faUtensils}/> Kuchnia
                            </header>
                            <p className="main">
                                {cuisine_type}
                            </p>
                        </div>
                    </div>
                    <div className="link-container">
                        <Link to={`/zamow-jedzenie/${slug}`} className="btn btn-primary link">
                            <strong>Zobacz</strong>&nbsp;menu
                        </Link>
                        <div className="ship-data">
                            <ShipData icon={faClock} data={`${waiting_time}`} available={waiting_time}/>
                            <ShipData icon={faCar} data={`${delivery_price}zł`} available={delivery_price}/>
                            <ShipData icon={faShoppingCart} data={`min ${minimal_shipping_value}zł`}
                                      available={minimal_shipping_value}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ItemCard;