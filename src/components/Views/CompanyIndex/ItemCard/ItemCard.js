import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { getImage } from '../../../../helpers';

const ItemCard = ({ logo, name, phone, postal, city, street, number, website, slug }) => {
    return (
        <div className="item-card">
            <div className="logo">
                <img src={getImage(logo)} alt={`Logo firmy ${name}`} className="img-fluid"/>
            </div>
            <div className="content-container">
                <div className="content">
                    <div className="data">
                        <h6>{name}</h6>
                        <div className="data-container">
                            <div>{street} {number}</div>
                            <div>tel: {phone}</div>
                            <div>{postal} {city}</div>
                            <div>{website}</div>
                        </div>
                    </div>
                    <div className="link-container">
                        <Link to={`/baza-firm/firma/${slug}`} className="link">
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ItemCard;